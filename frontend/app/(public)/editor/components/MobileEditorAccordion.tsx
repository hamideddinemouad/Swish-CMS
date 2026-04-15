"use client";

import type { MobileEditorSection } from "./EditorScaffold";
import { publicSurfaceStyles } from "../../shared/public-ui";

export default function MobileEditorAccordion({
  sections,
  openSectionId,
  onToggleSection,
}: {
  sections: MobileEditorSection[];
  openSectionId: string | null;
  onToggleSection: (sectionId: string | null) => void;
}) {
  if (sections.length === 0) {
    return (
      <div className={`${publicSurfaceStyles.inset} p-4`}>
        <p className="text-sm font-semibold text-[var(--color-ink-900)]">Nothing to edit yet</p>
        <p className="mt-2 text-sm leading-6 text-[var(--color-ink-700)]">
          This page does not have editable sections available on mobile right now.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 pb-28">
      {sections.map((section) => {
        const isOpen = section.id === openSectionId;

        return (
          <section
            key={section.id}
            className={`${publicSurfaceStyles.soft} overflow-hidden border-white/80 transition-shadow motion-reduce:transition-none ${isOpen ? "shadow-[0_22px_48px_-36px_rgba(56,153,236,0.34)]" : ""}`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => onToggleSection(isOpen ? null : section.id)}
              className="flex min-h-[44px] w-full items-start justify-between gap-3 px-4 py-4 text-left touch-manipulation"
            >
              <div className="min-w-0">
                <p className="text-base font-semibold tracking-[-0.03em] text-[var(--color-deep-navy)]">
                  {section.title}
                </p>
                {section.description ? (
                  <p className="mt-1 text-sm leading-6 text-[var(--color-ink-700)]">
                    {section.description}
                  </p>
                ) : null}
              </div>
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgb(56_153_236_/_0.14)] bg-white/88 text-[var(--color-wix-blue)]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className={`h-4 w-4 transition-transform motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
                  fill="none"
                >
                  <path
                    d="M5 7.5 10 12.5 15 7.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            {isOpen ? (
              <div className="border-t border-[rgb(56_153_236_/_0.1)] px-4 pb-4 pt-4">
                {section.content}
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
