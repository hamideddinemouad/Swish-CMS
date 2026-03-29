import type { ReactNode } from "react";

export function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4 rounded-[24px] border border-[color:rgb(146_146_146_/_0.16)] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbfe_100%)] p-4">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-900)]">{title}</p>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
