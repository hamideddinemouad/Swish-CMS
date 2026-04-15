"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import Loading from "../login/loading";
import { RegisterForm } from "./components/RegisterForm";
import {
  ActionLink,
  PageShell,
  SurfaceCard,
  publicBadgeStyles,
} from "../shared/public-ui";
import { useHydrated } from "../shared/useHydrated";

const setupPreview = [
  {
    title: "Create an account",
    description: "Start with the same auth flow used throughout the public product shell.",
  },
  {
    title: "Set up a workspace",
    description: "Choose a template and claim a subdomain without leaving the guided flow.",
  },
  {
    title: "Open the editor",
    description: "Move into content, design, and structure screens with the same account.",
  },
];

export default function RegisterPage() {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const mounted = useHydrated();

  useEffect(() => {
    if (mounted && user) {
      router.replace("/dashboard");
    }
  }, [mounted, router, user]);

  if (!mounted || user) {
    return <Loading />;
  }

  return (
    <PageShell size="medium" className="justify-center">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-stretch">
        <SurfaceCard tone="dark" className="p-6 sm:p-8 lg:p-10">
          <div className="space-y-5">
            <span className={publicBadgeStyles.blue}>Register</span>
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl">
                Create a Swish account and start the publishing flow.
              </h1>
              <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                This signup flow keeps the product entry simple. Once the account is created,
                the rest of the experience stays inside the same clear visual system.
              </p>
            </div>
            <div className="space-y-3">
              {setupPreview.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-white/10 bg-white/6 px-4 py-4"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-200">
                    Step {index + 1}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ActionLink href="/login" variant="secondary">
                Already have an account?
              </ActionLink>
              <ActionLink
                href="/"
                variant="quiet"
                className="justify-start text-sky-100 hover:text-white"
              >
                Back home
              </ActionLink>
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard tone="hero" className="px-6 py-7 sm:px-8 sm:py-9">
          <div className="space-y-4">
            <span className={publicBadgeStyles.slate}>New account</span>
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold tracking-[-0.05em] text-[var(--color-deep-navy)] sm:text-3xl">
                Create your account
              </h2>
              <p className="text-sm leading-7 text-[var(--color-ink-700)]">
                Set up your account to manage pages, content, and tenant data using the
                existing registration flow.
              </p>
            </div>

            <RegisterForm />

            <div className="flex flex-col items-start gap-3 pt-2 text-sm text-[var(--color-ink-700)]">
              <p>
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-[var(--color-wix-blue)] transition hover:text-[#2f8fe2]"
                >
                  Sign in
                </Link>
              </p>
              <Link
                href="/"
                className="font-medium text-[var(--color-ink-500)] transition hover:text-[var(--color-ink-900)]"
              >
                Back home
              </Link>
            </div>
          </div>
        </SurfaceCard>
      </section>
    </PageShell>
  );
}
