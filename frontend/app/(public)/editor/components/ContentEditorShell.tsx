"use client";

import axios from "axios";
import { useMemo, useRef, useState } from "react";
import EditableField from "./EditableField";
import EditorScaffold from "./EditorScaffold";
import FieldGroup from "./FieldGroup";
import { scrollPreviewToSection, setDeepValue } from "./editor-utils";
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
  const [isSaving, setIsSaving] = useState(false);
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
    scrollPreviewToSection(previewRef, section);
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
      previewRef={previewRef}
      config={config}
      sidebar={editableSections.map((component) => {
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
    />
  );
}
