"use client";

import { useEffect } from "react";
import type { RefObject } from "react";
import Renderer from "../[pageName]/components/renderer";
import type { PageConfig } from "../lib/types";
import { publicBadgeStyles, publicButtonStyles } from "../../shared/public-ui";

export default function MobileEditorPreviewSheet({
  open,
  pageName,
  config,
  previewRef,
  onClose,
}: {
  open: boolean;
  pageName: string;
  config: PageConfig;
  previewRef?: RefObject<HTMLDivElement | null>;
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
        className="absolute inset-x-0 bottom-0 flex max-h-[min(82dvh,48rem)] flex-col rounded-t-[32px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(243,248,255,0.96))] shadow-[0_-24px_60px_-28px_rgba(15,23,42,0.42)]"
      >
        <div className="pb-2 pt-3">
          <div className="mx-auto h-1.5 w-14 rounded-full bg-slate-300/90" />
        </div>

        <div className="flex items-center justify-between gap-3 border-b border-white/80 px-4 pb-3">
          <div className="min-w-0 space-y-2">
            <span className={publicBadgeStyles.slate}>Live preview</span>
            <p
              id="mobile-editor-preview-title"
              className="truncate text-base font-semibold tracking-[-0.04em] text-[var(--color-deep-navy)]"
            >
              Preview /editor/{pageName}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`${publicButtonStyles.secondary} min-h-[44px] shrink-0 rounded-[18px] px-4 py-2.5 text-sm touch-manipulation`}
          >
            Close
          </button>
        </div>

        <div
          ref={previewRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 pb-[calc(env(safe-area-inset-bottom)+1rem)] sm:p-4"
        >
          <div className="flex min-h-full flex-col overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_18px_50px_rgb(54_54_54_/_0.08)]">
            <div className="flex items-center justify-between gap-4 border-b border-white/70 bg-white/76 px-4 py-3 backdrop-blur">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#fb7d33]" />
                <span className="h-3 w-3 rounded-full bg-[#ffc233]" />
                <span className="h-3 w-3 rounded-full bg-[#60bc57]" />
              </div>
              <div className="rounded-full border border-slate-200 bg-white/92 px-3 py-1 text-xs font-medium text-[var(--color-ink-700)]">
                Preview /editor/{pageName}
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-500)]">
                Live renderer
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <div className="overflow-hidden rounded-[24px] border border-white/80 bg-white shadow-[0_18px_50px_rgb(54_54_54_/_0.08)]">
                <Renderer pageName={pageName} config={config} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
