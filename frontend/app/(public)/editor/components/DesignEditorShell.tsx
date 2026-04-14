"use client";

import axios from "axios";
import { useMemo, useRef, useState } from "react";
import EditorScaffold from "./EditorScaffold";
import FieldGroup from "./FieldGroup";
import { scrollPreviewToSection, setDeepValue } from "./editor-utils";
import {
  getDefaultHomeSectionDesign,
  getSelectedHomeSectionDesign,
  HOME_BODY_FONT_PRESETS,
  HOME_BODY_SIZE_PRESETS,
  HOME_COLOR_PRESETS,
  HOME_DESIGN_SECTIONS,
  HOME_DISPLAY_SIZE_PRESETS,
  HOME_HEADING_FONT_PRESETS,
  type HomeDesignSectionKey,
  type HomeBodyFontPresetId,
  type HomeBodySizePresetId,
  type HomeColorPresetId,
  type HomeDesignPreferences,
  type HomeDisplaySizePresetId,
  type HomeHeadingFontPresetId,
  type HomeSectionDesignPreferences,
} from "@/lib/home-design-presets";
import {
  getDefaultPageDesign,
  getSelectedPageComponentDesign,
  PAGE_BODY_FONT_PRESETS,
  PAGE_BODY_SIZE_PRESETS,
  PAGE_COLOR_PRESETS,
  PAGE_DISPLAY_SIZE_PRESETS,
  PAGE_HEADING_FONT_PRESETS,
  type PageComponentDesignPreferences,
  type PageBodyFontPresetId,
  type PageBodySizePresetId,
  type PageColorPresetId,
  type PageDesignPreferences,
  type PageDisplaySizePresetId,
  type PageHeadingFontPresetId,
} from "@/lib/page-design-presets";
import type { PageConfig } from "../lib/types";

type HomeDesignKey = keyof ReturnType<typeof getDefaultHomeSectionDesign>;
type PageDesignKey = keyof ReturnType<typeof getDefaultPageDesign>;

export default function DesignEditorShell({
  pageName,
  initialConfig,
}: {
  pageName: string;
  initialConfig: PageConfig;
}) {
  const [config, setConfig] = useState(initialConfig);
  const [status, setStatus] = useState("Choose a design preset to update the preview.");
  const [isSaving, setIsSaving] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const preferenceRef = useRef(initialConfig.preference);
  const isHomePage = pageName.toLowerCase() === "home";
  const enabledHomeSections = HOME_DESIGN_SECTIONS.filter(({ id }) =>
    config.components.some((component) => component.enabled && component.type === id),
  );
  const enabledGenericSections = useMemo(
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

  function focusSection(section: HomeDesignSectionKey) {
    scrollPreviewToSection(previewRef, section);
  }

  function focusPreferencePath(path: string) {
    const section = path.split(".")[0];
    scrollPreviewToSection(previewRef, section);
  }

  function updatePageDesignPreference(
    section: string,
    key: PageDesignKey,
    value:
      | PageColorPresetId
      | PageHeadingFontPresetId
      | PageBodyFontPresetId
      | PageDisplaySizePresetId
      | PageBodySizePresetId,
  ) {
    const nextPreference = setDeepValue(
      preferenceRef.current,
      `componentDesign.${section}.${key}`,
      value,
    );

    preferenceRef.current = nextPreference;
    setConfig((current) => ({
      ...current,
      preference: nextPreference,
    }));
    void savePreference(nextPreference);
  }

  async function savePreference(nextPreference = preferenceRef.current) {
    if (isSaving) {
      return;
    }

    setIsSaving(true);
    try {
      await axios.patch(`/api/editor/pages/${encodeURIComponent(pageName)}/preference`, {
        preference: nextPreference,
      });
      setStatus("Design saved.");
    } catch {
      setStatus("Failed to save design.");
    } finally {
      setIsSaving(false);
    }
  }

  function updateHomeDesignPreference(
    section: HomeDesignSectionKey,
    key: HomeDesignKey,
    value:
      | HomeColorPresetId
      | HomeHeadingFontPresetId
      | HomeBodyFontPresetId
      | HomeDisplaySizePresetId
      | HomeBodySizePresetId,
  ) {
    const nextPreference = setDeepValue(
      preferenceRef.current,
      `homeDesign.${section}.${key}`,
      value,
    );

    preferenceRef.current = nextPreference;
    setConfig((current) => ({
      ...current,
      preference: nextPreference,
    }));
    void savePreference(nextPreference);
  }

  return (
    <EditorScaffold
      pageName={pageName}
      badge="Editor"
      title="Design editor"
      description={
        isHomePage
          ? "Choose semantic design presets for each Home page section. Navigation stays on its current styling for now."
          : "Adjust the saved design tokens for this page. Changes apply to the live preview and persist through the existing preference system."
      }
      sidebarTitle="Design Controls"
      status={status}
      isSaving={isSaving}
      previewRef={previewRef}
      config={config}
      sidebar={
        isHomePage ? (
          <div className="space-y-4">
            {enabledHomeSections.map((section) => (
              <FieldGroup key={section.id} title={section.label}>
                <HomeDesignPanel
                  section={section.id}
                  selected={getSelectedHomeSectionDesign(
                    config.preference as {
                      hero?: Record<string, unknown>;
                      homeDesign?: HomeDesignPreferences;
                    },
                    section.id,
                  )}
                  controls={getSectionControls(section.id)}
                  onFocus={focusSection}
                  onChange={(key, value) =>
                    updateHomeDesignPreference(section.id, key, value)
                  }
                />
              </FieldGroup>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {enabledGenericSections.map((component) => (
              <FieldGroup key={component.type} title={`${component.type} Design`}>
                <PageDesignPanel
                  selected={getSelectedPageComponentDesign(
                    config.preference as Parameters<typeof getSelectedPageComponentDesign>[0],
                    component.type,
                  )}
                  onFocus={() => focusPreferencePath(component.type)}
                  onChange={(key, value) =>
                    updatePageDesignPreference(component.type, key, value)
                  }
                />
              </FieldGroup>
            ))}
          </div>
        )
      }
    />
  );
}

function HomeDesignPanel({
  section,
  selected,
  controls,
  onFocus,
  onChange,
}: {
  section: HomeDesignSectionKey;
  selected: Required<HomeSectionDesignPreferences>;
  controls: ReturnType<typeof getSectionControls>;
  onFocus: (section: HomeDesignSectionKey) => void;
  onChange: (
    key: HomeDesignKey,
    value:
      | HomeColorPresetId
      | HomeHeadingFontPresetId
      | HomeBodyFontPresetId
      | HomeDisplaySizePresetId
      | HomeBodySizePresetId,
  ) => void;
}) {
  return (
    <div className="space-y-5">
      {controls.color ? (
        <div className="space-y-2">
          <p className="text-sm font-medium text-[var(--color-ink-700)]">Color Palette</p>
          <div className="grid grid-cols-4 gap-3">
            {HOME_COLOR_PRESETS.map((preset) => {
              const active = selected.colorPreset === preset.id;

              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    onFocus(section);
                    onChange("colorPreset", preset.id);
                  }}
                  className={`space-y-2 rounded-2xl border p-2 text-left transition ${
                    active
                      ? "border-[var(--color-wix-blue)] bg-[color:rgb(56_153_236_/_0.08)]"
                      : "border-[color:rgb(146_146_146_/_0.18)] bg-white hover:border-[var(--color-wix-blue)]"
                  }`}
                >
                  <span
                    className="block h-10 w-full rounded-xl"
                    style={{ background: preset.swatch }}
                  />
                  <span className="block text-xs font-semibold text-[var(--color-ink-900)]">
                    {preset.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {controls.headingFont ? (
        <PresetSelect
          label="Heading Font"
          value={selected.headingFontPreset}
          options={HOME_HEADING_FONT_PRESETS}
          onFocus={() => onFocus(section)}
          onChange={(value) =>
            onChange("headingFontPreset", value as HomeHeadingFontPresetId)
          }
        />
      ) : null}

      {controls.bodyFont ? (
        <PresetSelect
          label="Body Font"
          value={selected.bodyFontPreset}
          options={HOME_BODY_FONT_PRESETS}
          onFocus={() => onFocus(section)}
          onChange={(value) => onChange("bodyFontPreset", value as HomeBodyFontPresetId)}
        />
      ) : null}

      {controls.displaySize ? (
        <PresetSelect
          label="Display Size"
          value={selected.displaySizePreset}
          options={HOME_DISPLAY_SIZE_PRESETS}
          onFocus={() => onFocus(section)}
          onChange={(value) =>
            onChange("displaySizePreset", value as HomeDisplaySizePresetId)
          }
        />
      ) : null}

      {controls.bodySize ? (
        <PresetSelect
          label="Body Size"
          value={selected.bodySizePreset}
          options={HOME_BODY_SIZE_PRESETS}
          onFocus={() => onFocus(section)}
          onChange={(value) => onChange("bodySizePreset", value as HomeBodySizePresetId)}
        />
      ) : null}
    </div>
  );
}

function getSectionControls(section: HomeDesignSectionKey) {
  switch (section) {
    case "footer":
      return {
        color: true,
        headingFont: false,
        bodyFont: true,
        displaySize: false,
        bodySize: true,
      };
    default:
      return {
        color: true,
        headingFont: true,
        bodyFont: true,
        displaySize: true,
        bodySize: true,
      };
  }
}

function PresetSelect({
  label,
  value,
  options,
  onFocus,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<{ id: string; label: string }>;
  onFocus?: () => void;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block space-y-2">
      <span className="block text-sm font-medium text-[var(--color-ink-700)]">
        {label}
      </span>
      <select
        value={value}
        onFocus={onFocus}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-[color:rgb(146_146_146_/_0.18)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--color-wix-blue)]"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function PageDesignPanel({
  selected,
  onFocus,
  onChange,
}: {
  selected: ReturnType<typeof getSelectedPageComponentDesign>;
  onFocus: () => void;
  onChange: (
    key: PageDesignKey,
    value:
      | PageColorPresetId
      | PageHeadingFontPresetId
      | PageBodyFontPresetId
      | PageDisplaySizePresetId
      | PageBodySizePresetId,
  ) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="text-sm font-medium text-[var(--color-ink-700)]">Color Palette</p>
        <div className="grid grid-cols-4 gap-3">
          {PAGE_COLOR_PRESETS.map((preset) => {
            const active = selected.colorPreset === preset.id;

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  onFocus();
                  onChange("colorPreset", preset.id);
                }}
                className={`space-y-2 rounded-2xl border p-2 text-left transition ${
                  active
                    ? "border-[var(--color-wix-blue)] bg-[color:rgb(56_153_236_/_0.08)]"
                    : "border-[color:rgb(146_146_146_/_0.18)] bg-white hover:border-[var(--color-wix-blue)]"
                }`}
              >
                <span className="block h-10 w-full rounded-xl" style={{ background: preset.swatch }} />
                <span className="block text-xs font-semibold text-[var(--color-ink-900)]">
                  {preset.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <PresetSelect
        label="Heading Font"
        value={selected.headingFontPreset}
        options={PAGE_HEADING_FONT_PRESETS}
        onFocus={onFocus}
        onChange={(value) => onChange("headingFontPreset", value as PageHeadingFontPresetId)}
      />

      <PresetSelect
        label="Body Font"
        value={selected.bodyFontPreset}
        options={PAGE_BODY_FONT_PRESETS}
        onFocus={onFocus}
        onChange={(value) => onChange("bodyFontPreset", value as PageBodyFontPresetId)}
      />

      <PresetSelect
        label="Display Size"
        value={selected.displaySizePreset}
        options={PAGE_DISPLAY_SIZE_PRESETS}
        onFocus={onFocus}
        onChange={(value) => onChange("displaySizePreset", value as PageDisplaySizePresetId)}
      />

      <PresetSelect
        label="Body Size"
        value={selected.bodySizePreset}
        options={PAGE_BODY_SIZE_PRESETS}
        onFocus={onFocus}
        onChange={(value) => onChange("bodySizePreset", value as PageBodySizePresetId)}
      />
    </div>
  );
}
