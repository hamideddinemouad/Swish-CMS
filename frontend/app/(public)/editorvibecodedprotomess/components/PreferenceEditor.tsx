"use client";

import type { ReactNode } from "react";
import { getPreferenceSpec } from "./preference-schema";
import { titleize, type DraftKind } from "./home-utils";

type PreferenceEditorProps = {
  label: string;
  path: string;
  value: unknown;
  onChange: (path: string, value: unknown) => void;
  onFocus: (path: string) => void;
  onBlur: (kind: DraftKind) => void;
};

export function PreferenceEditor(props: PreferenceEditorProps) {
  const { label, value } = props;

  if (Array.isArray(value)) {
    return <FieldGroup label={label}>{value.map((item, index) => <PreferenceEditor key={`${props.path}.${index}`} {...props} label={`${label} ${index + 1}`} path={`${props.path}.${index}`} value={item} />)}</FieldGroup>;
  }

  if (value && typeof value === "object") {
    return (
      <FieldGroup label={label}>
        {Object.entries(value).map(([key, child]) => (
          <PreferenceEditor key={`${props.path}.${key}`} {...props} label={key} path={props.path ? `${props.path}.${key}` : key} value={child} />
        ))}
      </FieldGroup>
    );
  }

  return <LeafField {...props} />;
}

function LeafField({ label, path, value, onChange, onFocus, onBlur }: PreferenceEditorProps) {
  const spec = getPreferenceSpec(path);
  const text = typeof value === "string" ? value : "";
  const options = spec.options ?? [];

  return (
    <label className="block space-y-2">
      <span className="block text-sm font-medium text-[var(--color-ink-700)]">{spec.label ?? titleize(label)}</span>
      {options.length > 0 ? (
        <>
          <select value={text} onChange={(event) => onChange(path, event.target.value)} onFocus={() => onFocus(path)} onBlur={() => onBlur("preference")} className="w-full rounded-2xl border border-[color:rgb(146_146_146_/_0.18)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--color-wix-blue)]">
            {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
          <Preview value={text} kind={spec.preview} />
        </>
      ) : (
        <input value={text} onChange={(event) => onChange(path, event.target.value)} onFocus={() => onFocus(path)} onBlur={() => onBlur("preference")} className="w-full rounded-2xl border border-[color:rgb(146_146_146_/_0.18)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--color-wix-blue)]" />
      )}
    </label>
  );
}

function Preview({ value, kind }: { value: string; kind?: "chip" | "font" | "card" }) {
  if (!kind) return null;
  if (kind === "font") {
    return <div className={`rounded-2xl border border-[color:rgb(146_146_146_/_0.14)] bg-white px-4 py-3 text-sm text-[var(--color-ink-900)] ${value}`}>Aa The quick brown fox</div>;
  }
  const box = kind === "card" ? "rounded-2xl border border-[color:rgb(146_146_146_/_0.14)] px-4 py-3" : "rounded-full px-3 py-2 text-xs font-semibold";
  return <div className={`${box} ${value}`}>Selected style</div>;
}

function FieldGroup({ label, children }: { label: string; children: ReactNode }) {
  return <section className="space-y-3 rounded-2xl border border-[color:rgb(146_146_146_/_0.16)] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbfe_100%)] p-4"><p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-900)]">{titleize(label)}</p><div className="space-y-3">{children}</div></section>;
}
