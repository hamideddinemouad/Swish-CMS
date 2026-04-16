"use client";

import { useState } from "react";
import type { ReactNode, RefObject } from "react";
import Renderer from "../[pageName]/components/renderer";
import type { PageConfig } from "../lib/types";
import {
  editorBadgeStyles,
  editorSurfaceStyles,
  StatusBanner,
} from "../../shared/public-ui";
import MobileEditorAccordion from "./MobileEditorAccordion";
import MobileEditorHeader from "./MobileEditorHeader";
import MobileEditorPreviewSheet from "./MobileEditorPreviewSheet";
import MobileEditorStatusBar from "./MobileEditorStatusBar";

export type MobileEditorSection = {
  id: string;
  title: string;
  description?: string;
  content: ReactNode;
};

type EditorScaffoldProps = {
  pageName: string;
  badge: string;
  title: string;
  description: string;
  sidebarTitle: string;
  status: string;
  isSaving: boolean;
  statusTone: "neutral" | "success" | "error";
  previewRef?: RefObject<HTMLDivElement | null>;
  config: PageConfig;
  sidebar: ReactNode;
  mobileSections: MobileEditorSection[];
  desktopSidebar?: ReactNode;
  highlightedSectionId?: string | null;
  onSectionToggle?: (sectionId: string | null) => void;
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
  mobileSections,
  desktopSidebar,
  highlightedSectionId = null,
  onSectionToggle,
}: EditorScaffoldProps) {
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);
  const [openMobileSectionId, setOpenMobileSectionId] = useState<string | null>(null);

  const showInlineStatus = isSaving || statusTone === "error";
  const activeMobileSectionId = mobileSections.some(
    (section) => section.id === openMobileSectionId,
  )
    ? openMobileSectionId
    : null;

  function handleMobileToggle(sectionId: string | null) {
    setOpenMobileSectionId(sectionId);
    onSectionToggle?.(sectionId);
  }

  return (
    <section className="flex min-h-[calc(100dvh-9rem)] flex-col gap-6 lg:min-h-[calc(100vh-10rem)]">
      {statusTone === "success" ? <FloatingSuccessToast message={status} /> : null}

      <div className="hidden gap-4 lg:grid xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-end">
        <div className="space-y-3">
          <span className={editorBadgeStyles.blue}>{badge}</span>
          <h1 className="text-3xl font-semibold tracking-[-0.05em] text-[var(--color-ink-900)]">
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

      <div className="space-y-4 lg:hidden">
        <MobileEditorHeader
          badge={badge}
          title={title}
          sidebarTitle={sidebarTitle}
          pageName={pageName}
          statusTone={statusTone}
          isSaving={isSaving}
          onOpenPreview={() => setIsMobilePreviewOpen(true)}
        />
        <MobileEditorAccordion
          sections={mobileSections}
          openSectionId={activeMobileSectionId}
          onToggleSection={handleMobileToggle}
        />
        <MobileEditorStatusBar
          status={status}
          isSaving={isSaving}
          statusTone={statusTone}
          onOpenPreview={() => setIsMobilePreviewOpen(true)}
        />
      </div>

      <div className="hidden flex-1 gap-5 lg:grid lg:grid-cols-[minmax(300px,340px)_minmax(0,1fr)] lg:items-start xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className={`${editorSurfaceStyles.panel} p-4 lg:sticky lg:top-6 lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto`}>
          <div className="space-y-3">
            <span className={editorBadgeStyles.slate}>{sidebarTitle}</span>
            <p className="text-sm leading-6 text-[var(--color-ink-700)]">
              {isSaving ? "Saving current changes..." : "Changes update the live preview below."}
            </p>
            {showInlineStatus ? (
              <div className="xl:hidden">
                <StatusBanner tone={isSaving ? "info" : "error"}>{status}</StatusBanner>
              </div>
            ) : null}
          </div>
          <div className="mt-4 space-y-3">{desktopSidebar ?? sidebar}</div>
        </aside>

        <div className={`${editorSurfaceStyles.panel} flex min-h-[70vh] flex-col overflow-hidden lg:h-[calc(100vh-10rem)]`}>
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
          <div
            ref={previewRef}
            className="flex-1 min-h-0 overflow-y-auto bg-[color:rgb(248_249_251)] p-2 sm:p-3 lg:p-3"
          >
            <Renderer
              pageName={pageName}
              config={config}
              highlightedSectionId={highlightedSectionId}
            />
            
          </div>
        </div>
      </div>

      <MobileEditorPreviewSheet
        open={isMobilePreviewOpen}
        pageName={pageName}
        config={config}
        previewRef={previewRef}
        highlightedSectionId={highlightedSectionId}
        onClose={() => setIsMobilePreviewOpen(false)}
      />
    </section>
  );
}

function FloatingSuccessToast({ message }: { message: string }) {
  return (
    <div className="pointer-events-none fixed right-4 top-24 z-[70] sm:right-6 lg:right-8">
      <div
        role="status"
        aria-live="polite"
        className="floating-success-toast flex items-center gap-3 rounded-[18px] border border-[rgb(96_188_87_/_0.18)] bg-white px-4 py-3 shadow-[0_18px_42px_-28px_rgba(15,23,42,0.28)]"
      >
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
          <p className="text-base font-semibold text-[var(--color-ink-900)]">{message}</p>
        </div>
      </div>
      <style jsx>{`
        .floating-success-toast {
          animation: floating-success-toast 2200ms ease forwards;
        }

        @keyframes floating-success-toast {
          0% {
            opacity: 0;
            transform: translateY(0.75rem) scale(0.98);
          }

          12%,
          74% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          100% {
            opacity: 0;
            transform: translateY(-0.35rem) scale(0.985);
          }
        }
      `}</style>
    </div>
  );
}
