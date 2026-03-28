"use client";

import Link from "next/link";
import { LoginForm } from "@/app/(public)/login/components/LoginForm";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./loading";

export default function LoginPage() {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  console.log(user);
  const [mounted, setMounted] = useState(false);

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
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-md rounded-[28px] border border-[color:rgb(146_146_146_/_0.18)] bg-white p-8 shadow-[0_20px_50px_rgb(54_54_54_/_0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
          Login
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--color-ink-900)]">
          Welcome back
        </h1>
        <p className="mt-4 text-sm leading-7 text-[var(--color-ink-700)]">
          Sign in to manage your content.
        </p>

        <LoginForm />

        <div className="mt-6 flex flex-col items-center gap-3 text-sm text-[var(--color-ink-700)]">
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-[var(--color-wix-blue)] hover:text-[#2f8fe2]"
            >
              Create one
            </Link>
          </p>
          <Link
            href="/"
            className="font-medium text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)]"
          >
            Back home
          </Link>
        </div>
      </section>
    </main>
  );
}
