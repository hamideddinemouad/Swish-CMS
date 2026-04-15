"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { LoginForm } from "@/app/(public)/login/components/LoginForm";
import { useAppSelector } from "@/redux/hooks";
import Loading from "./loading";
import { RecruiterDemoAccess } from "../shared/RecruiterDemoAccess";
import {
  ActionLink,
  PageShell,
  StatusBanner,
  SurfaceCard,
  publicBadgeStyles,
} from "../shared/public-ui";
import { useHydrated } from "../shared/useHydrated";

const highlights = [
  "Continue setup",
  "Open the dashboard",
  "Jump into the editor",
];

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useAppSelector((state) => state.user.user);
  const mounted = useHydrated();
  const registered = searchParams.get("registered") === "1";

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

      <section className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-stretch">
        <SurfaceCard tone="soft" className="p-6 sm:p-8 lg:p-10">
          <div className="space-y-5">
            <span className={publicBadgeStyles.blue}>Login</span>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-[-0.06em] text-[var(--color-deep-navy)] sm:text-4xl">
                Pick up where you left off.
              </h1>
              <p className="max-w-xl text-sm leading-7 text-[var(--color-ink-700)] sm:text-base">
                Use your account to continue through setup, manage the workspace, or move straight into editing.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-white/80 bg-white/84 px-4 py-4 text-sm font-medium leading-6 text-[var(--color-ink-700)]"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ActionLink href="/register">Create an account</ActionLink>
              <ActionLink href="/" variant="quiet">
                Back home
              </ActionLink>
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard tone="hero" className="px-6 py-7 sm:px-8 sm:py-9">
          <div className="space-y-4">
            <span className={publicBadgeStyles.slate}>Account access</span>
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold tracking-[-0.05em] text-[var(--color-deep-navy)] sm:text-3xl">
                Sign in
              </h2>
              <p className="text-sm leading-7 text-[var(--color-ink-700)]">
                Use your account below, or take the instant demo above for the fastest path into setup.
              </p>
            </div>

            {registered ? (
              <StatusBanner tone="info">
                Registration complete. You can sign in now.
              </StatusBanner>
            ) : null}

            <LoginForm />

            <div className="flex flex-col items-start gap-3 pt-2 text-sm text-[var(--color-ink-700)]">
              <p>
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-[var(--color-wix-blue)] transition hover:text-[#2f8fe2]"
                >
                  Create one
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
