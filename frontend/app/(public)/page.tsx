import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-8 py-8 text-center sm:gap-10 sm:py-12">
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/logo.svg"
              alt="Swish"
              width={576}
              height={376}
              className="h-28 w-auto sm:h-36 lg:h-40"
            />
            <p className="max-w-2xl text-base leading-7 text-[var(--color-ink-700)] sm:text-lg sm:leading-8">
              Swish CMS is a focused content management system for non developers
              that need fast publishing, clear structure, and a smoother
              website creation workflow.
            </p>
          </div>

          <div className="w-full max-w-3xl rounded-[32px] border border-[color:rgb(146_146_146_/_0.18)] bg-white/88 p-6 shadow-[0_18px_50px_rgb(54_54_54_/_0.06)] sm:p-8">
            <div className="flex flex-col items-center gap-6 text-center sm:gap-8">
              <div className="max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
                  Start now
                </p>
                <h2 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-[var(--color-ink-900)] sm:text-2xl">
                  Sign in or create an account to begin managing your content.
                </h2>
              </div>

              <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
                <Link
                  href="/login"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-[color:rgb(56_153_236_/_0.18)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-wix-blue)] transition hover:border-[var(--color-wix-blue)] sm:w-auto"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--color-wix-blue)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgb(56_153_236_/_0.18)] transition hover:bg-[#2f8fe2] sm:w-auto"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}