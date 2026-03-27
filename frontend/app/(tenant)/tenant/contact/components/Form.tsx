import type { ContactData } from "@/visualizer/demo/contact/data";
import { preferences as defaultPreferences } from "@/visualizer/demo/contact/preference";
import type { ContactPreferences } from "@/visualizer/demo/contact/preference";

export type FormProps = ContactData["form"] & {
  preferences?: ContactPreferences;
};

export default function Form({ heading, description, fields, submitText, preferences }: FormProps) {
  const tokens = preferences ?? defaultPreferences;

  return (
    <section className="space-y-4 py-8">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">Connect</p>
        <h2 className="text-3xl font-semibold text-slate-900">{heading}</h2>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <form className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.label} className="space-y-1 text-sm text-slate-600">
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400">{field.label}</span>
            {field.type === "textarea" ? (
              <textarea
                required={field.required}
                placeholder={field.placeholder}
                className={`${tokens.borders.style} rounded-2xl border-[1px] border-slate-200 bg-white p-4 text-sm text-slate-900`}
              />
            ) : (
              <input
                required={field.required}
                type={field.type}
                placeholder={field.placeholder}
                className={`${tokens.borders.style} rounded-2xl border-[1px] border-slate-200 bg-white p-4 text-sm text-slate-900`}
              />
            )}
          </label>
        ))}
      </form>
      <button className={tokens.buttons.primary}>{submitText}</button>
    </section>
  );
}
