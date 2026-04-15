"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import Loading from "../login/loading";
import { RecruiterDemoAccess } from "../shared/RecruiterDemoAccess";
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
    title: "Create account",
    description: "Start with a clean entry point.",
  },
  {
    title: "Choose setup",
    description: "Pick a template and claim a subdomain.",
  },
  {
    title: "Start editing",
    description: "Move into content, design, and structure lanes.",
  },
];

export default function RegisterPage() {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const mounted = useHydrated();

  useEffect(() => {
    if (mounted && user) {
      router.replace(user.tenantSubdomain ? "/dashboard" : "/setup");
    }
  }, [mounted, router, user]);

  if (!mounted || user) {
    return <Loading />;
  }

  return (
    <PageShell size="medium" className="gap-6 justify-center">
      <RecruiterDemoAccess />

      <section className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-stretch">
        <SurfaceCard tone="soft" className="p-6 sm:p-8 lg:p-10">
          <div className="space-y-5">
            <span className={publicBadgeStyles.blue}>Register</span>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-[-0.06em] text-[var(--color-deep-navy)] sm:text-4xl">
                Create an account and start fast.
              </h1>
              <p className="max-w-xl text-sm leading-7 text-[var(--color-ink-700)] sm:text-base">
                Registration is the long path. If you want the fastest way in, use the instant demo above.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {setupPreview.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-white/80 bg-white/84 px-4 py-4"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
                    Step {index + 1}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[var(--color-deep-navy)]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-ink-700)]">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ActionLink href="/login" variant="secondary">
                Already have an account?
              </ActionLink>
              <ActionLink
                href="/"
                variant="quiet"
                className="justify-start"
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
                Register
              </h2>
              <p className="text-sm leading-7 text-[var(--color-ink-700)]">
                Create your own login below, or use the instant demo above if you just want to test the full onboarding flow.
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
