"use client";

import { useEffect } from "react";
import type { RefObject } from "react";
import Renderer from "../[pageName]/components/renderer";
import type { PageConfig } from "../lib/types";
import {
  editorBadgeStyles,
  editorButtonStyles,
  editorSurfaceStyles,
} from "../../shared/public-ui";

export default function MobileEditorPreviewSheet({
  open,
  pageName,
  config,
  previewRef,
  highlightedSectionId,
  onClose,
}: {
  open: boolean;
  pageName: string;
  config: PageConfig;
  previewRef?: RefObject<HTMLDivElement | null>;
  highlightedSectionId?: string | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] lg:hidden">
      <button
        type="button"
        aria-label="Close preview"
        onClick={onClose}
        className="absolute inset-0 bg-[rgba(15,23,42,0.38)] backdrop-blur-[2px]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-editor-preview-title"
        className="absolute inset-x-0 bottom-0 flex max-h-[min(82dvh,48rem)] flex-col rounded-t-[24px] border border-[color:rgb(146_146_146_/_0.14)] bg-white shadow-[0_-24px_60px_-30px_rgba(15,23,42,0.32)]"
      >
        <div className="pb-2 pt-3">
          <div className="mx-auto h-1.5 w-14 rounded-full bg-slate-300/90" />
        </div>

        <div className="flex items-center justify-between gap-3 border-b border-white/80 px-4 pb-3">
          <div className="min-w-0 space-y-2">
            <span className={editorBadgeStyles.slate}>Live preview</span>
            <p
              id="mobile-editor-preview-title"
              className="truncate text-base font-semibold tracking-[-0.04em] text-[var(--color-ink-900)]"
            >
              Preview /editor/{pageName}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`${editorButtonStyles.secondary} min-h-[44px] shrink-0 text-sm touch-manipulation`}
          >
            Close
          </button>
        </div>

        <div
          ref={previewRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 pb-[calc(env(safe-area-inset-bottom)+1rem)] sm:p-4"
        >
          <div className={`${editorSurfaceStyles.panel} flex min-h-full flex-col overflow-hidden`}>
            <div className={`${editorSurfaceStyles.chrome} flex items-center justify-between gap-4 px-4 py-3`}>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-wix-red)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-wix-yellow)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-wix-green)]" />
              </div>
              <div className="rounded-full border border-[color:rgb(146_146_146_/_0.16)] bg-white px-3 py-1 text-xs font-medium text-[var(--color-ink-700)]">
                Preview /editor/{pageName}
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-500)]">
                Live renderer
              </div>
            </div>
            <div className="flex-1 overflow-y-auto bg-[color:rgb(248_249_251)] p-3">
              <div className="overflow-hidden rounded-[16px] border border-[color:rgb(146_146_146_/_0.14)] bg-white shadow-[0_14px_34px_-28px_rgba(15,23,42,0.18)]">
                <Renderer
                  pageName={pageName}
                  config={config}
                  highlightedSectionId={highlightedSectionId ?? null}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
