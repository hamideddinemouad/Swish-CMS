"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import Loading from "./loading";

export default function DashboardPage() {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (mounted && !user) {
      router.replace("/login");
    }
    if(mounted && !user?.tenantSubdomain){
        router.replace("/setup");
    }
  }, [mounted, router, user]);
  if (!mounted || !user?.tenantSubdomain || !user) {
    return <Loading />;
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center px-4 py-10 sm:px-6 sm:py-16">
      <section className="rounded-[28px] border border-[color:rgb(146_146_146_/_0.18)] bg-white/92 p-6 shadow-[0_20px_50px_rgb(54_54_54_/_0.08)] backdrop-blur sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
          Dashboard
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink-900)] sm:text-3xl">
          Welcome, {user?.firstName} {user?.lastName}
        </h1>
        <p className="mt-4 text-sm leading-7 text-[var(--color-ink-700)]">
          Signed in as {user?.email}.
        </p>
      </section>
    </main>
  );
}
