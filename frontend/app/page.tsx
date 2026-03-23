import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-6 lg:px-8">
        <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-10 py-10 text-center">
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/logo.svg"
              alt="Swish"
              width={576}
              height={376}
              className="h-40 w-auto"
            />
            <p className="max-w-2xl text-lg leading-8 text-[var(--color-ink-700)]">
              Swish CMS is a focused content management system for non developers
              that need fast publishing, clear structure, and a smoother
              website creation workflow.
            </p>
          </div>

          <div className="w-full max-w-3xl rounded-[32px] border border-[color:rgb(146_146_146_/_0.18)] bg-white/85 p-8 shadow-[0_18px_50px_rgb(54_54_54_/_0.06)]">
            <div className="flex flex-col items-center gap-8 text-center">
              <div className="max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
                  Start now
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink-900)]">
                  Sign in or create an account to begin managing your content.
                </h2>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-2xl border border-[color:rgb(56_153_236_/_0.18)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-wix-blue)] hover:border-[var(--color-wix-blue)]"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-2xl bg-[var(--color-wix-blue)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgb(56_153_236_/_0.18)] hover:bg-[#2f8fe2]"
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
