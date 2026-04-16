"use client";

import type { ReactNode } from "react";
import { titleize } from "./editor-utils";
import { editorBadgeStyles, editorSurfaceStyles } from "../../shared/public-ui";

export default function FieldGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={`${editorSurfaceStyles.inset} space-y-4 p-4`}>
      <div className="space-y-2">
        <span className={editorBadgeStyles.slate}>{titleize(title)}</span>
        <p className="text-sm text-[var(--color-ink-700)]">
          Adjust the saved values for this section and keep the preview in sync.
        </p>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
