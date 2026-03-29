"use client";

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { EditorSidebar } from "./EditorSidebar";
import { JsonEditorCard } from "./JsonEditorCard";
import type { EditorPagesResponse, PageDetail, PageSummary } from "./types";

type StatusState = {
  kind: "idle" | "success" | "error";
  message: string;
};

export function EditorWorkspace() {
  const [pages, setPages] = useState<PageSummary[]>([]);
  const [selectedPageName, setSelectedPageName] = useState("");
  const [pageDetail, setPageDetail] = useState<PageDetail | null>(null);
  const [contentDraft, setContentDraft] = useState("");
  const [preferenceDraft, setPreferenceDraft] = useState("");
  const [contentError, setContentError] = useState<string | null>(null);
  const [preferenceError, setPreferenceError] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusState>({
    kind: "idle",
    message: "",
  });
  const [isLoadingPages, setIsLoadingPages] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isSavingContent, setIsSavingContent] = useState(false);
  const [isSavingPreference, setIsSavingPreference] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const selectedPage = useMemo(
    () => pages.find((page) => resolvePageName(page) === selectedPageName) ?? null,
    [pages, selectedPageName],
  );

  useEffect(() => {
    void loadPages(true);
  }, []);

  useEffect(() => {
    if (!selectedPageName && pages.length > 0) {
      setSelectedPageName(resolvePageName(pages[0]));
    }
  }, [pages, selectedPageName]);

  useEffect(() => {
    if (!selectedPageName) {
      return;
    }

    void loadPage(selectedPageName);
  }, [selectedPageName]);

  async function loadPages(shouldSelectFirst = false) {
    setIsLoadingPages(true);
    try {
      const response = await axios.get<EditorPagesResponse>("/api/editor/pages");
      const nextPages = normalizePages(response.data);

      setPages(nextPages);

      if (shouldSelectFirst && nextPages.length > 0) {
        setSelectedPageName(resolvePageName(nextPages[0]));
      }

      setStatus({
        kind: "success",
        message: nextPages.length
          ? "Pages loaded."
          : "No pages were returned for this tenant.",
      });
    } catch (error) {
      setPages([]);
      setPageDetail(null);
      setStatus({
        kind: "error",
        message: resolveErrorMessage(error, "Failed to load pages."),
      });
    } finally {
      setIsLoadingPages(false);
    }
  }

  async function loadPage(pageName: string) {
    setIsLoadingPage(true);
    try {
      const response = await axios.get<PageDetail>(
        `/api/editor/pages/${encodeURIComponent(pageName)}`,
      );

      const detail = response.data;
      setPageDetail(detail);
      setContentDraft(stringifyJson(detail.data));
      setPreferenceDraft(stringifyJson(detail.preference));
      setContentError(null);
      setPreferenceError(null);
      setStatus({
        kind: "success",
        message: `Loaded ${pageName}.`,
      });
    } catch (error) {
      setPageDetail(null);
      setContentDraft("");
      setPreferenceDraft("");
      setContentError(null);
      setPreferenceError(null);
      setStatus({
        kind: "error",
        message: resolveErrorMessage(error, `Failed to load ${pageName}.`),
      });
    } finally {
      setIsLoadingPage(false);
    }
  }

  async function saveContent() {
    if (!selectedPageName) {
      return;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(contentDraft);
      setContentError(null);
    } catch {
      setContentError("Content must be valid JSON.");
      return;
    }

    setIsSavingContent(true);
    try {
      await axios.patch(`/api/editor/pages/${encodeURIComponent(selectedPageName)}/content`, {
        data: parsed,
      });

      setStatus({
        kind: "success",
        message: `Saved content for ${selectedPageName}.`,
      });
      await loadPage(selectedPageName);
    } catch (error) {
      setStatus({
        kind: "error",
        message: resolveErrorMessage(error, "Failed to save content."),
      });
    } finally {
      setIsSavingContent(false);
    }
  }

  async function savePreference() {
    if (!selectedPageName) {
      return;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(preferenceDraft);
      setPreferenceError(null);
    } catch {
      setPreferenceError("Preference must be valid JSON.");
      return;
    }

    setIsSavingPreference(true);
    try {
      await axios.patch(
        `/api/editor/pages/${encodeURIComponent(selectedPageName)}/preference`,
        {
          preference: parsed,
        },
      );

      setStatus({
        kind: "success",
        message: `Saved preferences for ${selectedPageName}.`,
      });
      await loadPage(selectedPageName);
    } catch (error) {
      setStatus({
        kind: "error",
        message: resolveErrorMessage(error, "Failed to save preferences."),
      });
    } finally {
      setIsSavingPreference(false);
    }
  }

  function formatContent() {
    try {
      setContentDraft(stringifyJson(JSON.parse(contentDraft)));
      setContentError(null);
    } catch {
      setContentError("Content must be valid JSON before formatting.");
    }
  }

  function formatPreference() {
    try {
      setPreferenceDraft(stringifyJson(JSON.parse(preferenceDraft)));
      setPreferenceError(null);
    } catch {
      setPreferenceError("Preference must be valid JSON before formatting.");
    }
  }

  function resetContent() {
    if (!pageDetail) {
      return;
    }

    setContentDraft(stringifyJson(pageDetail.data));
    setContentError(null);
  }

  function resetPreference() {
    if (!pageDetail) {
      return;
    }

    setPreferenceDraft(stringifyJson(pageDetail.preference));
    setPreferenceError(null);
  }

  function disableComponent(componentType: string) {
    if (!selectedPageName) {
      return;
    }

    setIsMutating(true);
    void (async () => {
      try {
        await axios.patch(
          `/api/editor/pages/${encodeURIComponent(selectedPageName)}/components/${encodeURIComponent(componentType)}/disable`,
        );
        setStatus({
          kind: "success",
          message: `${componentType} disabled for ${selectedPageName}.`,
        });
        await Promise.all([loadPage(selectedPageName), loadPages(false)]);
      } catch (error) {
        setStatus({
          kind: "error",
          message: resolveErrorMessage(error, `Failed to disable ${componentType}.`),
        });
      } finally {
        setIsMutating(false);
      }
    })();
  }

  function deletePage() {
    if (!selectedPageName) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${selectedPageName}"? This removes the page and its component rows.`,
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    void axios
      .delete(`/api/editor/pages/${encodeURIComponent(selectedPageName)}`)
      .then(async () => {
        setStatus({
          kind: "success",
          message: `${selectedPageName} deleted.`,
        });
        setPageDetail(null);
        setContentDraft("");
        setPreferenceDraft("");

        const response = await axios.get<EditorPagesResponse>("/api/editor/pages");
        const nextPages = normalizePages(response.data);
        setPages(nextPages);
        const nextSelected = nextPages[0] ? resolvePageName(nextPages[0]) : "";
        setSelectedPageName(nextSelected);
        if (nextSelected) {
          await loadPage(nextSelected);
        }
      })
      .catch((error) => {
        setStatus({
          kind: "error",
          message: resolveErrorMessage(error, "Failed to delete page."),
        });
      })
      .finally(() => {
        setIsDeleting(false);
      });
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7fafc_0%,#eef4f9_100%)] px-6 py-6">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-6">
        <header className="rounded-[28px] border border-[color:rgb(146_146_146_/_0.16)] bg-white/88 p-6 shadow-[0_18px_50px_rgb(54_54_54_/_0.05)] backdrop-blur-xl">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
                Tenant editor
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[var(--color-ink-900)]">
                Edit page content and preferences
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-ink-700)]">
                This editor writes directly to the backend page endpoints. Content
                and preference changes are saved as complete objects, matching the
                page data model used by the tenant renderer.
              </p>
            </div>

            <div className="rounded-[22px] border border-[color:rgb(146_146_146_/_0.14)] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbfe_100%)] px-4 py-3 text-sm text-[var(--color-ink-700)]">
              <p className="font-semibold text-[var(--color-ink-900)]">
                {selectedPage?.title ?? humanize(selectedPageName || "No page selected")}
              </p>
              <p className="mt-1 uppercase tracking-[0.12em] text-[11px] text-[var(--color-ink-500)]">
                {selectedPageName || "Awaiting pages"}
              </p>
            </div>
          </div>

          <StatusBanner status={status} />
        </header>

        <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
          <EditorSidebar
            pages={pages}
            selectedPageName={selectedPageName}
            onSelectPage={setSelectedPageName}
            onRefresh={() => void loadPages(false)}
            isRefreshing={isLoadingPages}
          />

          <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
            <div className="space-y-6">
              <section className="rounded-[28px] border border-[color:rgb(146_146_146_/_0.16)] bg-white/90 p-5 shadow-[0_18px_50px_rgb(54_54_54_/_0.05)]">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-wix-blue)]">
                      Selected page
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-ink-700)]">
                      {selectedPageName
                        ? `Editing ${selectedPageName}. Save either section independently, or disable blocks from the page inspector.`
                        : "Load a page from the sidebar to begin."}
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-[color:rgb(146_146_146_/_0.14)] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbfe_100%)] px-4 py-3 text-sm text-[var(--color-ink-700)]">
                    <p className="font-semibold text-[var(--color-ink-900)]">
                      {pageDetail?.components.length ?? 0} blocks
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[var(--color-ink-500)]">
                      {isLoadingPage ? "Loading" : "Ready"}
                    </p>
                  </div>
                </div>
              </section>

              <JsonEditorCard
                title="Content"
                description="Edit the full page data object. The save action replaces the entire component.data payload."
                value={contentDraft}
                error={contentError}
                isSaving={isSavingContent}
                onChange={setContentDraft}
                onSave={() => void saveContent()}
                onFormat={formatContent}
                onReset={resetContent}
              />

              <JsonEditorCard
                title="Preferences"
                description="Edit the full preference object. The save action replaces the entire component.preference payload."
                value={preferenceDraft}
                error={preferenceError}
                isSaving={isSavingPreference}
                onChange={setPreferenceDraft}
                onSave={() => void savePreference()}
                onFormat={formatPreference}
                onReset={resetPreference}
              />
            </div>

            <aside className="space-y-6">
              <section className="rounded-[28px] border border-[color:rgb(146_146_146_/_0.16)] bg-white/90 p-5 shadow-[0_18px_50px_rgb(54_54_54_/_0.05)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-wix-blue)]">
                      Components
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-ink-700)]">
                      Disable a block on the current page. This uses the backend block
                      disable endpoint and then refreshes the page state.
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {(pageDetail?.components ?? []).map((component) => (
                    <div
                      key={`${component.type}-${component.variant ?? "default"}`}
                      className="rounded-[22px] border border-[color:rgb(146_146_146_/_0.14)] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbfe_100%)] p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-[var(--color-ink-900)]">
                            {component.type}
                          </p>
                          <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[var(--color-ink-500)]">
                            {component.enabled ? "Enabled" : "Disabled"}
                            {component.variant ? ` • ${component.variant}` : ""}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => disableComponent(component.type)}
                          disabled={!component.enabled || isMutating}
                          className="rounded-2xl border border-[color:rgb(146_146_146_/_0.16)] px-4 py-2 text-sm font-semibold text-[var(--color-ink-900)] transition hover:border-[var(--color-wix-blue)] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Disable
                        </button>
                      </div>
                    </div>
                  ))}

                  {pageDetail?.components.length ? null : (
                    <div className="rounded-[22px] border border-dashed border-[color:rgb(146_146_146_/_0.2)] p-4 text-sm leading-6 text-[var(--color-ink-700)]">
                      No components were returned for this page.
                    </div>
                  )}
                </div>
              </section>

              <section className="rounded-[28px] border border-[color:rgb(146_146_146_/_0.16)] bg-white/90 p-5 shadow-[0_18px_50px_rgb(54_54_54_/_0.05)]">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-wix-blue)]">
                  Page actions
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-ink-700)]">
                  Destructive actions should be used carefully. Delete removes the
                  page and cascades the component row delete on the backend.
                </p>

                <button
                  type="button"
                  onClick={deletePage}
                  disabled={!selectedPageName || isDeleting}
                  className="mt-4 w-full rounded-2xl border border-[color:rgb(224_43_74_/_0.18)] bg-[color:rgb(224_43_74_/_0.05)] px-4 py-3 text-sm font-semibold text-[var(--color-wix-red)] transition hover:border-[var(--color-wix-red)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isDeleting ? "Deleting" : "Delete page"}
                </button>
              </section>
            </aside>
          </section>
        </div>
      </div>
    </main>
  );
}

function StatusBanner({ status }: { status: StatusState }) {
  if (status.kind === "idle" || !status.message) {
    return null;
  }

  const styles =
    status.kind === "success"
      ? "border-[color:rgb(96_188_87_/_0.18)] bg-[color:rgb(96_188_87_/_0.08)] text-[var(--color-wix-green)]"
      : "border-[color:rgb(224_43_74_/_0.18)] bg-[color:rgb(224_43_74_/_0.08)] text-[var(--color-wix-red)]";

  return (
    <div className={`mt-5 rounded-[22px] border px-4 py-3 text-sm ${styles}`}>
      {status.message}
    </div>
  );
}

function resolvePageName(page: PageSummary) {
  return page.pageName ?? page.slug ?? page.name ?? "";
}

function normalizePages(response: EditorPagesResponse) {
  const pages = Array.isArray(response) ? response : response.pages;

  return pages
    .map((page) => {
      if (typeof page === "string") {
        return { slug: page };
      }

      return {
        ...page,
        slug: page.slug ?? page.pageName ?? page.name ?? "",
      };
    })
    .filter((page) => page.slug.length > 0);
}

function stringifyJson(value: unknown) {
  return JSON.stringify(value ?? {}, null, 2);
}

function resolveErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? fallback;
  }

  return fallback;
}

function humanize(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}
