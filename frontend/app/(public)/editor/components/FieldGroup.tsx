"use client";

import type { ReactNode } from "react";
import { titleize } from "./editor-utils";
import { publicBadgeStyles } from "../../shared/public-ui";

export default function FieldGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-[24px] border border-slate-200/80 bg-white/90 p-4 shadow-[0_14px_30px_-28px_rgba(15,23,42,0.22)]">
      <div className="space-y-2">
        <span className={publicBadgeStyles.slate}>{titleize(title)}</span>
        <p className="text-sm text-[var(--color-ink-700)]">
          Adjust the saved values for this section and keep the preview in sync.
        </p>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
