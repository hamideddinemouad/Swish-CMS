"use client";

import type { DraftKind } from "./home-utils";
import { titleize } from "./home-utils";

type FieldEditorProps = {
  kind: DraftKind;
  label: string;
  path: string;
  value: unknown;
  onChange: (path: string, value: unknown) => void;
  onFocus: (path: string) => void;
  onBlur: (kind: DraftKind) => void;
};

export function FieldEditor({ kind, label, path, value, onChange, onFocus, onBlur }: FieldEditorProps) {
  if (Array.isArray(value)) {
    return (
      <section className="space-y-3 rounded-2xl border border-[color:rgb(146_146_146_/_0.16)] p-4">
        <p className="text-sm font-semibold text-[var(--color-ink-900)]">{titleize(label)}</p>
        {value.map((item, index) => (
          <FieldEditor
            key={`${path}.${index}`}
            kind={kind}
            label={`${label} ${index + 1}`}
            path={`${path}.${index}`}
            value={item}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        ))}
      </section>
    );
  }

  if (value && typeof value === "object") {
    return (
      <section className="space-y-3 rounded-2xl border border-[color:rgb(146_146_146_/_0.16)] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbfe_100%)] p-4">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-900)]">
          {titleize(label)}
        </p>
        <div className="space-y-3 pl-1">
          {Object.entries(value).map(([key, child]) => (
            <FieldEditor
              key={`${path}.${key}`}
              kind={kind}
              label={key}
              path={path ? `${path}.${key}` : key}
              value={child}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          ))}
        </div>
      </section>
    );
  }

  const text = typeof value === "string" ? value : value == null ? "" : String(value);
  const multiline = text.length > 70 || text.includes("\n");

  return (
    <label className="block space-y-2">
      <span className="block text-sm font-medium text-[var(--color-ink-700)]">{titleize(label)}</span>
      {typeof value === "boolean" ? (
        <input
          type="checkbox"
          checked={value}
          onChange={(event) => onChange(path, event.target.checked)}
          onFocus={() => onFocus(path)}
          onBlur={() => onBlur(kind)}
          className="h-5 w-5 rounded border-[color:rgb(146_146_146_/_0.3)]"
        />
      ) : multiline ? (
        <textarea
          value={text}
          onChange={(event) => onChange(path, event.target.value)}
          onFocus={() => onFocus(path)}
          onBlur={() => onBlur(kind)}
          rows={3}
          className="w-full rounded-2xl border border-[color:rgb(146_146_146_/_0.18)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--color-wix-blue)]"
        />
      ) : (
        <input
          value={text}
          onChange={(event) => onChange(path, event.target.value)}
          onFocus={() => onFocus(path)}
          onBlur={() => onBlur(kind)}
          className="w-full rounded-2xl border border-[color:rgb(146_146_146_/_0.18)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--color-wix-blue)]"
        />
      )}
    </label>
  );
}
