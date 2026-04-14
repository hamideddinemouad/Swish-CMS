"use client";

function Skeleton({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-[20px] bg-slate-200/70 ${className}`} />;
}

export function MarketingHomeSkeleton() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-8 py-8 text-center sm:gap-10 sm:py-12">
          <div className="flex w-full flex-col items-center gap-5">
            <Skeleton className="h-28 w-52 rounded-[28px] sm:h-36 sm:w-72 lg:h-40 lg:w-80" />
            <Skeleton className="h-5 w-full max-w-2xl rounded-full" />
            <Skeleton className="h-5 w-4/5 max-w-xl rounded-full" />
          </div>

          <div className="w-full max-w-3xl rounded-[32px] border border-[color:rgb(146_146_146_/_0.18)] bg-white/88 p-6 shadow-[0_18px_50px_rgb(54_54_54_/_0.06)] sm:p-8">
            <div className="flex flex-col items-center gap-6 text-center sm:gap-8">
              <div className="flex w-full max-w-xl flex-col items-center">
                <Skeleton className="h-4 w-24 rounded-full bg-[color:rgb(56_153_236_/_0.18)]" />
                <Skeleton className="mt-4 h-9 w-full max-w-lg" />
                <Skeleton className="mt-4 h-4 w-full rounded-full" />
                <Skeleton className="mt-2 h-4 w-5/6 rounded-full" />
              </div>

              <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
                <Skeleton className="h-12 w-full rounded-2xl sm:w-32" />
                <Skeleton className="h-12 w-full rounded-2xl bg-[color:rgb(56_153_236_/_0.2)] sm:w-36" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
