"use client";

import { editorButtonStyles, editorSurfaceStyles } from "../../shared/public-ui";

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
        className={`${editorSurfaceStyles.overlay} ${meta.className} flex items-center gap-3 px-3 py-3`}
      >
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-500)]">
            {meta.label}
          </p>
          <p className="truncate text-sm font-medium text-[var(--color-ink-900)]">
            {meta.message}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 pr-1">
            <span className="hidden max-w-[5.5rem] text-right text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)] min-[360px]:block">
              Open preview
            </span>
            <span
              aria-hidden="true"
              className="preview-cue inline-flex h-9 w-9 items-center justify-center rounded-[12px] border border-[rgb(56_153_236_/_0.16)] bg-[rgb(56_153_236_/_0.08)] text-[var(--color-wix-blue)]"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
                <path
                  d="M3.75 10h10.5M10.5 5.75 14.75 10l-4.25 4.25"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
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

      <style jsx>{`
        .preview-cue {
          animation: preview-cue-breathe 1.85s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }

        @keyframes preview-cue-breathe {
          0%,
          100% {
            opacity: 0.78;
            transform: translateX(0) scale(1);
          }

          50% {
            opacity: 1;
            transform: translateX(0.28rem) scale(1.08);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .preview-cue {
            animation: none;
          }
        }
      `}</style>
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
        "border-[rgb(56_153_236_/_0.16)]",
    };
  }

  if (statusTone === "success") {
    return {
      label: "Saved",
      message: status,
      className:
        "border-[rgb(96_188_87_/_0.18)]",
    };
  }

  if (statusTone === "error") {
    return {
      label: "Needs attention",
      message: status,
      className:
        "border-[rgb(224_43_74_/_0.16)]",
    };
  }

  return {
    label: "Autosave",
    message: "Changes save when a field loses focus.",
    className:
      "border-[color:rgb(146_146_146_/_0.14)]",
  };
}
