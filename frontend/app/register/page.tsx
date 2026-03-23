import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-md rounded-[28px] border border-[color:rgb(146_146_146_/_0.18)] bg-white p-8 shadow-[0_20px_50px_rgb(54_54_54_/_0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
          Register
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--color-ink-900)]">
          Barebone register page
        </h1>
        <p className="mt-4 text-sm leading-7 text-[var(--color-ink-700)]">
          This route is intentionally minimal for now. You can add the actual
          signup form and onboarding flow here next.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-2xl bg-[var(--color-wix-blue)] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2f8fe2]"
        >
          Back home
        </Link>
      </section>
    </main>
  );
}
