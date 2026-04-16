import Link from "next/link";
import type {
  ComponentProps,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from "react";

export function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export const publicBadgeStyles = {
  blue:
    "inline-flex items-center rounded-full border border-[rgb(56_153_236_/_0.18)] bg-[rgb(56_153_236_/_0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-wix-blue)]",
  orange:
    "inline-flex items-center rounded-full border border-[rgb(251_125_51_/_0.16)] bg-[rgb(251_125_51_/_0.1)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-wix-orange)]",
  green:
    "inline-flex items-center rounded-full border border-[rgb(96_188_87_/_0.18)] bg-[rgb(96_188_87_/_0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-wix-green)]",
  purple:
    "inline-flex items-center rounded-full border border-[rgb(170_77_200_/_0.16)] bg-[rgb(170_77_200_/_0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-wix-purple)]",
  slate:
    "inline-flex items-center rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-500)]",
} as const;

export const editorBadgeStyles = {
  blue:
    "inline-flex items-center rounded-full border border-[rgb(56_153_236_/_0.16)] bg-[rgb(56_153_236_/_0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]",
  green:
    "inline-flex items-center rounded-full border border-[rgb(96_188_87_/_0.16)] bg-[rgb(96_188_87_/_0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-green)]",
  slate:
    "inline-flex items-center rounded-full border border-[color:rgb(146_146_146_/_0.14)] bg-[color:rgb(146_146_146_/_0.05)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-500)]",
  orange:
    "inline-flex items-center rounded-full border border-[rgb(251_125_51_/_0.16)] bg-[rgb(251_125_51_/_0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-orange)]",
} as const;

export const publicSurfaceStyles = {
  hero:
    "relative overflow-hidden rounded-[34px] border border-white/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(243,249,255,0.92))] shadow-[0_30px_90px_-46px_rgba(15,23,42,0.34)] backdrop-blur-xl",
  panel:
    "rounded-[30px] border border-white/75 bg-white/88 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.3)] backdrop-blur",
  soft:
    "rounded-[28px] border border-[rgb(56_153_236_/_0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,250,255,0.92))] shadow-[0_20px_56px_-46px_rgba(15,23,42,0.28)]",
  accent:
    "rounded-[30px] border border-[rgb(56_153_236_/_0.16)] bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(236,246,255,0.96),rgba(255,244,212,0.62))] shadow-[0_26px_74px_-48px_rgba(15,23,42,0.34)]",
  dark:
    "rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,#0f172a_0%,#14324f_100%)] text-white shadow-[0_34px_90px_-48px_rgba(15,23,42,0.78)]",
  inset:
    "rounded-[26px] border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.76)]",
  metric:
    "rounded-[24px] border border-white/80 bg-white/78 shadow-[0_18px_42px_-34px_rgba(15,23,42,0.28)] backdrop-blur",
} as const;

export const editorSurfaceStyles = {
  header:
    "rounded-[22px] border border-[color:rgb(146_146_146_/_0.16)] bg-white shadow-[0_16px_38px_-30px_rgba(15,23,42,0.22)]",
  panel:
    "rounded-[22px] border border-[color:rgb(146_146_146_/_0.16)] bg-white shadow-[0_18px_42px_-32px_rgba(15,23,42,0.24)]",
  muted:
    "rounded-[18px] border border-[color:rgb(146_146_146_/_0.14)] bg-[color:rgb(248_249_251)]",
  inset:
    "rounded-[18px] border border-[color:rgb(146_146_146_/_0.14)] bg-[color:rgb(250_251_252)]",
  chrome:
    "border-b border-[color:rgb(146_146_146_/_0.14)] bg-[color:rgb(250_251_252)]",
  overlay:
    "rounded-[24px] border border-[color:rgb(146_146_146_/_0.14)] bg-white shadow-[0_24px_60px_-34px_rgba(15,23,42,0.32)]",
} as const;

export const publicButtonStyles = {
  primary:
    "inline-flex items-center justify-center rounded-[20px] bg-[linear-gradient(135deg,#3899ec_0%,#2f7be6_52%,#0f5fd7_100%)] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_36px_-22px_rgba(56,153,236,0.86)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_42px_-20px_rgba(56,153,236,0.92)] motion-reduce:transition-none",
  special:
    "inline-flex items-center justify-center rounded-[20px] bg-[linear-gradient(135deg,#ff6b6b_0%,#ff477e_55%,#ff2d55_100%)] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_20px_40px_-20px_rgba(255,71,126,0.92)] transition hover:-translate-y-0.5 hover:shadow-[0_26px_48px_-18px_rgba(255,71,126,0.98)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(255_107_107_/_0.28)] motion-reduce:transition-none",
  secondary:
    "inline-flex items-center justify-center rounded-[20px] border border-slate-200 bg-white/90 px-5 py-3.5 text-sm font-semibold text-slate-800 shadow-[0_14px_34px_-26px_rgba(15,23,42,0.3)] transition hover:border-slate-300 hover:bg-white motion-reduce:transition-none",
  quiet:
    "inline-flex items-center justify-center text-sm font-semibold text-[var(--color-deep-blue)] underline decoration-[rgb(56_153_236_/_0.35)] underline-offset-4 transition hover:text-[var(--color-wix-blue)] motion-reduce:transition-none",
  dark:
    "inline-flex items-center justify-center rounded-[18px] border border-slate-900 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 motion-reduce:transition-none",
  danger:
    "inline-flex items-center justify-center rounded-[18px] border border-[color:rgb(224_43_74_/_0.22)] bg-[color:rgb(224_43_74_/_0.08)] px-4 py-2.5 text-sm font-semibold text-[var(--color-wix-red)] transition hover:bg-[color:rgb(224_43_74_/_0.12)] motion-reduce:transition-none",
} as const;

export const editorButtonStyles = {
  primary:
    "inline-flex items-center justify-center rounded-[14px] bg-[var(--color-wix-blue)] px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#2f86d3] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(56_153_236_/_0.18)] motion-reduce:transition-none",
  secondary:
    "inline-flex items-center justify-center rounded-[14px] border border-[color:rgb(146_146_146_/_0.18)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--color-ink-900)] transition-colors duration-200 hover:bg-[color:rgb(248_249_251)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(56_153_236_/_0.12)] motion-reduce:transition-none",
  danger:
    "inline-flex items-center justify-center rounded-[14px] border border-[color:rgb(224_43_74_/_0.16)] bg-[color:rgb(224_43_74_/_0.06)] px-4 py-2.5 text-sm font-semibold text-[var(--color-wix-red)] transition-colors duration-200 hover:bg-[color:rgb(224_43_74_/_0.1)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(224_43_74_/_0.12)] motion-reduce:transition-none",
} as const;

export const publicInputBaseClass =
  "w-full rounded-[20px] border border-[color:rgb(146_146_146_/_0.18)] bg-white px-4 py-3.5 text-sm text-[var(--color-ink-900)] outline-none transition focus:border-[var(--color-wix-blue)] focus:shadow-[0_0_0_4px_rgb(56_153_236_/_0.08)] motion-reduce:transition-none";

export const editorInputBaseClass =
  "w-full rounded-[14px] border border-[color:rgb(146_146_146_/_0.18)] bg-white px-3.5 py-3 text-sm text-[var(--color-ink-900)] outline-none transition-colors duration-200 focus:border-[var(--color-wix-blue)] focus:shadow-[0_0_0_4px_rgb(56_153_236_/_0.08)] motion-reduce:transition-none";

export function getInputStateClass(state: "default" | "success" | "error" = "default") {
  switch (state) {
    case "success":
      return "border-[var(--color-wix-green)] bg-[color:rgb(96_188_87_/_0.05)]";
    case "error":
      return "border-[var(--color-wix-red)] bg-[color:rgb(224_43_74_/_0.05)]";
    default:
      return "border-[color:rgb(146_146_146_/_0.18)] bg-white";
  }
}

export function PageShell({
  children,
  className,
  size = "wide",
}: PropsWithChildren<{
  className?: string;
  size?: "wide" | "medium" | "narrow";
}>) {
  const sizeClass =
    size === "narrow"
      ? "max-w-4xl"
      : size === "medium"
        ? "max-w-6xl"
        : "max-w-7xl";

  return (
    <main
      className={cx(
        "relative mx-auto flex min-h-[calc(100vh-5.5rem)] w-full flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8",
        sizeClass,
        className,
      )}
    >
      {children}
    </main>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
  className,
  actions,
  align = "left",
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  actions?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cx(
        "space-y-4",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      )}
    >
      <div>{eyebrow}</div>
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-[-0.06em] text-[var(--color-deep-navy)] sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-sm leading-7 text-[var(--color-ink-700)] sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div> : null}
    </div>
  );
}

export function SurfaceCard({
  children,
  className,
  tone = "panel",
  ...props
}: PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    className?: string;
    tone?: keyof typeof publicSurfaceStyles;
  }
>) {
  return (
    <div className={cx(publicSurfaceStyles[tone], className)} {...props}>
      {children}
    </div>
  );
}

export function ActionLink({
  className,
  variant = "primary",
  children,
  ...props
}: ComponentProps<typeof Link> & {
  className?: string;
  variant?: keyof typeof publicButtonStyles;
}) {
  return (
    <Link className={cx(publicButtonStyles[variant], className)} {...props}>
      {children}
    </Link>
  );
}

export function StatusBanner({
  children,
  className,
  tone = "info",
  ...props
}: PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    className?: string;
    tone?: "info" | "success" | "warning" | "error";
  }
>) {
  const toneClass = {
    info: "border-[color:rgb(56_153_236_/_0.18)] bg-[color:rgb(56_153_236_/_0.07)] text-[var(--color-ink-700)]",
    success:
      "border-[color:rgb(96_188_87_/_0.18)] bg-[color:rgb(96_188_87_/_0.08)] text-[var(--color-ink-700)]",
    warning:
      "border-[color:rgb(251_125_51_/_0.18)] bg-[color:rgb(251_125_51_/_0.08)] text-[var(--color-ink-700)]",
    error:
      "border-[color:rgb(224_43_74_/_0.18)] bg-[color:rgb(224_43_74_/_0.06)] text-[var(--color-wix-red)]",
  }[tone];

  return (
    <div
      className={cx("rounded-[22px] border px-4 py-3 text-sm leading-6", toneClass, className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  hint: ReactNode;
  className?: string;
}) {
  return (
    <SurfaceCard tone="metric" className={cx("px-4 py-4 sm:px-5", className)}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
        {label}
      </p>
      <p className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[var(--color-deep-navy)] sm:text-3xl">
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-[var(--color-ink-700)]">{hint}</p>
    </SurfaceCard>
  );
}
