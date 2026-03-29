"use client";

import type { PageSummary } from "./types";

type EditorSidebarProps = {
  pages: PageSummary[];
  selectedPageName: string;
  onSelectPage: (pageName: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
};

export function EditorSidebar({
  pages,
  selectedPageName,
  onSelectPage,
  onRefresh,
  isRefreshing,
}: EditorSidebarProps) {
  return (
    <aside className="xl:w-[340px] xl:shrink-0">
      <div className="sticky top-6 flex max-h-[calc(100vh-3rem)] flex-col rounded-[28px] border border-[color:rgb(146_146_146_/_0.18)] bg-white/88 p-5 shadow-[0_18px_50px_rgb(54_54_54_/_0.06)] backdrop-blur-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
              Editor
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink-900)]">
              Pages
            </h1>
            <p className="mt-2 text-sm leading-6 text-[var(--color-ink-700)]">
              Select a tenant page, then edit its content and preferences.
            </p>
          </div>

          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="rounded-2xl border border-[color:rgb(56_153_236_/_0.18)] px-4 py-2 text-sm font-semibold text-[var(--color-wix-blue)] transition hover:border-[var(--color-wix-blue)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isRefreshing ? "Refreshing" : "Refresh"}
          </button>
        </div>

        <div className="mt-6 flex-1 space-y-3 overflow-y-auto pr-1">
          {pages.length === 0 ? (
            <EmptyState />
          ) : (
            pages.map((page) => {
              const pageName = resolvePageName(page);
              const isSelected = pageName === selectedPageName;
              const componentCount = page.components?.length ?? 0;

              return (
                <button
                  key={pageName}
                  type="button"
                  onClick={() => onSelectPage(pageName)}
                  className={`w-full rounded-[22px] border p-4 text-left transition ${
                    isSelected
                      ? "border-[var(--color-wix-blue)] bg-[color:rgb(56_153_236_/_0.08)] shadow-[0_10px_30px_rgb(56_153_236_/_0.08)]"
                      : "border-[color:rgb(146_146_146_/_0.16)] bg-white hover:border-[color:rgb(56_153_236_/_0.18)] hover:bg-[color:rgb(56_153_236_/_0.04)]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-ink-900)]">
                        {page.title ?? humanize(pageName)}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[var(--color-ink-500)]">
                        {pageName}
                      </p>
                    </div>
                    <span className="rounded-full border border-[color:rgb(146_146_146_/_0.14)] px-3 py-1 text-xs font-semibold text-[var(--color-ink-700)]">
                      {componentCount} blocks
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </aside>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[22px] border border-dashed border-[color:rgb(146_146_146_/_0.2)] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbfe_100%)] p-4 text-sm leading-6 text-[var(--color-ink-700)]">
      No pages were returned for this tenant.
    </div>
  );
}

function resolvePageName(page: PageSummary) {
  return page.pageName ?? page.slug ?? page.name ?? "";
}

function humanize(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}
