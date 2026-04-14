"use client";

import type { ReactNode } from "react";
import { titleize } from "./editor-utils";

export default function FieldGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3 rounded-2xl border border-[color:rgb(146_146_146_/_0.16)] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbfe_100%)] p-4">
      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-900)]">
        {titleize(title)}
      </p>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
