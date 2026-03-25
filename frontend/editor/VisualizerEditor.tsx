"use client";

import { useState, type ReactNode } from "react";
import Footer from "@/visualizer/components/home/footer";
import Header from "@/visualizer/components/home/header";
import Hero from "@/visualizer/components/home/hero";
import Nav from "@/visualizer/components/home/nav";
import { visualizerDemo } from "@/editor/demo-data";

type NavState = typeof visualizerDemo.nav;
type HeaderState = typeof visualizerDemo.header;
type HeroState = typeof visualizerDemo.hero;
type FooterState = typeof visualizerDemo.footer;

export function VisualizerEditor() {
  const [nav, setNav] = useState<NavState>(visualizerDemo.nav);
  const [header, setHeader] = useState<HeaderState>(visualizerDemo.header);
  const [hero, setHero] = useState<HeroState>(visualizerDemo.hero);
  const [footer, setFooter] = useState<FooterState>(visualizerDemo.footer);

  function resetAll() {
    setNav(visualizerDemo.nav);
    setHeader(visualizerDemo.header);
    setHero(visualizerDemo.hero);
    setFooter(visualizerDemo.footer);
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f8fbfe_100%)]">
      <section className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-6 py-6 xl:h-screen xl:flex-row xl:overflow-hidden xl:px-8">
        <aside className="xl:w-[420px] xl:shrink-0">
          <div className="sticky top-6 flex max-h-[calc(100vh-3rem)] flex-col rounded-[32px] border border-[color:rgb(146_146_146_/_0.18)] bg-white/85 p-5 shadow-[0_18px_50px_rgb(54_54_54_/_0.06)] backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
                  Editor
                </p>
                <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink-900)]">
                  Visualizer controls
                </h1>
                <p className="mt-2 text-sm leading-6 text-[var(--color-ink-700)]">
                  Edit each block from the UI and see the rendered output update
                  immediately.
                </p>
              </div>

              <button
                type="button"
                onClick={resetAll}
                className="rounded-2xl border border-[color:rgb(56_153_236_/_0.18)] px-4 py-2 text-sm font-semibold text-[var(--color-wix-blue)] hover:border-[var(--color-wix-blue)]"
              >
                Reset
              </button>
            </div>

            <div className="mt-6 flex-1 space-y-5 overflow-y-auto pr-1">
              <EditorSection title="Nav">
                <Field label="Brand">
                  <input
                    value={nav.brand}
                    onChange={(event) => setNav({ ...nav, brand: event.target.value })}
                    className="w-full rounded-2xl border border-[color:rgb(146_146_146_/_0.22)] px-4 py-3 text-sm outline-none focus:border-[var(--color-wix-blue)]"
                  />
                </Field>
                <Field label="Tagline">
                  <textarea
                    value={nav.tagline}
                    onChange={(event) => setNav({ ...nav, tagline: event.target.value })}
                    rows={3}
                    className="w-full rounded-2xl border border-[color:rgb(146_146_146_/_0.22)] px-4 py-3 text-sm outline-none focus:border-[var(--color-wix-blue)]"
                  />
                </Field>
                <Field label="Action label">
                  <input
                    value={nav.actionLabel}
                    onChange={(event) => setNav({ ...nav, actionLabel: event.target.value })}
                    className="w-full rounded-2xl border border-[color:rgb(146_146_146_/_0.22)] px-4 py-3 text-sm outline-none focus:border-[var(--color-wix-blue)]"
                  />
                </Field>
                <Field label="Accent color">
                  <input
                    type="color"
                    value={nav.accentColor === "var(--color-wix-blue)" ? "#3899ec" : nav.accentColor}
                    onChange={(event) => setNav({ ...nav, accentColor: event.target.value })}
                    className="h-11 w-full cursor-pointer rounded-2xl border border-[color:rgb(146_146_146_/_0.22)] bg-white p-1"
                  />
                </Field>
              </EditorSection>

              <EditorSection title="Header">
                <Field label="Eyebrow">
                  <input
                    value={header.eyebrow}
                    onChange={(event) => setHeader({ ...header, eyebrow: event.target.value })}
                    className="w-full rounded-2xl border border-[color:rgb(146_146_146_/_0.22)] px-4 py-3 text-sm outline-none focus:border-[var(--color-wix-blue)]"
                  />
                </Field>
                <Field label="Title">
                  <textarea
                    value={header.title}
                    onChange={(event) => setHeader({ ...header, title: event.target.value })}
                    rows={3}
                    className="w-full rounded-2xl border border-[color:rgb(146_146_146_/_0.22)] px-4 py-3 text-sm outline-none focus:border-[var(--color-wix-blue)]"
                  />
                </Field>
                <Field label="Description">
                  <textarea
                    value={header.description}
                    onChange={(event) => setHeader({ ...header, description: event.target.value })}
                    rows={4}
                    className="w-full rounded-2xl border border-[color:rgb(146_146_146_/_0.22)] px-4 py-3 text-sm outline-none focus:border-[var(--color-wix-blue)]"
                  />
                </Field>
                <Field label="Primary CTA">
                  <input
                    value={header.primaryActionLabel}
                    onChange={(event) =>
                      setHeader({ ...header, primaryActionLabel: event.target.value })
                    }
                    className="w-full rounded-2xl border border-[color:rgb(146_146_146_/_0.22)] px-4 py-3 text-sm outline-none focus:border-[var(--color-wix-blue)]"
                  />
                </Field>
                <Field label="Accent color">
                  <input
                    type="color"
                    value={header.accentColor === "var(--color-wix-blue)" ? "#3899ec" : header.accentColor}
                    onChange={(event) => setHeader({ ...header, accentColor: event.target.value })}
                    className="h-11 w-full cursor-pointer rounded-2xl border border-[color:rgb(146_146_146_/_0.22)] bg-white p-1"
                  />
                </Field>
              </EditorSection>

              <EditorSection title="Hero">
                <Field label="Badge">
                  <input
                    value={hero.badge}
                    onChange={(event) => setHero({ ...hero, badge: event.target.value })}
                    className="w-full rounded-2xl border border-[color:rgb(146_146_146_/_0.22)] px-4 py-3 text-sm outline-none focus:border-[var(--color-wix-blue)]"
                  />
                </Field>
                <Field label="Title">
                  <textarea
                    value={hero.title}
                    onChange={(event) => setHero({ ...hero, title: event.target.value })}
                    rows={3}
                    className="w-full rounded-2xl border border-[color:rgb(146_146_146_/_0.22)] px-4 py-3 text-sm outline-none focus:border-[var(--color-wix-blue)]"
                  />
                </Field>
                <Field label="Primary CTA">
                  <input
                    value={hero.primaryActionLabel}
                    onChange={(event) =>
                      setHero({ ...hero, primaryActionLabel: event.target.value })
                    }
                    className="w-full rounded-2xl border border-[color:rgb(146_146_146_/_0.22)] px-4 py-3 text-sm outline-none focus:border-[var(--color-wix-blue)]"
                  />
                </Field>
                <Field label="Accent color">
                  <input
                    type="color"
                    value={hero.accentColor === "var(--color-wix-blue)" ? "#0ea5e9" : hero.accentColor}
                    onChange={(event) => setHero({ ...hero, accentColor: event.target.value })}
                    className="h-11 w-full cursor-pointer rounded-2xl border border-[color:rgb(146_146_146_/_0.22)] bg-white p-1"
                  />
                </Field>
              </EditorSection>

              <EditorSection title="Footer">
                <Field label="Brand">
                  <input
                    value={footer.brand}
                    onChange={(event) => setFooter({ ...footer, brand: event.target.value })}
                    className="w-full rounded-2xl border border-[color:rgb(146_146_146_/_0.22)] px-4 py-3 text-sm outline-none focus:border-[var(--color-wix-blue)]"
                  />
                </Field>
                <Field label="Description">
                  <textarea
                    value={footer.description}
                    onChange={(event) => setFooter({ ...footer, description: event.target.value })}
                    rows={3}
                    className="w-full rounded-2xl border border-[color:rgb(146_146_146_/_0.22)] px-4 py-3 text-sm outline-none focus:border-[var(--color-wix-blue)]"
                  />
                </Field>
                <Field label="Legal note">
                  <textarea
                    value={footer.legalNote}
                    onChange={(event) => setFooter({ ...footer, legalNote: event.target.value })}
                    rows={4}
                    className="w-full rounded-2xl border border-[color:rgb(146_146_146_/_0.22)] px-4 py-3 text-sm outline-none focus:border-[var(--color-wix-blue)]"
                  />
                </Field>
              </EditorSection>
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1 overflow-y-auto rounded-[32px] border border-[color:rgb(146_146_146_/_0.18)] bg-white/70 shadow-[0_18px_50px_rgb(54_54_54_/_0.06)]">
          <div className="border-b border-[color:rgb(146_146_146_/_0.18)] px-6 py-4">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
              Live preview
            </p>
            <p className="mt-1 text-sm text-[var(--color-ink-700)]">
              The components below are receiving the edited props in real time.
            </p>
          </div>

          <div className="space-y-6">
            <div className="px-2 pt-2" id="overview">
              <Nav {...nav} />
            </div>
            <div id="header">
              <Header {...header} />
            </div>
            <div id="hero">
              <Hero {...hero} />
            </div>
            <div id="footer">
              <Footer {...footer} />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function EditorSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-[color:rgb(146_146_146_/_0.16)] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbfe_100%)] p-4">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-900)]">
        {title}
      </p>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[var(--color-ink-700)]">
        {label}
      </span>
      {children}
    </label>
  );
}
