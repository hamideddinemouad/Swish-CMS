"use client";

import { publicButtonStyles, publicSurfaceStyles } from "../../shared/public-ui";

export default function MobileEditorStatusBar({
  status,
  isSaving,
  statusTone,
  onOpenPreview,
}: {
  status: string;
  isSaving: boolean;
  statusTone: "neutral" | "success" | "error";
  onOpenPreview: () => void;
}) {
  const meta = getStatusMeta(status, isSaving, statusTone);

  return (
    <div className="sticky bottom-3 z-20 mt-2 pb-[calc(env(safe-area-inset-bottom)+0.25rem)]">
      <div
        className={`${publicSurfaceStyles.soft} ${meta.className} flex items-center gap-3 px-3 py-3 shadow-[0_22px_52px_-34px_rgba(15,23,42,0.34)] backdrop-blur-xl`}
      >
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-500)]">
            {meta.label}
          </p>
          <p className="truncate text-sm font-medium text-[var(--color-deep-navy)]">
            {meta.message}
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenPreview}
          className={`${publicButtonStyles.dark} min-h-[44px] shrink-0 rounded-[18px] px-4 py-2.5 text-sm touch-manipulation`}
        >
          Preview
        </button>
      </div>
    </div>
  );
}

function getStatusMeta(
  status: string,
  isSaving: boolean,
  statusTone: "neutral" | "success" | "error",
) {
  if (isSaving) {
    return {
      label: "Saving",
      message: "Current changes are being synced.",
      className:
        "border-[rgb(56_153_236_/_0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(239,247,255,0.96))]",
    };
  }

  if (statusTone === "success") {
    return {
      label: "Saved",
      message: status,
      className:
        "border-[rgb(96_188_87_/_0.2)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,252,243,0.96))]",
    };
  }

  if (statusTone === "error") {
    return {
      label: "Needs attention",
      message: status,
      className:
        "border-[rgb(224_43_74_/_0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,244,246,0.96))]",
    };
  }

  return {
    label: "Autosave",
    message: "Changes save when a field loses focus.",
    className:
      "border-[rgb(56_153_236_/_0.16)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,250,255,0.96))]",
  };
}
