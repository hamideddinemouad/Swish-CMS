import Link from "next/link";

const principles = [
  {
    title: "Focused editing",
    description:
      "Content, structure, and design are separated so non-developers can make changes without losing clarity.",
  },
  {
    title: "Fast setup",
    description:
      "The flow is designed to go from account creation to a live branded site in seconds, not hours.",
  },
  {
    title: "Portfolio-first scope",
    description:
      "Swish is intentionally narrow. It is built to demonstrate a clean CMS journey for showcase websites.",
  },
];

const workflow = [
  "Create an account and claim a subdomain.",
  "Start from a prepared structure instead of a blank page.",
  "Edit content, structure, and styling through separate focused screens.",
  "Publish a simple tenant site from the same workflow.",
];

export default function About() {
  return (
    <main className="relative mx-auto flex min-h-[calc(100vh-5.5rem)] w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <section className="w-full space-y-6">
        <div className="rounded-[32px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.35)] backdrop-blur sm:p-8 lg:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-wix-blue)]">
            About Swish
          </p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)] lg:items-start">
            <div>
              <h1 className="max-w-3xl text-3xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl sm:leading-[1.02]">
                A focused CMS flow for simple showcase websites.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-ink-700)] sm:text-lg">
                Swish CMS is a portfolio project built to explore a cleaner way
                to manage website publishing. Instead of turning every task into
                one crowded dashboard, it separates the work into clear editing
                modes so content changes feel faster and easier to understand.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#4fa8ff_0%,#3899ec_45%,#2f8fe2_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_32px_rgb(56_153_236_/_0.24)] transition hover:translate-y-[-1px]"
                >
                  Try Swish
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                >
                  Back home
                </Link>
              </div>
            </div>

            <aside className="rounded-[28px] border border-slate-200/80 bg-slate-50/80 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
                Side note
              </p>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-slate-200/80 bg-white px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Project type
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    This is a focused portfolio build, not a broad all-in-one
                    CMS product.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-white px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Main goal
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Showcase a calm publishing flow for people who want a site
                    live quickly.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <section className="rounded-[32px] border border-slate-200/80 bg-white/88 p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.28)] backdrop-blur sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
              How it works
            </p>
            <ol className="mt-5 space-y-4">
              {workflow.map((step, index) => (
                <li
                  key={step}
                  className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/85 px-4 py-4"
                >
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm leading-6 text-slate-700 sm:text-[15px]">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-[32px] border border-slate-200/80 bg-[linear-gradient(180deg,#0f172a_0%,#14233a_100%)] p-6 text-white shadow-[0_24px_80px_-45px_rgba(15,23,42,0.55)] sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7cc6ff]">
              Design principles
            </p>
            <div className="mt-5 space-y-4">
              {principles.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                >
                  <h2 className="text-sm font-semibold text-white">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="rounded-[32px] border border-slate-200/80 bg-white/88 p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.28)] backdrop-blur sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
                Who it is for
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-3xl">
                Builders who want a smaller, clearer publishing experience.
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-ink-700)] sm:text-base">
                Swish is aimed at portfolio-style websites, demos, and small
                branded pages where speed and clarity matter more than feature
                sprawl. It is less about covering every CMS use case and more
                about making one useful workflow feel smooth from start to
                finish.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Create account
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
