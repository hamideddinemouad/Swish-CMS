import type { ContactData } from "@/visualizer/demo/contact/data";
import { preferences as defaultPreferences } from "@/visualizer/demo/contact/preference";
import {
  resolvePageComponentDesign,
  resolvePageComponentPreferences,
} from "@/lib/page-design-presets";
import type { ContactPreferences } from "@/visualizer/demo/contact/preference";

export type FormProps = ContactData["form"] & {
  preferences?: ContactPreferences;
};

export default function Form({ heading, description, fields, submitText, preferences }: FormProps) {
  const rawPreferences = preferences ?? defaultPreferences;
  const tokens = resolvePageComponentPreferences(rawPreferences, "form");
  const design = resolvePageComponentDesign(rawPreferences, "form");

  return (
    <section className="space-y-4 py-8">
      <div className="space-y-1">
        <p className={`text-xs font-semibold uppercase tracking-[0.4em] ${design.color.accentClass}`}>Connect</p>
        <h2 className={`${tokens.typography.headingSizes.h2} font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{heading}</h2>
        <p className={`${tokens.typography.smallSize} ${tokens.theme.text.secondary}`} style={{ fontFamily: design.bodyFont.fontFamily }}>{description}</p>
      </div>
      <form className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.label} className={`space-y-1 text-sm ${tokens.theme.text.secondary}`} style={{ fontFamily: design.bodyFont.fontFamily }}>
            <span className={`text-xs uppercase tracking-[0.3em] ${design.color.mutedClass}`}>{field.label}</span>
            {field.type === "textarea" ? (
              <textarea
                required={field.required}
                placeholder={field.placeholder}
                className={`${tokens.cards.compact} min-h-[140px] border-[1px] p-4 text-sm ${tokens.theme.text.primary}`}
              />
            ) : (
              <input
                required={field.required}
                type={field.type}
                placeholder={field.placeholder}
                className={`${tokens.cards.compact} border-[1px] p-4 text-sm ${tokens.theme.text.primary}`}
              />
            )}
          </label>
        ))}
      </form>
      <button className={tokens.buttons.primary}>{submitText}</button>
    </section>
  );
}
