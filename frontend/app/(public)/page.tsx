import HomeCursorGlow from "./components/HomeCursorGlow";
import {
  ActionLink,
  PageIntro,
  PageShell,
  StatCard,
  SurfaceCard,
  publicBadgeStyles,
} from "./shared/public-ui";

const heroStats = [
  { value: "10s", label: "from setup to a simple live site" },
  { value: "3 lanes", label: "for content, design, and structure" },
  { value: "1 flow", label: "for testing a showcase website idea" },
];

const journeyChapters = [
  {
    eyebrow: "Chapter 01",
    title: "Start from a structure that already makes sense.",
    description:
      "Choose a starter template and begin with meaningful sections instead of staring at an empty page.",
    accent: "bg-[var(--color-wix-blue)]",
  },
  {
    eyebrow: "Chapter 02",
    title: "Edit content, design, and structure in separate lanes.",
    description:
      "Swish keeps the workflow calmer by separating what you say, how it looks, and how the page is organized.",
    accent: "bg-[var(--color-wix-orange)]",
  },
  {
    eyebrow: "Chapter 03",
    title: "Launch a live site without the usual setup drag.",
    description:
      "Claim a subdomain, keep the path simple, and move from draft to something clear and usable.",
    accent: "bg-[var(--color-wix-green)]",
  },
];

const promiseCards = [
  {
    label: "Portfolio project",
    text: "Swish is presented as a showcase-ready MVP that demonstrates a cleaner CMS flow without pretending to be a huge all-in-one platform.",
  },
  {
    label: "Demo access",
    text: "The public site is designed to help visitors understand the flow quickly before they create an account or try the demo login.",
  },
  {
    label: "Focused scope",
    text: "Everything is tuned around simpler showcase sites, faster setup, and a gentler editing experience for non-developers.",
  },
];

const editingLanes = [
  {
    title: "Content editing",
    description: "Update page copy inside a focused editor that keeps the structure readable.",
  },
  {
    title: "Design controls",
    description: "Adjust saved style choices without digging through a tangled page builder.",
  },
  {
    title: "Structure control",
    description: "Remove blocks from a page layout while keeping the fragile rendering flow intact.",
  },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <HomeCursorGlow />
      <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_top,rgba(56,153,236,0.18),transparent_58%)]" />

      <PageShell className="gap-10 pb-16 pt-3 sm:pb-20 lg:pt-6" size="wide">
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.12fr)_22rem] lg:items-start">
          <SurfaceCard tone="hero" className="px-6 py-7 sm:px-8 sm:py-9 lg:px-10">
            <div className="absolute -right-14 top-8 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(255,194,51,0.4),transparent_68%)] blur-2xl" />
            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(56,153,236,0.18),transparent_72%)] blur-3xl" />

            <div className="relative flex flex-col gap-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className={publicBadgeStyles.blue}>Content-first publishing</span>
                <span className={publicBadgeStyles.orange}>Showcase CMS MVP</span>
              </div>

              <PageIntro
                eyebrow={<span className={publicBadgeStyles.slate}>Clearer website setup</span>}
                title="Launch a showcase website with less friction and a lot more clarity."
                description="Swish CMS is a focused publishing flow for non-developers who want structure, styling, and setup to feel guided instead of tangled. The experience is designed to make a simple public presence easier to understand from the first screen."
                actions={
                  <>
                    <ActionLink href="/register">Create an account</ActionLink>
                    <ActionLink href="/login" variant="secondary">
                      Login to the dashboard
                    </ActionLink>
                    <ActionLink href="/about" variant="quiet">
                      Learn what Swish is building
                    </ActionLink>
                  </>
                }
              />

              <div className="grid gap-3 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <StatCard
                    key={stat.label}
                    label={stat.label}
                    value={stat.value}
                    hint="Built to keep the next step obvious without turning the flow into a heavy builder."
                  />
                ))}
              </div>
            </div>
          </SurfaceCard>

          <div className="flex flex-col gap-4">
            <SurfaceCard tone="dark" className="p-5 sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-200">
                Product story
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
                One guided publishing flow from idea to live page.
              </h2>
              <div className="mt-5 space-y-4">
                {journeyChapters.map((chapter) => (
                  <div
                    key={chapter.eyebrow}
                    className="rounded-[24px] border border-white/10 bg-white/6 px-4 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`h-2.5 w-2.5 rounded-full ${chapter.accent}`} />
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-100/90">
                        {chapter.eyebrow}
                      </p>
                    </div>
                    <p className="mt-3 text-base font-semibold text-white">{chapter.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{chapter.description}</p>
                  </div>
                ))}
              </div>
            </SurfaceCard>

            <SurfaceCard tone="soft" className="p-5 sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-wix-purple)]">
                Editing lanes
              </p>
              <div className="mt-4 space-y-3">
                {editingLanes.map((lane) => (
                  <div
                    key={lane.title}
                    className="rounded-[22px] border border-slate-200/80 bg-white/88 px-4 py-4"
                  >
                    <p className="text-sm font-semibold text-[var(--color-ink-900)]">{lane.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-ink-700)]">
                      {lane.description}
                    </p>
                  </div>
                ))}
              </div>
            </SurfaceCard>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <SurfaceCard tone="panel" className="p-6 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-wix-purple)]">
              Why it feels different
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--color-deep-navy)]">
              The homepage sells the workflow before it asks for commitment.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-ink-700)]">
              Instead of behaving like a generic splash screen, the page explains what the
              product is for, how the editor is organized, and why the setup path is calmer
              than a crowded builder. That gives visitors a better mental model before they sign in.
            </p>
          </SurfaceCard>

          <div className="grid gap-4 sm:grid-cols-3">
            {promiseCards.map((card) => (
              <SurfaceCard key={card.label} tone="soft" className="p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-wix-blue)]">
                  {card.label}
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-ink-700)]">{card.text}</p>
              </SurfaceCard>
            ))}
          </div>
        </section>

        <section>
          <SurfaceCard tone="accent" className="p-6 sm:p-8 lg:p-10">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-wix-orange)]">
                  Next step
                </p>
                <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.05em] text-[var(--color-deep-navy)] sm:text-4xl">
                  Ready to try the CMS flow without the usual setup mess?
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-ink-700)]">
                  Create an account or use the demo login to move straight into the editor.
                  Swish keeps the public pages, setup flow, dashboard, and editor under one
                  visual system so the whole experience feels easier to follow.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <ActionLink href="/register">Create an account</ActionLink>
                <ActionLink href="/login" variant="secondary">
                  Use the demo login
                </ActionLink>
              </div>
            </div>
          </SurfaceCard>
        </section>
      </PageShell>
    </main>
  );
}
