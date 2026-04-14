export default function TenantNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#f8fbff_0%,#edf2f7_100%)] px-6 py-16">
      <section className="w-full max-w-xl rounded-[32px] border border-[color:rgb(146_146_146_/_0.16)] bg-white p-8 text-center shadow-[0_24px_70px_rgb(54_54_54_/_0.12)] sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
          404
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--color-ink-900)] sm:text-4xl">
          Tenant not found
        </h1>
        <p className="mt-4 text-sm leading-7 text-[var(--color-ink-700)] sm:text-base">
          This workspace does not exist, or its pages are not available yet.
        </p>
      </section>
    </main>
  );
}
