import Link from "next/link";
import { ActionLink, publicSurfaceStyles } from "./public-ui";

export function Footer() {
  return (
    <footer className="pb-4 pt-2">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`${publicSurfaceStyles.dark} overflow-hidden px-5 py-6 sm:px-6`}>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
            <div className="space-y-4">
              <span className="inline-flex items-center rounded-full border border-white/14 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-200">
                Built by Mouad Hamideddine
              </span>
              <div className="space-y-3">
                <p className="text-2xl font-semibold tracking-[-0.05em] text-white sm:text-3xl">
                  Swish CMS brings the public pages, product screens, and editor into one clear visual system.
                </p>
                <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  This site presents the project as a showcase-ready MVP for faster publishing,
                  clearer editing, and a calmer website setup flow.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-white/6 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-200">
                  Explore
                </p>
                <div className="mt-4 flex flex-col gap-2 text-sm text-slate-200">
                  <Link href="/" className="transition hover:text-white">
                    Home
                  </Link>
                  <Link href="/about" className="transition hover:text-white">
                    About
                  </Link>
                  <Link href="/register" className="transition hover:text-white">
                    Create account
                  </Link>
                  <Link href="/login" className="transition hover:text-white">
                    Login
                  </Link>
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/6 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-200">
                  External
                </p>
                <div className="mt-4 space-y-3">
                  <ActionLink
                    href="https://mouad.dev"
                    target="_blank"
                    rel="noreferrer"
                    variant="secondary"
                    className="w-full border-white/14 bg-white/8 text-white hover:border-white/22 hover:bg-white/12 hover:text-white"
                  >
                    Visit mouad.dev
                  </ActionLink>
                  <p className="text-sm text-slate-300">© 2026 Swish CMS showcase MVP.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
