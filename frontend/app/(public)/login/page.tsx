"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { LoginForm } from "@/app/(public)/login/components/LoginForm";
import { useAppSelector } from "@/redux/hooks";
import Loading from "./loading";
import {
  ActionLink,
  PageShell,
  StatusBanner,
  SurfaceCard,
  publicBadgeStyles,
} from "../shared/public-ui";
import { useHydrated } from "../shared/useHydrated";

const highlights = [
  "Jump back into the dashboard without re-learning the layout.",
  "Keep setup, profile, and editor pages inside one coherent public shell.",
  "Use the same account to continue from workspace setup to page editing.",
];

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useAppSelector((state) => state.user.user);
  const mounted = useHydrated();
  const registered = searchParams.get("registered") === "1";

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
      <section className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-stretch">
        <SurfaceCard tone="dark" className="p-6 sm:p-8 lg:p-10">
          <div className="space-y-5">
            <span className={publicBadgeStyles.blue}>Login</span>
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl">
                Welcome back to your Swish workspace.
              </h1>
              <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Sign in to continue through setup, manage your workspace, or jump straight
                into the editor. The functionality stays the same; the interface is simply clearer.
              </p>
            </div>
            <div className="space-y-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-white/10 bg-white/6 px-4 py-4 text-sm leading-6 text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ActionLink href="/register">Create an account</ActionLink>
              <ActionLink href="/" variant="secondary">
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
                Sign in to manage your content.
              </h2>
              <p className="text-sm leading-7 text-[var(--color-ink-700)]">
                Use the existing login flow to open the dashboard and continue where you left off.
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
