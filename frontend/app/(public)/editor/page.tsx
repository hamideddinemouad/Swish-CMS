
import PageVisualizer from "./components/pageVisualizer";

export default function EditorPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-10 lg:px-8">
      <section className="flex min-h-[calc(100vh-5rem)] flex-col gap-6 rounded-[32px] border border-[color:rgb(146_146_146_/_0.18)] bg-white/90 p-6 shadow-[0_20px_50px_rgb(54_54_54_/_0.08)] lg:p-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
            Editor
          </p>
          <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--color-ink-900)]">
            Editor shell
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-[var(--color-ink-700)]">
            This route is reserved for the editor experience. The workspace,
            controls, and data loading will be wired in next.
          </p>
        </div>

        <div className="grid flex-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="rounded-[28px] border border-dashed border-[color:rgb(56_153_236_/_0.22)] bg-[linear-gradient(180deg,rgba(56,153,236,0.06),rgba(56,153,236,0.02))] p-5">
            <div className="flex h-full min-h-[320px] items-center justify-center rounded-[22px] border border-[color:rgb(56_153_236_/_0.14)] bg-white/75 text-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
                  Canvas
                </p>   <PageVisualizer />
                <p className="mt-2 text-base text-[var(--color-ink-700)]">
                  Editor surface placeholder
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-[28px] border border-[color:rgb(146_146_146_/_0.14)] bg-[var(--color-bg-50)] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
              Panels
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-[color:rgb(146_146_146_/_0.12)] bg-white px-4 py-3 text-sm text-[var(--color-ink-700)]">
                Toolbar placeholder
              </div>
              <div className="rounded-2xl border border-[color:rgb(146_146_146_/_0.12)] bg-white px-4 py-3 text-sm text-[var(--color-ink-700)]">
                Properties placeholder
              </div>
              <div className="rounded-2xl border border-[color:rgb(146_146_146_/_0.12)] bg-white px-4 py-3 text-sm text-[var(--color-ink-700)]">
                Inspector placeholder
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
