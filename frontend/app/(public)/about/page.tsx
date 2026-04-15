import { InstantDemoButton } from "../shared/RecruiterDemoAccess";
import {
  ActionLink,
  PageShell,
  SurfaceCard,
  publicBadgeStyles,
} from "../shared/public-ui";

const aboutCards = [
  {
    label: "Why it exists",
    title: "A calmer publishing flow.",
    text: "Swish narrows the scope so setup and editing stay understandable.",
    accent: "bg-[var(--color-wix-blue)]",
  },
  {
    label: "How it works",
    title: "Content, design, and structure stay separated.",
    text: "Each lane does one job, so the product feels clearer from the start.",
    accent: "bg-[var(--color-wix-orange)]",
  },
  {
    label: "What it aims for",
    title: "From account to live page without extra drag.",
    text: "It is built for showcase sites, demos, and small branded pages.",
    accent: "bg-[var(--color-wix-green)]",
  },
];

export default function About() {
  return (
    <PageShell size="medium" className="gap-8">
      <section>
        <SurfaceCard tone="hero" className="px-6 py-10 sm:px-10 sm:py-12">
          <div className="absolute -right-12 top-6 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(255,194,51,0.34),transparent_70%)] blur-2xl" />
          <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(56,153,236,0.18),transparent_72%)] blur-3xl" />

          <div className="relative flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className={publicBadgeStyles.blue}>About Swish</span>
              <span className={publicBadgeStyles.slate}>Showcase CMS MVP</span>
            </div>

            <div className="space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-wix-blue)]">
                Product focus
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.08em] text-[var(--color-deep-navy)] sm:text-5xl lg:text-6xl lg:leading-[0.98]">
                Swish is a smaller CMS built to feel clearer.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--color-ink-700)] sm:text-lg">
                It is a portfolio project shaped around one simple idea: publishing should feel guided, not crowded.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <InstantDemoButton
                label="Launch Instant Demo"
                loadingLabel="Opening instant demo..."
              />
              <ActionLink href="/register">Create account</ActionLink>
              <ActionLink href="/" variant="quiet">
                Back home
              </ActionLink>
            </div>
          </div>
        </SurfaceCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {aboutCards.map((card) => (
          <SurfaceCard key={card.label} tone="soft" className="p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className={`h-2.5 w-2.5 rounded-full ${card.accent}`} />
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
                {card.label}
              </p>
            </div>
            <p className="mt-4 text-xl font-semibold tracking-[-0.04em] text-[var(--color-deep-navy)]">
              {card.title}
            </p>
            <p className="mt-2 text-sm leading-7 text-[var(--color-ink-700)]">
              {card.text}
            </p>
          </SurfaceCard>
        ))}
      </section>

      <section>
        <SurfaceCard tone="accent" className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-wix-orange)]">
                Best way to see it
              </p>
              <p className="mt-2 text-base font-semibold tracking-[-0.03em] text-[var(--color-deep-navy)] sm:text-lg">
                Open the demo, choose a subdomain, and follow the full flow.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <InstantDemoButton
                label="Launch Instant Demo"
                loadingLabel="Opening instant demo..."
              />
              <ActionLink href="/login" variant="secondary">
                Login
              </ActionLink>
            </div>
          </div>
        </SurfaceCard>
      </section>
    </PageShell>
  );
}
