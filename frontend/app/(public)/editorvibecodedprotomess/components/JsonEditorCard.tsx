"use client";

type JsonEditorCardProps = {
  title: string;
  description: string;
  value: string;
  error?: string | null;
  isSaving: boolean;
  onChange: (value: string) => void;
  onSave: () => void;
  onFormat: () => void;
  onReset: () => void;
};

export function JsonEditorCard({
  title,
  description,
  value,
  error,
  isSaving,
  onChange,
  onSave,
  onFormat,
  onReset,
}: JsonEditorCardProps) {
  return (
    <section className="rounded-[28px] border border-[color:rgb(146_146_146_/_0.16)] bg-white/90 p-5 shadow-[0_18px_50px_rgb(54_54_54_/_0.05)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-wix-blue)]">
            {title}
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--color-ink-700)]">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onFormat}
            className="rounded-2xl border border-[color:rgb(146_146_146_/_0.18)] px-4 py-2 text-sm font-semibold text-[var(--color-ink-900)] transition hover:border-[var(--color-wix-blue)]"
          >
            Format
          </button>
          <button
            type="button"
            onClick={onReset}
            className="rounded-2xl border border-[color:rgb(146_146_146_/_0.18)] px-4 py-2 text-sm font-semibold text-[var(--color-ink-900)] transition hover:border-[var(--color-wix-blue)]"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="rounded-2xl bg-[var(--color-wix-blue)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving" : "Save"}
          </button>
        </div>
      </div>

      <div className="mt-5">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          spellCheck={false}
          className="min-h-[360px] w-full rounded-[24px] border border-[color:rgb(146_146_146_/_0.22)] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbfe_100%)] px-4 py-4 font-mono text-[13px] leading-6 text-[var(--color-ink-900)] outline-none transition focus:border-[var(--color-wix-blue)]"
        />
      </div>

      {error ? (
        <p className="mt-3 rounded-2xl border border-[color:rgb(224_43_74_/_0.16)] bg-[color:rgb(224_43_74_/_0.05)] px-4 py-3 text-sm text-[var(--color-wix-red)]">
          {error}
        </p>
      ) : null}
    </section>
  );
}
