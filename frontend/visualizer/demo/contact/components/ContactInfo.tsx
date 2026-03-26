import type { ContactData } from "../data";

export type ContactInfoProps = ContactData["contactInfo"];

export default function ContactInfo({ title, methods }: ContactInfoProps) {
  return (
    <section className="space-y-6 py-8">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">Direct lines</p>
        <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {methods.map((method) => (
          <div
            key={method.label}
            className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-lg"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">
              {method.label}
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{method.detail}</p>
            <p className="mt-1 text-sm text-slate-500">{method.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
