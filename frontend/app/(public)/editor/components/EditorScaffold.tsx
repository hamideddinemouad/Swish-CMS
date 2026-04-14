"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Renderer from "../[pageName]/components/renderer";
import type { PageConfig } from "../lib/types";

type EditorScaffoldProps = {
  pageName: string;
  badge: string;
  title: string;
  description: string;
  sidebarTitle: string;
  status: string;
  isSaving: boolean;
  previewRef?: React.RefObject<HTMLDivElement | null>;
  config: PageConfig;
  sidebar: ReactNode;
};

export default function EditorScaffold({
  pageName,
  badge,
  title,
  description,
  sidebarTitle,
  status,
  isSaving,
  previewRef,
  config,
  sidebar,
}: EditorScaffoldProps) {
  const [mobilePanel, setMobilePanel] = useState<"edit" | "preview">("edit");

  return (
    <section className="flex min-h-[calc(100vh-9rem)] flex-col gap-6 rounded-none border-0 bg-transparent p-0 shadow-none lg:min-h-[calc(100vh-10rem)]">
      <div className="flex flex-col gap-2 px-1 sm:px-0">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
          {badge}
        </p>
        <h1 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink-900)] sm:text-3xl">
          {title}
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-[var(--color-ink-700)]">
          {description}
        </p>
      </div>

      <div className="lg:hidden">
        <div className="inline-flex rounded-[22px] border border-[color:rgb(56_153_236_/_0.16)] bg-[linear-gradient(180deg,#ffffff_0%,#f6faff_100%)] p-1.5 shadow-[0_16px_40px_rgb(56_153_236_/_0.08)]">
          <button
            type="button"
            onClick={() => setMobilePanel("edit")}
            className={`rounded-2xl px-4 py-2.5 text-sm font-medium transition ${
              mobilePanel === "edit"
                ? "bg-[var(--color-wix-blue)] text-white shadow-[0_14px_28px_rgba(56,153,236,0.22)]"
                : "text-[var(--color-ink-700)]"
            }`}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setMobilePanel("preview")}
            className={`rounded-2xl px-4 py-2.5 text-sm font-medium transition ${
              mobilePanel === "preview"
                ? "bg-slate-950 text-white shadow-[0_14px_28px_rgba(15,23,42,0.18)]"
                : "text-[var(--color-ink-700)]"
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      <div className="grid flex-1 gap-6 lg:grid-cols-[minmax(340px,440px)_minmax(0,1fr)] lg:items-start">
        <aside
          className={`rounded-[28px] border border-[color:rgb(146_146_146_/_0.14)] bg-[linear-gradient(180deg,#ffffff_0%,#f7fafc_100%)] p-5 shadow-[0_18px_50px_rgb(54_54_54_/_0.05)] lg:sticky lg:top-6 lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto ${
            mobilePanel === "preview" ? "hidden lg:block" : "block"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
            {sidebarTitle}
          </p>
          <p className="mt-2 text-sm text-[var(--color-ink-700)]">{status}</p>
          {isSaving ? (
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-wix-blue)]">
              Saving...
            </p>
          ) : null}
          <div className="mt-4 space-y-4">{sidebar}</div>
        </aside>

        <div
          className={`flex min-h-[70vh] flex-col overflow-hidden rounded-[32px] border border-[color:rgb(146_146_146_/_0.16)] bg-[linear-gradient(180deg,#f8fbff_0%,#edf2f7_100%)] shadow-[0_24px_70px_rgb(54_54_54_/_0.12)] lg:h-[calc(100vh-10rem)] ${
            mobilePanel === "edit" ? "hidden lg:flex" : "flex"
          }`}
        >
          <div className="flex items-center justify-between gap-4 border-b border-white/70 bg-white/75 px-4 py-3 backdrop-blur">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#fb7d33]" />
              <span className="h-3 w-3 rounded-full bg-[#ffc233]" />
              <span className="h-3 w-3 rounded-full bg-[#60bc57]" />
            </div>
            <div className="rounded-full border border-[color:rgb(146_146_146_/_0.14)] bg-white px-3 py-1 text-xs font-medium text-[var(--color-ink-700)]">
              Preview /editor/{pageName}
            </div>
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-500)]">
              Browser frame
            </div>
          </div>
          <div ref={previewRef} className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 lg:p-5">
            <div className="overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_18px_50px_rgb(54_54_54_/_0.08)]">
              <Renderer pageName={pageName} config={config} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
