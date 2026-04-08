"use client";

import Link from "next/link";
import { LoginForm } from "@/app/(public)/login/components/LoginForm";
import { useAppSelector } from "@/redux/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./loading";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useAppSelector((state) => state.user.user);
  const [mounted, setMounted] = useState(false);
  const registered = searchParams.get("registered") === "1";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && user) {
      router.replace("/dashboard");
    }
  }, [mounted, router, user]);

  if (!mounted || user) {
    return <Loading />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
      <section className="w-full max-w-md rounded-[28px] border border-[color:rgb(146_146_146_/_0.18)] bg-white/92 p-6 shadow-[0_20px_50px_rgb(54_54_54_/_0.08)] backdrop-blur sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
          Login
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink-900)] sm:text-3xl">
          Welcome back
        </h1>
        <p className="mt-4 text-sm leading-7 text-[var(--color-ink-700)]">
          Sign in to manage your content.
        </p>
        {registered ? (
          <p className="mt-4 rounded-2xl border border-[color:rgb(56_153_236_/_0.18)] bg-[color:rgb(56_153_236_/_0.07)] px-4 py-3 text-sm text-[var(--color-ink-700)]">
            Registration complete. You can sign in now.
          </p>
        ) : null}

        <LoginForm />

        <div className="mt-6 flex flex-col items-center gap-3 text-center text-sm text-[var(--color-ink-700)]">
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
      </section>
    </main>
  );
}
