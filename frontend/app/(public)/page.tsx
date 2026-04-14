import Image from "next/image";
import Link from "next/link";
import HomeCursorGlow from "./components/HomeCursorGlow";

export default function Home() {
  return (
    <main className="relative flex min-h-[calc(100vh-5.5rem)] flex-col overflow-hidden">
      <HomeCursorGlow />
      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 items-start justify-center px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-8 py-4 text-center sm:gap-10 sm:py-6">
          <details className="w-full rounded-[24px] border border-slate-200/80 bg-white/90 text-left shadow-[0_12px_30px_-24px_rgba(15,23,42,0.35)] backdrop-blur md:hidden">
            <summary className="cursor-pointer list-none px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
              Side note
            </summary>
            <div className="space-y-4 px-5 pb-5">
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Project
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  This is a portfolio project built to showcase a focused CMS flow.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Demo Access
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  An already registered user is available for anyone who wants to try Swish.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Setup Time
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Setup takes around 10 seconds for a live site to be up and running.
                </p>
              </div>
            </div>
          </details>

          <div className="flex flex-col items-center gap-5">
            <Image
              src="/logo.svg"
              alt="Swish"
              width={576}
              height={376}
              className="h-28 w-auto sm:h-36 lg:h-40"
            />
            <div className="flex max-w-3xl flex-col items-center gap-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-wix-blue)] sm:text-xs">
                Content-First Website Publishing
              </p>
              <h1 className="max-w-4xl text-3xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl sm:leading-[1.02]">
                Structure, styling, and publishing for showcase websites without
                the usual build friction.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-[var(--color-ink-700)] sm:text-lg sm:leading-8">
                <span className="font-medium text-slate-900">Swish CMS</span> is a
                focused MVP content management system designed for
                non-developers who need fast publishing, clear structure, and a
                smoother workflow for creating showcase websites.
              </p>
            </div>
          </div>

          <aside className="hidden w-full max-w-5xl md:block">
            <div className="w-full rounded-[28px] border border-slate-200/80 bg-white/88 px-5 py-5 text-left shadow-[0_18px_50px_-30px_rgba(15,23,42,0.18)] backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
                Side note
              </p>
              <div className="mt-4 grid gap-4 lg:grid-cols-3">
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Project
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    This is a portfolio project built to showcase a focused CMS flow.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Demo Access
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    An already registered user is available for anyone who wants to try Swish.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Setup Time
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Setup takes around 10 seconds for a live site to be up and running.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <div className="w-full max-w-5xl overflow-hidden rounded-[34px] border border-slate-200/70 bg-[linear-gradient(135deg,#0f172a_0%,#16263d_52%,#1e3a5f_100%)] p-[1px] shadow-[0_24px_80px_rgb(15_23_42_/_0.24)]">
            <div className="rounded-[33px] bg-[linear-gradient(180deg,rgba(15,23,42,0.96)_0%,rgba(20,31,50,0.94)_100%)] px-6 py-7 backdrop-blur-[10px] sm:px-8 sm:py-8">
              <div className="flex flex-col items-center gap-6 text-center sm:gap-8">
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7cc6ff]">
                    Start now
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-white sm:text-3xl">
                    Sign in or create an account to begin managing your content.
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                    Choose a template, claim a subdomain, and shape a simple
                    branded site from one focused workflow.
                  </p>
                </div>

                <div className="grid w-full gap-3 rounded-[28px] border border-white/10 bg-white/5 p-4 text-left sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7cc6ff]">
                      Templates
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      Start with a structure instead of a blank canvas.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7cc6ff]">
                      Editor
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      Manage content, design, and structure separately.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7cc6ff]">
                      Live Site
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      Launch a simple branded showcase on its own subdomain.
                    </p>
                  </div>
                </div>

                <div className="flex w-full flex-col justify-center gap-6 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
                  <Link
                    href="/login"
                    className="inline-flex w-full items-center justify-center rounded-2xl border border-white/18 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/28 hover:bg-white/12 sm:w-auto"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#4fa8ff_0%,#3899ec_45%,#2f8fe2_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_32px_rgb(56_153_236_/_0.28)] transition hover:translate-y-[-1px] hover:shadow-[0_20px_36px_rgb(56_153_236_/_0.34)] sm:w-auto"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
