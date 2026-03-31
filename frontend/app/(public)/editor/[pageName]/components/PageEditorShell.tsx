"use client";

import axios from "axios";
import { useMemo, useRef, useState, type ReactNode } from "react";
import Renderer from "./renderer";

type PageComponent = {
  type: string;
  enabled: boolean;
  variant?: string;
};

type PageConfig = {
  components: PageComponent[];
  data: Record<string, unknown>;
  preference: Record<string, unknown>;
};

type PageEditorShellProps = {
  pageName: string;
  initialConfig: PageConfig;
};

export default function PageEditorShell({ pageName, initialConfig }: PageEditorShellProps) {
  const [config, setConfig] = useState(initialConfig);
  const [status, setStatus] = useState("Edit a field and blur to save.");
  const [isSaving, setIsSaving] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef(initialConfig.data);

  const editableSections = useMemo(
    () =>
      config.components.filter(
        (component) => component.enabled && component.type !== "nav" && component.type !== "footer",
      ),
    [config.components],
  );

  function updateAtPath(path: string, next: unknown) {
    setConfig((current) => {
      const updatedData = setDeepValue(current.data, path, next);
      dataRef.current = updatedData;

      return {
        ...current,
        data: updatedData,
      };
    });
  }

  async function saveContent() {
    if (isSaving) {
      return;
    }

    setIsSaving(true);
    try {
      await axios.patch(`/api/editor/pages/${encodeURIComponent(pageName)}/content`, {
        data: dataRef.current,
      });
      setStatus("Content saved.");
    } catch {
      setStatus("Failed to save content.");
    } finally {
      setIsSaving(false);
    }
  }

  function focusSection(path: string) {
    const section = path.split(".")[0];
    previewRef.current
      ?.querySelector<HTMLElement>(`[data-editor-section="${section}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <section className="flex min-h-[calc(100vh-5rem)] flex-col gap-6 rounded-[32px] border border-[color:rgb(146_146_146_/_0.18)] bg-white/90 p-6 shadow-[0_20px_50px_rgb(54_54_54_/_0.08)] lg:p-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
          Editor
        </p>
        <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--color-ink-900)]">
          Page editor
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-[var(--color-ink-700)]">
          Edit the written content for this page. Navigation and footer content stay locked.
        </p>
      </div>

      <div className="grid flex-1 gap-6 lg:grid-cols-[minmax(320px,420px)_minmax(0,1fr)] lg:items-start">
        <aside className="rounded-[28px] border border-[color:rgb(146_146_146_/_0.14)] bg-[var(--color-bg-50)] p-5 lg:sticky lg:top-6 lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
            Content Fields
          </p>
          <p className="mt-2 text-sm text-[var(--color-ink-700)]">{status}</p>
          {isSaving ? (
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-wix-blue)]">
              Saving...
            </p>
          ) : null}
          <div className="mt-4 space-y-4">
            {editableSections.map((component) => {
              const value = config.data[component.type];

              if (value == null) {
                return null;
              }

              return (
                <FieldGroup key={component.type} title={component.type}>
                  <EditableField
                  path={component.type}
                  value={value}
                  onChange={updateAtPath}
                  onFocus={focusSection}
                  onBlur={saveContent}
                />
              </FieldGroup>
            );
          })}
          </div>
        </aside>

        <div
          ref={previewRef}
          className="min-h-[70vh] overflow-y-auto rounded-[28px] border border-[color:rgb(146_146_146_/_0.14)] bg-white/80 p-3 shadow-[0_18px_50px_rgb(54_54_54_/_0.05)] lg:h-[calc(100vh-10rem)]"
        >
          <Renderer pageName={pageName} config={config} />
        </div>
      </div>
    </section>
  );
}

function EditableField({
  path,
  value,
  onChange,
  onFocus,
  onBlur,
}: {
  path: string;
  value: unknown;
  onChange: (path: string, next: unknown) => void;
  onFocus: (path: string) => void;
  onBlur: () => void;
}) {
  if (Array.isArray(value)) {
    return (
      <div className="space-y-3">
        {value.map((item, index) => (
          <EditableField
            key={`${path}.${index}`}
            path={`${path}.${index}`}
            value={item}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        ))}
      </div>
    );
  }

  if (value && typeof value === "object") {
    return (
      <div className="space-y-3">
        {Object.entries(value).map(([key, child]) => (
          <div key={`${path}.${key}`} className="space-y-2">
            <label className="block text-sm font-medium text-[var(--color-ink-700)]">
              {titleize(key)}
            </label>
            <EditableField
              path={`${path}.${key}`}
              value={child}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>
        ))}
      </div>
    );
  }

  const text = value == null ? "" : String(value);
  const multiline = text.length > 80 || text.includes("\n");

  return (
    <label className="block space-y-2">
      <span className="block text-sm font-medium text-[var(--color-ink-700)]">
        {titleize(path.split(".").at(-1) ?? path)}
      </span>
      {multiline ? (
        <textarea
          value={text}
          onChange={(event) => onChange(path, event.target.value)}
          onFocus={() => onFocus(path)}
          onBlur={onBlur}
          rows={3}
          className="w-full rounded-2xl border border-[color:rgb(146_146_146_/_0.18)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--color-wix-blue)]"
        />
      ) : (
        <input
          value={text}
          onChange={(event) => onChange(path, event.target.value)}
          onFocus={() => onFocus(path)}
          onBlur={onBlur}
          className="w-full rounded-2xl border border-[color:rgb(146_146_146_/_0.18)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--color-wix-blue)]"
        />
      )}
    </label>
  );
}

function FieldGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3 rounded-2xl border border-[color:rgb(146_146_146_/_0.16)] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbfe_100%)] p-4">
      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-900)]">
        {titleize(title)}
      </p>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function titleize(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function setDeepValue<T>(value: T, path: string, next: unknown): T {
  const parts = path.split(".").filter(Boolean);

  if (parts.length === 0) {
    return next as T;
  }

  return updateNode(value, parts, next) as T;
}

function updateNode(node: unknown, parts: string[], next: unknown): unknown {
  if (parts.length === 0) {
    return next;
  }

  const [head, ...rest] = parts;

  if (Array.isArray(node)) {
    const index = Number(head);
    const clone = [...node];
    clone[index] = updateNode(clone[index], rest, next);
    return clone;
  }

  const clone =
    node && typeof node === "object" ? { ...(node as Record<string, unknown>) } : {};

  clone[head] = updateNode((clone as Record<string, unknown>)[head], rest, next);
  return clone;
}
