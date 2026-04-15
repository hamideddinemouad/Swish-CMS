"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Renderer from "../[pageName]/components/renderer";
import type { PageConfig } from "../lib/types";
import {
  StatusBanner,
  cx,
  publicBadgeStyles,
  publicSurfaceStyles,
} from "../../shared/public-ui";

type EditorScaffoldProps = {
  pageName: string;
  badge: string;
  title: string;
  description: string;
  sidebarTitle: string;
  status: string;
  isSaving: boolean;
  statusTone: "neutral" | "success" | "error";
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
  statusTone,
  previewRef,
  config,
  sidebar,
}: EditorScaffoldProps) {
  const [mobilePanel, setMobilePanel] = useState<"edit" | "preview">("edit");
  const [showFloatingSuccess, setShowFloatingSuccess] = useState(false);

  useEffect(() => {
    if (statusTone !== "success") {
      setShowFloatingSuccess(false);
      return;
    }

    setShowFloatingSuccess(true);
    const timeout = window.setTimeout(() => {
      setShowFloatingSuccess(false);
    }, 2200);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [status, statusTone]);

  const showInlineStatus = isSaving || statusTone === "error";

  return (
    <section className="flex min-h-[calc(100vh-9rem)] flex-col gap-6 lg:min-h-[calc(100vh-10rem)]">
      {showFloatingSuccess ? <FloatingSuccessToast message={status} /> : null}

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-end">
        <div className="space-y-3">
          <span className={publicBadgeStyles.blue}>{badge}</span>
          <h1 className="text-3xl font-semibold tracking-[-0.06em] text-[var(--color-deep-navy)]">
            {title}
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-[var(--color-ink-700)]">{description}</p>
        </div>

        {showInlineStatus ? (
          <div className="hidden xl:block">
            <StatusBanner tone={isSaving ? "info" : "error"}>{status}</StatusBanner>
          </div>
        ) : null}
      </div>

      <div className="lg:hidden">
        <div className="inline-flex rounded-[22px] border border-[color:rgb(56_153_236_/_0.16)] bg-[linear-gradient(180deg,#ffffff_0%,#f6faff_100%)] p-1.5 shadow-[0_16px_40px_rgb(56_153_236_/_0.08)]">
          <button
            type="button"
            onClick={() => setMobilePanel("edit")}
            className={cx(
              "rounded-2xl px-4 py-2.5 text-sm font-medium transition motion-reduce:transition-none",
              mobilePanel === "edit"
                ? "bg-[var(--color-wix-blue)] text-white shadow-[0_14px_28px_rgba(56,153,236,0.22)]"
                : "text-[var(--color-ink-700)]",
            )}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setMobilePanel("preview")}
            className={cx(
              "rounded-2xl px-4 py-2.5 text-sm font-medium transition motion-reduce:transition-none",
              mobilePanel === "preview"
                ? "bg-slate-950 text-white shadow-[0_14px_28px_rgba(15,23,42,0.18)]"
                : "text-[var(--color-ink-700)]",
            )}
          >
            Preview
          </button>
        </div>
      </div>

      <div className="grid flex-1 gap-6 lg:grid-cols-[minmax(340px,420px)_minmax(0,1fr)] lg:items-start">
        <aside
          className={cx(
            publicSurfaceStyles.soft,
            "p-5 lg:sticky lg:top-6 lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto",
            mobilePanel === "preview" ? "hidden lg:block" : "block",
          )}
        >
          <div className="space-y-3">
            <span className={publicBadgeStyles.slate}>{sidebarTitle}</span>
            <p className="text-sm leading-6 text-[var(--color-ink-700)]">
              {isSaving ? "Saving current changes..." : "Changes update the live preview below."}
            </p>
            {showInlineStatus ? (
              <div className="xl:hidden">
                <StatusBanner tone={isSaving ? "info" : "error"}>{status}</StatusBanner>
              </div>
            ) : null}
          </div>
          <div className="mt-4 space-y-4">{sidebar}</div>
        </aside>

        <div
          className={cx(
            publicSurfaceStyles.panel,
            "flex min-h-[70vh] flex-col overflow-hidden lg:h-[calc(100vh-10rem)]",
            mobilePanel === "edit" ? "hidden lg:flex" : "flex",
          )}
        >
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

function FloatingSuccessToast({ message }: { message: string }) {
  return (
    <div className="pointer-events-none fixed right-4 top-24 z-[70] sm:right-6 lg:right-8">
      <div className="flex items-center gap-3 rounded-[24px] border border-[rgb(115_175_85_/_0.24)] bg-white/96 px-4 py-3 shadow-[0_20px_46px_-24px_rgba(15,23,42,0.38)] backdrop-blur-xl">
        <svg
          aria-hidden="true"
          viewBox="0 0 130.2 130.2"
          className="h-11 w-11 shrink-0"
          fill="none"
        >
          <circle
            cx="65.1"
            cy="65.1"
            r="62.1"
            stroke="#73AF55"
            strokeWidth="6"
            strokeMiterlimit="10"
          />
          <polyline
            points="100.2,40.2 51.5,88.8 29.8,67.5"
            stroke="#73AF55"
            strokeWidth="6"
            strokeLinecap="round"
            strokeMiterlimit="10"
          />
        </svg>
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#73AF55]">
            Save complete
          </p>
          <p className="text-base font-semibold text-[var(--color-deep-navy)]">{message}</p>
        </div>
      </div>
    </div>
  );
}
