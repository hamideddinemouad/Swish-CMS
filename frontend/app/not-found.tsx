"use client"
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[72vh] items-center px-6 py-16 lg:px-8">
      <section className="mx-auto grid w-full max-w-6xl gap-8 rounded-[32px] border border-[color:rgb(146_146_146_/_0.18)] bg-white/85 p-8 shadow-[0_18px_50px_rgb(54_54_54_/_0.06)] backdrop-blur sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
            Error 404
          </p>
          <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-[-0.05em] text-[var(--color-ink-900)] sm:text-5xl">
            The page you are looking for does not exist.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-ink-700)]">
            The link may be outdated, the route may have changed, or the page
            was never published. Use one of the shortcuts below to get back
            into the CMS.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-2xl bg-[var(--color-wix-blue)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgb(56_153_236_/_0.18)] hover:bg-[#2f8fe2]"
            >
              Back home
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center rounded-[28px] bg-[linear-gradient(135deg,rgb(56_153_236_/_0.1),rgb(255_194_51_/_0.18))] px-6 py-12">
          <div className="text-center">
            <p className="text-[5.5rem] font-semibold leading-none tracking-[-0.08em] text-[var(--color-ink-900)] sm:text-[7rem]">
              404
            </p>
            <p className="mt-4 text-sm font-medium uppercase tracking-[0.16em] text-[var(--color-ink-700)]">
              Lost in Swish
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
