"use client";

import axios from "axios";
import { useMemo, useRef, useState } from "react";
import EditorScaffold, { type MobileEditorSection } from "./EditorScaffold";
import FieldGroup from "./FieldGroup";
import { scrollPreviewToSection, titleize } from "./editor-utils";
import type { PageComponent, PageConfig } from "../lib/types";
import { cx, publicButtonStyles } from "../../shared/public-ui";

export default function StructureEditorShell({
  pageName,
  initialConfig,
}: {
  pageName: string;
  initialConfig: PageConfig;
}) {
  const [config, setConfig] = useState(initialConfig);
  const [status, setStatus] = useState("Remove components from the page structure.");
  const [statusTone, setStatusTone] = useState<"neutral" | "success" | "error">("neutral");
  const [isSaving, setIsSaving] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const removableComponents = useMemo(
    () =>
      config.components.filter(
        (component) =>
          component.type !== "nav" &&
          component.type !== "footer" &&
          component.type !== "newsletter",
      ),
    [config.components],
  );
  const mobileSections: MobileEditorSection[] =
    removableComponents.length > 0
      ? removableComponents.map((component) => ({
          id: component.type,
          title: titleize(component.type),
          description: "Review the block in preview, then remove it from this page if needed.",
          content: (
            <ComponentRow
              component={component}
              disabled={isSaving}
              onFocus={focusSection}
              onDelete={deleteComponent}
            />
          ),
        }))
      : [
          {
            id: "empty-structure",
            title: "Nothing to remove",
            description: "This page no longer has removable components.",
            content: (
              <p className="text-sm leading-7 text-[var(--color-ink-700)]">
                Navigation, footer, and protected sections remain in place.
              </p>
            ),
          },
        ];

  async function deleteComponent(componentType: string) {
    if (isSaving) {
      return;
    }

    setIsSaving(true);
    setStatusTone("neutral");
    try {
      await axios.delete(
        `/api/editor/pages/${encodeURIComponent(pageName)}/components/${encodeURIComponent(componentType)}`,
      );
      setConfig((current) => ({
        ...current,
        components: current.components.filter(
          (component) => component.type !== componentType,
        ),
      }));
      setStatus(`${componentType} removed from the page.`);
      setStatusTone("success");
    } catch {
      setStatus(`Failed to remove ${componentType}.`);
      setStatusTone("error");
    } finally {
      setIsSaving(false);
    }
  }

  function focusSection(componentType: string) {
    scrollPreviewToSection(previewRef, componentType);
  }

  return (
    <EditorScaffold
      pageName={pageName}
      badge="Editor"
      title="Structure editor"
      description="Manage the components that appear on this page. Navigation and footer stay protected."
      sidebarTitle="Page Components"
      status={status}
      isSaving={isSaving}
      statusTone={statusTone}
      previewRef={previewRef}
      config={config}
      sidebar={
        <FieldGroup title="Components">
          <div className="space-y-3">
            {removableComponents.map((component) => (
              <ComponentRow
                key={component.type}
                component={component}
                disabled={isSaving}
                onFocus={focusSection}
                onDelete={deleteComponent}
              />
            ))}
            {removableComponents.length === 0 ? (
              <p className="text-sm leading-7 text-[var(--color-ink-700)]">
                No removable components remain on this page.
              </p>
            ) : null}
          </div>
        </FieldGroup>
      }
      mobileSections={mobileSections}
    />
  );
}

function ComponentRow({
  component,
  disabled,
  onFocus,
  onDelete,
}: {
  component: PageComponent;
  disabled: boolean;
  onFocus: (componentType: string) => void;
  onDelete: (componentType: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[22px] border border-slate-200/80 bg-white/92 p-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-900)]">
          {component.type}
        </p>
        <p className="mt-1 text-sm text-[var(--color-ink-700)]">
          Remove this block from the page structure and preview.
        </p>
      </div>
      <button
        type="button"
        disabled={disabled}
        onFocus={() => onFocus(component.type)}
        onMouseEnter={() => onFocus(component.type)}
        onClick={() => onDelete(component.type)}
        className={cx(
          publicButtonStyles.danger,
          "rounded-full disabled:cursor-not-allowed disabled:opacity-60",
        )}
      >
        Delete
      </button>
    </div>
  );
}
