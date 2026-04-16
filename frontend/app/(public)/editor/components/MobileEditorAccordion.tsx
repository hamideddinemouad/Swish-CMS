"use client";

import type { MobileEditorSection } from "./EditorScaffold";
import { editorSurfaceStyles } from "../../shared/public-ui";

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
      <div className={`${editorSurfaceStyles.inset} p-4`}>
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
            className={`${editorSurfaceStyles.panel} overflow-hidden transition-colors duration-200 motion-reduce:transition-none ${isOpen ? "border-[rgb(56_153_236_/_0.18)]" : ""}`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => onToggleSection(isOpen ? null : section.id)}
              className="flex min-h-[44px] w-full items-start justify-between gap-3 px-4 py-4 text-left touch-manipulation"
            >
              <div className="min-w-0">
                <p className="text-base font-semibold tracking-[-0.03em] text-[var(--color-ink-900)]">
                  {section.title}
                </p>
                {section.description ? (
                  <p className="mt-1 text-sm leading-6 text-[var(--color-ink-700)]">
                    {section.description}
                  </p>
                ) : null}
              </div>
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-[color:rgb(146_146_146_/_0.14)] bg-[color:rgb(248_249_251)] text-[var(--color-wix-blue)]">
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
              <div className="border-t border-[color:rgb(146_146_146_/_0.12)] px-4 pb-4 pt-4">
                {section.content}
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
