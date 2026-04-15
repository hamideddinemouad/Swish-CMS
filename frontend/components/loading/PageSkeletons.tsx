"use client";

type SkeletonProps = {
  className: string;
};

function Skeleton({ className }: SkeletonProps) {
  return <div className={`animate-pulse rounded-[20px] bg-slate-200/70 ${className}`} />;
}

export function PublicPageSkeleton() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-5.5rem)] w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6">
      <section className="overflow-hidden rounded-[34px] border border-slate-200/70 bg-white/92 p-6 shadow-[0_20px_50px_rgb(54_54_54_/_0.08)] sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-4">
            <Skeleton className="h-4 w-28 rounded-full bg-[color:rgb(56_153_236_/_0.18)]" />
            <Skeleton className="h-14 w-full max-w-xl" />
            <Skeleton className="h-5 w-full max-w-2xl" />
            <Skeleton className="h-5 w-4/5 max-w-xl" />
            <div className="flex gap-3 pt-3">
              <Skeleton className="h-12 w-36 rounded-full" />
              <Skeleton className="h-12 w-32 rounded-full" />
            </div>
          </div>
          <div className="rounded-[30px] border border-slate-200/70 bg-[linear-gradient(180deg,#f8fbff_0%,#eef5fb_100%)] p-5">
            <Skeleton className="h-[20rem] w-full rounded-[24px]" />
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-[28px] border border-slate-200/70 bg-white/90 p-5 shadow-[0_16px_40px_rgb(54_54_54_/_0.04)]"
          >
            <Skeleton className="h-4 w-24 rounded-full bg-[color:rgb(56_153_236_/_0.16)]" />
            <Skeleton className="mt-4 h-8 w-4/5" />
            <Skeleton className="mt-3 h-4 w-full rounded-full" />
            <Skeleton className="mt-2 h-4 w-5/6 rounded-full" />
            <Skeleton className="mt-6 h-11 w-28 rounded-full" />
          </div>
        ))}
      </section>
    </main>
  );
}

export function AuthPageSkeleton() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
      <section className="w-full max-w-md rounded-[32px] border border-slate-200/70 bg-white/92 p-6 shadow-[0_20px_50px_rgb(54_54_54_/_0.08)] sm:p-8">
        <Skeleton className="h-4 w-24 rounded-full bg-[color:rgb(56_153_236_/_0.18)]" />
        <Skeleton className="mt-4 h-10 w-2/3" />
        <Skeleton className="mt-4 h-4 w-full rounded-full" />
        <Skeleton className="mt-2 h-4 w-4/5 rounded-full" />
        <div className="mt-8 space-y-4">
          <Skeleton className="h-14 w-full rounded-[22px]" />
          <Skeleton className="h-14 w-full rounded-[22px]" />
          <Skeleton className="h-14 w-full rounded-[22px]" />
        </div>
        <Skeleton className="mt-6 h-12 w-full rounded-[22px] bg-[color:rgb(56_153_236_/_0.2)]" />
      </section>
    </main>
  );
}

export function DashboardPageSkeleton() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-5.5rem)] w-full max-w-6xl flex-col px-4 py-5 sm:px-6 sm:py-6">
      <section className="rounded-[32px] border border-slate-200/70 bg-white/92 p-6 shadow-[0_20px_50px_rgb(54_54_54_/_0.08)] sm:p-8">
        <Skeleton className="h-4 w-28 rounded-full bg-[color:rgb(56_153_236_/_0.18)]" />
        <Skeleton className="mt-4 h-12 w-full max-w-lg" />
        <Skeleton className="mt-4 h-4 w-72 rounded-full" />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="rounded-[24px] border border-slate-200/70 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5"
            >
              <Skeleton className="h-4 w-24 rounded-full bg-[color:rgb(56_153_236_/_0.16)]" />
              <Skeleton className="mt-4 h-10 w-20" />
              <Skeleton className="mt-4 h-4 w-full rounded-full" />
              <Skeleton className="mt-2 h-4 w-5/6 rounded-full" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export function ProfilePageSkeleton() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-5.5rem)] w-full max-w-6xl flex-col px-4 py-5 sm:px-6 sm:py-6">
      <section className="overflow-hidden rounded-[36px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(245,250,255,0.95)_100%)] shadow-[0_24px_70px_rgb(54_54_54_/_0.08)]">
        <div className="border-b border-slate-200/70 bg-[radial-gradient(circle_at_top_left,rgba(56,153,236,0.16),transparent_36%),linear-gradient(135deg,#ffffff_0%,#f4f9ff_46%,#eef6ff_100%)] px-6 py-7 sm:px-8 sm:py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <Skeleton className="h-4 w-24 rounded-full bg-[color:rgb(56_153_236_/_0.18)]" />
              <Skeleton className="h-12 w-full max-w-xl" />
              <Skeleton className="h-4 w-full max-w-2xl rounded-full" />
              <Skeleton className="h-4 w-5/6 max-w-xl rounded-full" />
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[23rem]">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/70 bg-white/85 px-4 py-4 shadow-[0_16px_34px_rgb(56_153_236_/_0.1)] backdrop-blur"
                >
                  <Skeleton className="h-3 w-20 rounded-full bg-[color:rgb(56_153_236_/_0.18)]" />
                  <Skeleton className="mt-3 h-7 w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 px-6 py-6 sm:px-8 sm:py-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[30px] border border-slate-200/70 bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] p-5 shadow-[0_16px_40px_rgb(54_54_54_/_0.04)] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <Skeleton className="h-3 w-24 rounded-full bg-[color:rgb(56_153_236_/_0.18)]" />
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-full max-w-lg rounded-full" />
                <Skeleton className="h-4 w-5/6 max-w-md rounded-full" />
              </div>
              <Skeleton className="hidden h-8 w-20 rounded-full sm:block" />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-20 w-full rounded-[22px]" />
              <Skeleton className="h-20 w-full rounded-[22px]" />
            </div>

            <Skeleton className="mt-4 h-20 w-full rounded-[22px]" />

            <div className="mt-6 rounded-[26px] border border-[color:rgb(56_153_236_/_0.14)] bg-[linear-gradient(135deg,rgba(56,153,236,0.08)_0%,rgba(255,255,255,0.9)_100%)] p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-64 rounded-full" />
                </div>
                <Skeleton className="h-12 w-32 rounded-2xl bg-[color:rgb(56_153_236_/_0.2)]" />
              </div>
            </div>
          </section>

          <section className="rounded-[30px] border border-slate-200/70 bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] p-5 shadow-[0_16px_40px_rgb(54_54_54_/_0.04)] sm:p-6">
            <Skeleton className="h-3 w-32 rounded-full bg-[color:rgb(56_153_236_/_0.18)]" />
            <Skeleton className="mt-3 h-8 w-44" />
            <Skeleton className="mt-3 h-4 w-full max-w-md rounded-full" />

            <div className="mt-6 space-y-4">
              <div className="overflow-hidden rounded-[26px] border border-slate-200/70 bg-[linear-gradient(135deg,#ffffff_0%,#f4faff_100%)]">
                <div className="border-b border-slate-200/70 px-5 py-4">
                  <Skeleton className="h-3 w-28 rounded-full bg-[color:rgb(56_153_236_/_0.18)]" />
                </div>
                <div className="grid gap-0 sm:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="border-t border-slate-200/70 px-5 py-4 first:border-t-0 sm:border-l sm:first:border-l-0 sm:[&:nth-child(odd)]:border-l-0 sm:[&:nth-child(-n+2)]:border-t-0"
                    >
                      <Skeleton className="h-3 w-20 rounded-full" />
                      <Skeleton className="mt-3 h-5 w-28" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[26px] border border-slate-200/70 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5">
                <Skeleton className="h-3 w-28 rounded-full bg-[color:rgb(56_153_236_/_0.18)]" />
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="h-20 w-full rounded-2xl" />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export function SetupPageSkeleton() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
      <section className="w-full max-w-6xl overflow-hidden rounded-[32px] border border-slate-200/70 bg-white/92 shadow-[0_20px_50px_rgb(54_54_54_/_0.08)]">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-[linear-gradient(180deg,rgba(56,153,236,0.12)_0%,rgba(255,255,255,0.9)_100%)] p-6 sm:p-8 lg:p-10">
            <Skeleton className="h-4 w-36 rounded-full bg-[color:rgb(56_153_236_/_0.18)]" />
            <Skeleton className="mt-4 h-12 w-full max-w-sm" />
            <Skeleton className="mt-4 h-4 w-full max-w-md rounded-full" />
            <Skeleton className="mt-2 h-4 w-5/6 max-w-sm rounded-full" />
            <div className="mt-6 space-y-4 rounded-[28px] border border-[color:rgb(56_153_236_/_0.18)] bg-white/60 p-5">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-24 w-full rounded-[22px]" />
              ))}
            </div>
          </div>
          <div className="p-6 sm:p-8 lg:p-10">
            <Skeleton className="h-5 w-36 rounded-full" />
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-36 w-full rounded-[26px]" />
              ))}
            </div>
            <Skeleton className="mt-6 h-14 w-full rounded-[22px]" />
            <Skeleton className="mt-4 h-14 w-full rounded-[22px]" />
            <Skeleton className="mt-6 h-12 w-full rounded-[22px] bg-[color:rgb(56_153_236_/_0.2)]" />
          </div>
        </div>
      </section>
    </main>
  );
}

export function EditorPageSkeleton() {
  return (
    <section className="flex min-h-[calc(100vh-9rem)] flex-col gap-6 lg:min-h-[calc(100vh-10rem)]">
      <div className="space-y-3 px-1 sm:px-0">
        <Skeleton className="h-4 w-20 rounded-full bg-[color:rgb(56_153_236_/_0.18)]" />
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-4 w-full max-w-2xl rounded-full" />
      </div>

      <div className="grid flex-1 gap-6 lg:grid-cols-[minmax(340px,440px)_minmax(0,1fr)] lg:items-start">
        <aside className="rounded-[28px] border border-slate-200/70 bg-[linear-gradient(180deg,#ffffff_0%,#f7fafc_100%)] p-5 shadow-[0_18px_50px_rgb(54_54_54_/_0.05)]">
          <Skeleton className="h-4 w-32 rounded-full bg-[color:rgb(56_153_236_/_0.18)]" />
          <Skeleton className="mt-3 h-4 w-52 rounded-full" />
          <div className="mt-5 space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-[22px] border border-slate-200/70 bg-white/85 p-4"
              >
                <Skeleton className="h-4 w-28 rounded-full" />
                <Skeleton className="mt-4 h-12 w-full rounded-[18px]" />
                <Skeleton className="mt-3 h-12 w-full rounded-[18px]" />
              </div>
            ))}
          </div>
        </aside>

        <div className="flex min-h-[70vh] flex-col overflow-hidden rounded-[32px] border border-slate-200/70 bg-[linear-gradient(180deg,#f8fbff_0%,#edf2f7_100%)] shadow-[0_24px_70px_rgb(54_54_54_/_0.12)] lg:h-[calc(100vh-10rem)]">
          <div className="flex items-center justify-between gap-4 border-b border-white/70 bg-white/75 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#fb7d33]" />
              <span className="h-3 w-3 rounded-full bg-[#ffc233]" />
              <span className="h-3 w-3 rounded-full bg-[#60bc57]" />
            </div>
            <Skeleton className="h-8 w-36 rounded-full" />
            <Skeleton className="h-4 w-20 rounded-full" />
          </div>
          <div className="flex-1 overflow-hidden p-3 sm:p-4 lg:p-5">
            <div className="h-full rounded-[28px] border border-white/80 bg-white p-5 shadow-[0_18px_50px_rgb(54_54_54_/_0.08)]">
              <Skeleton className="h-48 w-full rounded-[24px]" />
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <Skeleton className="h-36 w-full rounded-[24px]" />
                <Skeleton className="h-36 w-full rounded-[24px]" />
                <Skeleton className="h-36 w-full rounded-[24px]" />
                <Skeleton className="h-36 w-full rounded-[24px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EditorWorkspaceSkeleton() {
  return (
    <main className="flex min-h-screen w-full flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <nav className="sticky top-3 z-20 px-3 sm:top-4 sm:px-4 lg:px-6">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
          <div className="rounded-[30px] border border-slate-200/80 bg-white/92 px-4 py-4 shadow-[0_18px_50px_rgba(54,54,54,0.08)] backdrop-blur sm:px-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <Skeleton className="h-11 w-11 rounded-2xl bg-[color:rgb(56_153_236_/_0.2)]" />
                <div className="min-w-0 space-y-2">
                  <Skeleton className="h-4 w-36 rounded-full" />
                  <Skeleton className="h-3 w-20 rounded-full" />
                </div>
              </div>
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>

            <div className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-11 w-24 shrink-0 rounded-2xl" />
              ))}
            </div>
          </div>

          <div className="flex justify-start">
            <div className="w-full rounded-[26px] border border-[color:rgb(56_153_236_/_0.16)] bg-[linear-gradient(180deg,#ffffff_0%,#f6faff_100%)] p-2 shadow-[0_16px_40px_rgb(56_153_236_/_0.08)] sm:w-auto">
              <div className="mb-2 px-3 pt-1">
                <Skeleton className="h-3 w-20 rounded-full bg-[color:rgb(56_153_236_/_0.18)]" />
              </div>
              <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-11 w-24 rounded-2xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="mt-6">
        <EditorPageSkeleton />
      </div>
    </main>
  );
}

export function TenantPageSkeleton() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fbfdff_0%,#f4f7fb_100%)]">
      <div className="border-b border-slate-200/70 bg-white/85 px-4 py-4 shadow-sm sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Skeleton className="h-8 w-40 rounded-full" />
          <div className="hidden gap-3 md:flex">
            <Skeleton className="h-10 w-20 rounded-full" />
            <Skeleton className="h-10 w-20 rounded-full" />
            <Skeleton className="h-10 w-20 rounded-full" />
          </div>
          <Skeleton className="h-10 w-32 rounded-full bg-[color:rgb(56_153_236_/_0.18)]" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Skeleton className="h-[20rem] w-full rounded-[32px]" />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-[28px] border border-slate-200/70 bg-white/92 p-5 shadow-[0_16px_40px_rgb(54_54_54_/_0.04)]"
            >
              <Skeleton className="h-40 w-full rounded-[22px]" />
              <Skeleton className="mt-4 h-6 w-3/4" />
              <Skeleton className="mt-3 h-4 w-full rounded-full" />
              <Skeleton className="mt-2 h-4 w-5/6 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
