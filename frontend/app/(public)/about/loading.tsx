"use client";

function Skeleton({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-[20px] bg-slate-200/70 ${className}`} />;
}

export default function Loading() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-4 py-10 sm:px-6 sm:py-16">
      <section className="w-full rounded-[28px] border border-[color:rgb(146_146_146_/_0.18)] bg-white/92 p-6 shadow-[0_20px_50px_rgb(54_54_54_/_0.08)] backdrop-blur sm:p-8">
        <Skeleton className="h-4 w-16 rounded-full bg-[color:rgb(56_153_236_/_0.18)]" />
        <Skeleton className="mt-4 h-10 w-full max-w-sm" />
        <Skeleton className="mt-4 h-4 w-full rounded-full" />
        <Skeleton className="mt-2 h-4 w-5/6 rounded-full" />
        <Skeleton className="mt-6 h-12 w-28 rounded-2xl" />
      </section>
    </main>
  );
}
