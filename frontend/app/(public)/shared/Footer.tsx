import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white/60 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200/80 bg-white/90 px-5 py-5 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.18)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-wix-blue)]">
              Built by
            </p>
            <p className="text-base font-semibold tracking-[-0.03em] text-slate-900">
              Mouad Hamideddine
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm text-[var(--color-ink-600)] sm:items-end">
            <Link
              href="https://mouad.dev"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-950"
            >
              mouad.dev
            </Link>
            <p>© 2026 Swish CMS portfolio showcase.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
