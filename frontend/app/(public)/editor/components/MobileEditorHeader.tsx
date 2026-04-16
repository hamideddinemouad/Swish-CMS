"use client";

import {
  editorBadgeStyles,
  editorButtonStyles,
  editorSurfaceStyles,
} from "../../shared/public-ui";
import { titleize } from "./editor-utils";

export default function MobileEditorHeader({
  badge,
  title,
  sidebarTitle,
  pageName,
  statusTone,
  isSaving,
  onOpenPreview,
}: {
  badge: string;
  title: string;
  sidebarTitle: string;
  pageName: string;
  statusTone: "neutral" | "success" | "error";
  isSaving: boolean;
  onOpenPreview: () => void;
}) {
  const statusChip = getStatusChip(statusTone, isSaving);

  return (
    <div
      className={`${editorSurfaceStyles.overlay} sticky top-3 z-20 p-3`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className={editorBadgeStyles.blue}>{badge}</span>
            <span className={statusChip.className}>{statusChip.label}</span>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold tracking-[-0.04em] text-[var(--color-ink-900)]">
              {title}
            </p>
            <p className="text-sm text-[var(--color-ink-700)]">
              {titleize(pageName)} · {sidebarTitle}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenPreview}
          className={`${editorButtonStyles.primary} min-h-[44px] shrink-0 touch-manipulation`}
        >
          Live Preview
        </button>
      </div>
    </div>
  );
}

function getStatusChip(
  statusTone: "neutral" | "success" | "error",
  isSaving: boolean,
) {
  if (isSaving) {
      return {
        label: "Saving",
        className:
        "inline-flex items-center rounded-full border border-[rgb(56_153_236_/_0.16)] bg-[rgb(56_153_236_/_0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]",
      };
  }

  if (statusTone === "success") {
    return {
      label: "Saved",
      className: editorBadgeStyles.green,
    };
  }

  if (statusTone === "error") {
    return {
      label: "Check",
      className:
        "inline-flex items-center rounded-full border border-[rgb(224_43_74_/_0.18)] bg-[rgb(224_43_74_/_0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-red)]",
    };
  }

  return {
    label: "Autosave",
    className: editorBadgeStyles.slate,
  };
}
