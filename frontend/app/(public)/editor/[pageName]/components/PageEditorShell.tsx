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
    <section className="flex min-h-[calc(100vh-9rem)] flex-col gap-6 rounded-none border-0 bg-transparent p-0 shadow-none lg:min-h-[calc(100vh-10rem)]">
      <div className="flex flex-col gap-2 px-1 sm:px-0">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
          Editor
        </p>
        <h1 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink-900)] sm:text-3xl">
          Page editor
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-[var(--color-ink-700)]">
          Edit the written content for this page. Navigation and footer content stay locked.
        </p>
      </div>

      <div className="grid flex-1 gap-6 lg:grid-cols-[minmax(340px,440px)_minmax(0,1fr)] lg:items-start">
        <aside className="rounded-[28px] border border-[color:rgb(146_146_146_/_0.14)] bg-[linear-gradient(180deg,#ffffff_0%,#f7fafc_100%)] p-5 shadow-[0_18px_50px_rgb(54_54_54_/_0.05)] lg:sticky lg:top-6 lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto">
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

        <div className="flex min-h-[70vh] flex-col overflow-hidden rounded-[32px] border border-[color:rgb(146_146_146_/_0.16)] bg-[linear-gradient(180deg,#f8fbff_0%,#edf2f7_100%)] shadow-[0_24px_70px_rgb(54_54_54_/_0.12)] lg:h-[calc(100vh-10rem)]">
          <div className="flex items-center justify-between gap-4 border-b border-white/70 bg-white/75 px-4 py-3 backdrop-blur">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#fb7d33]" />
              <span className="h-3 w-3 rounded-full bg-[#ffc233]" />
              <span className="h-3 w-3 rounded-full bg-[#60bc57]" />
            </div>
            <div className="rounded-full border border-[color:rgb(146_146_146_/_0.14)] bg-white px-3 py-1 text-xs font-medium text-[var(--color-ink-700)]">
              Preview /editor/{pageName}
            </div>
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-500)]">
              Browser frame
            </div>
          </div>
          <div ref={previewRef} className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 lg:p-5">
            <div className="overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_18px_50px_rgb(54_54_54_/_0.08)]">
              <Renderer pageName={pageName} config={config} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EditableField({
  path,
  value,
  showLabel = true,
  onChange,
  onFocus,
  onBlur,
}: {
  path: string;
  value: unknown;
  showLabel?: boolean;
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
            showLabel={showLabel}
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
              {formatFieldLabel(path, key)}
            </label>
            <EditableField
              path={`${path}.${key}`}
              value={child}
              showLabel={false}
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
      {showLabel ? (
        <span className="block text-sm font-medium text-[var(--color-ink-700)]">
          {titleize(path.split(".").at(-1) ?? path)}
        </span>
      ) : null}
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
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatFieldLabel(path: string, key: string) {
  const segments = path.split(".").filter(Boolean).map((segment) =>
    /^\d+$/.test(segment) ? `Item ${Number(segment) + 1}` : titleize(segment),
  );

  return [...segments, titleize(key)].join(" / ");
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
