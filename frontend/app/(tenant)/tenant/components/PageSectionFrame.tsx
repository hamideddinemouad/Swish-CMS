import type { ReactNode } from "react";

export default function PageSectionFrame({ children }: { children: ReactNode }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </div>
  );
}
