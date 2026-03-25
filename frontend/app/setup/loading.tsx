"use client";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div
        aria-label="Loading setup"
        className="h-12 w-12 animate-spin rounded-full border-4 border-[color:rgb(56_153_236_/_0.18)] border-t-[var(--color-wix-blue)]"
      />
    </main>
  );
}
