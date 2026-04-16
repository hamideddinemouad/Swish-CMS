"use client";

import axios from "axios";
import { useMemo, useRef, useState } from "react";
import EditableField from "./EditableField";
import EditorScaffold, { type MobileEditorSection } from "./EditorScaffold";
import FieldGroup from "./FieldGroup";
import MobileEditorAccordion from "./MobileEditorAccordion";
import { scrollPreviewToSection, setDeepValue, titleize } from "./editor-utils";
import type { PageConfig } from "../lib/types";

export default function ContentEditorShell({
  pageName,
  initialConfig,
}: {
  pageName: string;
  initialConfig: PageConfig;
}) {
  const [config, setConfig] = useState(initialConfig);
  const [status, setStatus] = useState("Edit a field and blur to save.");
  const [statusTone, setStatusTone] = useState<"neutral" | "success" | "error">("neutral");
  const [isSaving, setIsSaving] = useState(false);
  const [openDesktopSectionId, setOpenDesktopSectionId] = useState<string | null>(null);
  const [highlightedSectionId, setHighlightedSectionId] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef(initialConfig.data);

  const editableSections = useMemo(
    () =>
      config.components.filter(
        (component) =>
          component.enabled &&
          component.type !== "nav" &&
          component.type !== "footer" &&
          component.type !== "newsletter",
      ),
    [config.components],
  );
  const sectionEntries = editableSections.flatMap((component) => {
    const value = config.data[component.type];

    if (value == null) {
      return [];
    }

    return [
      {
        id: component.type,
        title: titleize(component.type),
        description: "Edit the saved copy for this section. Changes autosave on blur.",
        value,
      },
    ];
  });
  const mobileSections: MobileEditorSection[] =
    sectionEntries.length > 0
      ? sectionEntries.map((section) => ({
          id: section.id,
          title: section.title,
          description: section.description,
          content: (
            <EditableField
              path={section.id}
              value={section.value}
              onChange={updateAtPath}
              onFocus={focusSection}
              onBlur={saveContent}
            />
          ),
        }))
      : [
          {
            id: "empty",
            title: "Nothing to edit",
            description: "This page has no editable content sections right now.",
            content: (
              <p className="text-sm leading-7 text-[var(--color-ink-700)]">
                All editable sections are currently locked or unavailable.
              </p>
            ),
          },
        ];

  const activeDesktopSectionId = sectionEntries.some(
    (section) => section.id === openDesktopSectionId,
  )
    ? openDesktopSectionId
    : null;

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
    setStatusTone("neutral");
    try {
      await axios.patch(`/api/editor/pages/${encodeURIComponent(pageName)}/content`, {
        data: dataRef.current,
      });
      setStatus("Saved !");
      setStatusTone("success");
    } catch {
      setStatus("Failed to save content.");
      setStatusTone("error");
    } finally {
      setIsSaving(false);
    }
  }

  function focusSection(path: string) {
    const section = path.split(".")[0];
    setOpenDesktopSectionId(section);
    setHighlightedSectionId(section);
    scrollPreviewToSection(previewRef, section);
  }

  function toggleDesktopSection(sectionId: string | null) {
    setOpenDesktopSectionId(sectionId);
    setHighlightedSectionId(sectionId);

    if (sectionId) {
      scrollPreviewToSection(previewRef, sectionId);
    }
  }

  return (
    <EditorScaffold
      pageName={pageName}
      badge="Editor"
      title="Content editor"
      description="Edit the written content for this page. Navigation and footer content stay locked."
      sidebarTitle="Content Fields"
      status={status}
      isSaving={isSaving}
      statusTone={statusTone}
      highlightedSectionId={highlightedSectionId}
      onSectionToggle={setHighlightedSectionId}
      previewRef={previewRef}
      config={config}
      sidebar={sectionEntries.map((section) => (
          <FieldGroup key={section.id} title={section.id}>
            <EditableField
              path={section.id}
              value={section.value}
              onChange={updateAtPath}
              onFocus={focusSection}
              onBlur={saveContent}
            />
          </FieldGroup>
      ))}
      desktopSidebar={
        <MobileEditorAccordion
          sections={mobileSections}
          openSectionId={activeDesktopSectionId}
          onToggleSection={toggleDesktopSection}
        />
      }
      mobileSections={mobileSections}
    />
  );
}
