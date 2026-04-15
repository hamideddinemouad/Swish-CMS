"use client";

import { titleize } from "./editor-utils";
import { cx, publicInputBaseClass } from "../../shared/public-ui";

export default function EditableField({
  path,
  value,
  showLabel = true,
  onChange,
  onFocus,
  onBlur,
}: {
  path: string;
  value: unknown;
  showLabel?: boolean;
  onChange: (path: string, next: unknown) => void;
  onFocus: (path: string) => void;
  onBlur: () => void;
}) {
  if (Array.isArray(value)) {
    return (
      <div className="space-y-3">
        {value.map((item, index) => (
          <div
            key={`${path}.${index}`}
            className="space-y-3 rounded-2xl border border-[color:rgb(146_146_146_/_0.14)] bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] p-3"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-500)]">
              Item {index + 1}
            </p>
            <EditableField
              path={`${path}.${index}`}
              value={item}
              showLabel={showLabel}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>
        ))}
      </div>
    );
  }

  if (value && typeof value === "object") {
    return (
      <div className="space-y-3">
        {Object.entries(value).map(([key, child]) => (
          <div key={`${path}.${key}`} className="space-y-2">
            <label className="block text-sm font-medium text-[var(--color-ink-700)]">
              {titleize(key)}
            </label>
            <EditableField
              path={`${path}.${key}`}
              value={child}
              showLabel={false}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>
        ))}
      </div>
    );
  }

  const text = value == null ? "" : String(value);
  const multiline = text.length > 80 || text.includes("\n");

  return (
    <label className="block space-y-2">
      {showLabel ? (
        <span className="block text-sm font-medium text-[var(--color-ink-700)]">
          {titleize(path.split(".").at(-1) ?? path)}
        </span>
      ) : null}
      {multiline ? (
        <textarea
          value={text}
          onChange={(event) => onChange(path, event.target.value)}
          onFocus={() => onFocus(path)}
          onBlur={onBlur}
          rows={3}
          className={cx(publicInputBaseClass, "min-h-[7rem] resize-y")}
        />
      ) : (
        <input
          value={text}
          onChange={(event) => onChange(path, event.target.value)}
          onFocus={() => onFocus(path)}
          onBlur={onBlur}
          className={publicInputBaseClass}
        />
      )}
    </label>
  );
}
