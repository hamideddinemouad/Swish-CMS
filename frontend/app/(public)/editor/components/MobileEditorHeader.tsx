"use client";

import { publicBadgeStyles, publicButtonStyles, publicSurfaceStyles } from "../../shared/public-ui";
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
      className={`${publicSurfaceStyles.soft} sticky top-3 z-20 border-white/85 p-3 backdrop-blur-xl [box-shadow:0_18px_40px_-34px_rgba(15,23,42,0.28)]`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className={publicBadgeStyles.blue}>{badge}</span>
            <span className={statusChip.className}>{statusChip.label}</span>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold tracking-[-0.04em] text-[var(--color-deep-navy)]">
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
          className={`${publicButtonStyles.primary} min-h-[44px] shrink-0 rounded-[18px] px-4 py-2.5 text-sm ring-4 ring-[rgb(56_153_236_/_0.12)] touch-manipulation`}
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
        "inline-flex items-center rounded-full border border-[rgb(56_153_236_/_0.18)] bg-[rgb(56_153_236_/_0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]",
    };
  }

  if (statusTone === "success") {
    return {
      label: "Saved",
      className: publicBadgeStyles.green,
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
    className: publicBadgeStyles.slate,
  };
}
