import {
  ActionLink,
  PageIntro,
  PageShell,
  SurfaceCard,
  publicBadgeStyles,
} from "../shared/public-ui";

const principles = [
  {
    title: "Focused editing",
    description:
      "Content, structure, and design are separated so non-developers can make changes without losing clarity.",
  },
  {
    title: "Fast setup",
    description:
      "The flow aims to go from account creation to a live branded site quickly, without a heavy builder experience.",
  },
  {
    title: "Showcase-first scope",
    description:
      "Swish is intentionally narrow. It is shaped around simple showcase websites and a cleaner CMS story.",
  },
];

const workflow = [
  "Create an account and claim a subdomain.",
  "Start from a prepared structure instead of a blank page.",
  "Edit content, structure, and styling through separate focused screens.",
  "Publish a simple tenant site from the same workflow.",
];

const audiences = [
  "Portfolio-style websites that need faster setup",
  "Small branded pages where clarity matters more than sprawl",
  "Teams exploring a calmer CMS workflow for early launches",
];

export default function About() {
  return (
    <PageShell size="medium">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_22rem] lg:items-start">
        <SurfaceCard tone="hero" className="px-6 py-7 sm:px-8 sm:py-9">
          <PageIntro
            eyebrow={<span className={publicBadgeStyles.blue}>About Swish</span>}
            title="A focused CMS flow for simple showcase websites."
            description="Swish CMS is a portfolio project built to explore a cleaner way to manage publishing. Instead of turning every task into one crowded dashboard, it separates the work into clear editing modes so content changes feel easier to understand."
            actions={
              <>
                <ActionLink href="/register">Try Swish</ActionLink>
                <ActionLink href="/" variant="secondary">
                  Back home
                </ActionLink>
              </>
            }
          />
        </SurfaceCard>

        <SurfaceCard tone="dark" className="p-5 sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-200">
            Positioning
          </p>
          <div className="mt-4 space-y-4">
            <div className="rounded-[24px] border border-white/10 bg-white/6 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-100">
                Project type
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                A showcase-ready MVP, not a broad all-in-one CMS suite.
              </p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/6 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-100">
                Main goal
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Demonstrate a calmer publishing path for people who want a site live quickly.
              </p>
            </div>
          </div>
        </SurfaceCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
        <SurfaceCard tone="panel" className="p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
            How it works
          </p>
          <ol className="mt-5 space-y-4">
            {workflow.map((step, index) => (
              <li
                key={step}
                className="flex items-start gap-4 rounded-[24px] border border-slate-200/80 bg-white/84 px-4 py-4"
              >
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-deep-navy)] text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <p className="pt-1 text-sm leading-6 text-[var(--color-ink-700)] sm:text-[15px]">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </SurfaceCard>

        <SurfaceCard tone="soft" className="p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-purple)]">
            Design principles
          </p>
          <div className="mt-5 space-y-4">
            {principles.map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-slate-200/80 bg-white/92 px-4 py-4"
              >
                <h2 className="text-sm font-semibold text-[var(--color-ink-900)]">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--color-ink-700)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </SurfaceCard>
      </section>

      <section>
        <SurfaceCard tone="accent" className="p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-orange)]">
                Who it is for
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--color-deep-navy)]">
                Builders who want a smaller, clearer publishing experience.
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-ink-700)] sm:text-base">
                Swish is aimed at portfolio-style websites, demos, and small branded pages
                where speed and clarity matter more than feature sprawl. It is less about
                covering every CMS use case and more about making one useful workflow feel
                smooth from start to finish.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {audiences.map((audience) => (
                  <div
                    key={audience}
                    className="rounded-[22px] border border-white/70 bg-white/82 px-4 py-4 text-sm leading-6 text-[var(--color-ink-700)]"
                  >
                    {audience}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ActionLink href="/login" variant="secondary">
                Login
              </ActionLink>
              <ActionLink href="/register">Create account</ActionLink>
            </div>
          </div>
        </SurfaceCard>
      </section>
    </PageShell>
  );
}
