import Link from "next/link";

export default function About() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-4 py-10 sm:px-6 sm:py-16">
      <section className="w-full rounded-[28px] border border-[color:rgb(146_146_146_/_0.18)] bg-white/92 p-6 shadow-[0_20px_50px_rgb(54_54_54_/_0.08)] backdrop-blur sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
          About
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink-900)] sm:text-3xl">
          About Swish CMS
        </h1>
        <p className="mt-4 text-sm leading-7 text-[var(--color-ink-700)]">
          This is the public marketing surface for the product.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-2xl border border-[color:rgb(56_153_236_/_0.18)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-wix-blue)] transition hover:border-[var(--color-wix-blue)]"
        >
          Home
        </Link>
      </section>
    </main>
  );
}
