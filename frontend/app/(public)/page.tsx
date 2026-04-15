import HomeCursorGlow from "./components/HomeCursorGlow";
import { InstantDemoButton } from "./shared/RecruiterDemoAccess";
import {
  ActionLink,
  PageShell,
  SurfaceCard,
  publicBadgeStyles,
} from "./shared/public-ui";

const benefitCards = [
  {
    label: "Start fast",
    title: "Use a structure that already works.",
    text: "Pick a template and skip the empty-page problem.",
    accent: "bg-[var(--color-wix-blue)]",
  },
  {
    label: "Edit clearly",
    title: "Keep content, design, and layout in separate lanes.",
    text: "The workflow stays readable instead of turning into builder chaos.",
    accent: "bg-[var(--color-wix-orange)]",
  },
  {
    label: "Go live",
    title: "Move from demo to live page without setup drag.",
    text: "Open the demo, choose a subdomain, and keep momentum.",
    accent: "bg-[var(--color-wix-green)]",
  },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <HomeCursorGlow />
      <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_top,rgba(56,153,236,0.18),transparent_58%)]" />

      <PageShell className="gap-8 pb-16 pt-4 sm:pb-20 lg:pt-8" size="wide">
        <section>
          <SurfaceCard tone="hero" className="px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <div className="absolute -right-14 top-8 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(255,194,51,0.4),transparent_68%)] blur-2xl" />
            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(56,153,236,0.18),transparent_72%)] blur-3xl" />

            <div className="relative flex flex-col gap-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className={publicBadgeStyles.orange}>Showcase CMS MVP</span>
                <span className={publicBadgeStyles.slate}>One clear publishing flow</span>
              </div>

              <div className="space-y-5">
                <div className="space-y-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-wix-blue)]">
                    Clearer website setup
                  </p>
                  <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.08em] text-[var(--color-deep-navy)] sm:text-6xl lg:text-[4.9rem] lg:leading-[0.96]">
                    Publish a showcase site without the usual builder sprawl.
                  </h1>
                  <p className="max-w-2xl text-base leading-8 text-[var(--color-ink-700)] sm:text-lg">
                    Swish keeps setup, content, design, and structure in clean lanes from the first click.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <InstantDemoButton
                    label="Launch Instant Demo"
                    loadingLabel="Opening instant demo..."
                  />
                  <ActionLink href="/register">Create an account</ActionLink>
                  <ActionLink href="/about" variant="quiet">
                    About Swish
                  </ActionLink>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {benefitCards.map((card) => (
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
              </div>

              <SurfaceCard tone="accent" className="p-4 sm:p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-wix-orange)]">
                      Fast path
                    </p>
                    <p className="mt-2 text-base font-semibold tracking-[-0.03em] text-[var(--color-deep-navy)] sm:text-lg">
                      Instant demo • setup • live page
                    </p>
                  </div>
                  <p className="max-w-2xl text-sm leading-7 text-[var(--color-ink-700)]">
                    Use the demo if you want to test the product quickly. Create an account only if you want your own login from the start.
                  </p>
                </div>
              </SurfaceCard>
            </div>
          </SurfaceCard>
        </section>

        <section className="flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-3 rounded-full border border-white/80 bg-white/78 px-4 py-3 text-sm text-[var(--color-ink-700)] shadow-[0_22px_54px_-40px_rgba(15,23,42,0.28)] backdrop-blur">
            <span className={publicBadgeStyles.purple}>Simple launch flow</span>
            <span>Demo opens setup directly.</span>
            <ActionLink href="/about" variant="quiet">
              Learn more
            </ActionLink>
          </div>
        </section>
      </PageShell>
    </main>
  );
}
