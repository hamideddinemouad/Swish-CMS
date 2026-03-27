import type { ContactData } from "@/visualizer/demo/contact/data";

export type LocationsProps = ContactData["locations"];

export default function Locations({ title, offices }: LocationsProps) {
  return (
    <section className="space-y-6 py-8">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">Studios</p>
        <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {offices.map((office) => (
          <article
            key={office.city}
            className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-lg"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">{office.city}</p>
            <p className="mt-2 text-sm text-slate-700">{office.address}</p>
            <p className="text-xs text-slate-500">{office.hours}</p>
            <a href={office.mapLink} className="mt-3 text-sm font-semibold text-emerald-500">
              View on map
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
