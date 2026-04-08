"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import Loading from "../login/loading";
import { RegisterForm } from "./components/RegisterForm";

export default function RegisterPage() {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
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
    <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
      <section className="w-full max-w-md rounded-[28px] border border-[color:rgb(146_146_146_/_0.18)] bg-white/92 p-6 shadow-[0_20px_50px_rgb(54_54_54_/_0.08)] backdrop-blur sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
          Register
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink-900)] sm:text-3xl">
          Create your account
        </h1>
        <p className="mt-4 text-sm leading-7 text-[var(--color-ink-700)]">
          Set up your account to manage pages, content, and tenant data.
        </p>

        <RegisterForm />

        <div className="mt-6 flex flex-col items-center gap-3 text-center text-sm text-[var(--color-ink-700)]">
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
      </section>
    </main>
  );
}
