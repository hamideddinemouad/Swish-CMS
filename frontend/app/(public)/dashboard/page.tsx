"use client";

import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import Loading from "./loading";
import {
  ActionLink,
  PageShell,
  StatCard,
  StatusBanner,
  SurfaceCard,
  publicBadgeStyles,
} from "../shared/public-ui";
import { useHydrated } from "../shared/useHydrated";

type DashboardUserInfo = {
  tenantTemplateId: string | null;
  tenantSubdomain: string | null;
};

type DashboardPage = {
  slug: string;
  title: string;
  components: Array<{
    type: string;
    enabled: boolean;
    variant?: string;
  }>;
};

type DashboardStats = {
  pagesCount: number;
  visibleSectionsCount: number;
  templateLabel: string;
  workspaceLabel: string;
  editorReady: string;
};

function titleize(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildTenantHomeUrl(subdomain: string) {
  return `https://${subdomain}.swish.ltd/`;
}

export default function DashboardPage() {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const mounted = useHydrated();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [statsError, setStatsError] = useState(false);

  useEffect(() => {
    if (mounted && !user) {
      router.replace("/login");
    }
    if (mounted && !user?.tenantSubdomain) {
      router.replace("/setup");
    }
  }, [mounted, router, user]);

  useEffect(() => {
    if (!mounted || !user?.tenantSubdomain) {
      return;
    }

    let cancelled = false;

    async function loadStats() {
      try {
        const [userInfoResponse, pagesResponse] = await Promise.all([
          axios.get<DashboardUserInfo>("/api/users/update-user-info"),
          axios.get<DashboardPage[]>("/api/editor/pages"),
        ]);

        if (cancelled) {
          return;
        }

        const visibleSectionsCount = pagesResponse.data.reduce((count, page) => {
          const visibleComponents = page.components.filter(
            (component) =>
              component.enabled &&
              component.type !== "nav" &&
              component.type !== "footer" &&
              component.type !== "newsletter",
          );

          return count + visibleComponents.length;
        }, 0);

        const templateId = userInfoResponse.data.tenantTemplateId;

        setStats({
          pagesCount: pagesResponse.data.length,
          visibleSectionsCount,
          templateLabel: templateId ? titleize(templateId) : "Not set",
          workspaceLabel: userInfoResponse.data.tenantSubdomain ?? "No workspace",
          editorReady:
            pagesResponse.data.length > 0 && userInfoResponse.data.tenantSubdomain
              ? "Ready"
              : "Pending",
        });
        setStatsError(false);
      } catch {
        if (!cancelled) {
          setStatsError(true);
        }
      }
    }

    void loadStats();

    return () => {
      cancelled = true;
    };
  }, [mounted, user?.tenantSubdomain]);

  if (!mounted || !user?.tenantSubdomain || !user) {
    return <Loading />;
  }

  const isStatsLoading = !stats && !statsError;
  const liveSiteHref = user.tenantSubdomain
    ? buildTenantHomeUrl(user.tenantSubdomain)
    : null;

  const statCards = [
    {
      label: "Pages",
      value: stats ? String(stats.pagesCount) : "—",
      hint: "Published tenant pages available in the editor.",
    },
    {
      label: "Visible sections",
      value: stats ? String(stats.visibleSectionsCount) : "—",
      hint: "Enabled content blocks currently visible across the site.",
    },
    {
      label: "Template",
      value: stats ? stats.templateLabel : "—",
      hint: "Starter template currently associated with this workspace.",
    },
    {
      label: "Workspace",
      value: stats ? stats.workspaceLabel : "—",
      hint: "Current tenant subdomain.",
    },
    {
      label: "Editor ready",
      value: stats ? stats.editorReady : "—",
      hint: "Basic editing flow and page loading status.",
    },
  ];

  return (
    <PageShell size="medium">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_22rem] lg:items-start">
        <SurfaceCard tone="hero" className="px-6 py-7 sm:px-8 sm:py-9">
          <div className="space-y-5">
            <span className={publicBadgeStyles.blue}>Dashboard</span>
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold tracking-[-0.06em] text-[var(--color-deep-navy)] sm:text-4xl">
                Welcome back, {user.firstName} {user.lastName}.
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-[var(--color-ink-700)] sm:text-base">
                Signed in as {user.email}. This overview keeps the current workspace,
                template, and editor state easy to scan before you move back into the product.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ActionLink href="/editor/home">Open editor</ActionLink>
              <ActionLink href="/profile" variant="secondary">
                Manage profile
              </ActionLink>
              {liveSiteHref ? (
                <Link
                  href={liveSiteHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center text-sm font-semibold text-[var(--color-deep-blue)] underline decoration-[rgb(56_153_236_/_0.35)] underline-offset-4 transition hover:text-[var(--color-wix-blue)]"
                >
                  View live site
                </Link>
              ) : null}
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard tone="soft" className="p-5 sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-wix-green)]">
            Workspace status
          </p>
          <div className="mt-4 space-y-3">
            <div className="rounded-[22px] border border-slate-200/80 bg-white/90 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-500)]">
                Workspace
              </p>
              <p className="mt-2 text-sm font-semibold text-[var(--color-ink-900)]">
                {user.tenantSubdomain}
              </p>
            </div>
            <div className="rounded-[22px] border border-slate-200/80 bg-white/90 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-500)]">
                Flow state
              </p>
              <p className="mt-2 text-sm font-semibold text-[var(--color-ink-900)]">
                {stats?.editorReady ?? "Preparing overview"}
              </p>
            </div>
            <div className="rounded-[22px] border border-slate-200/80 bg-white/90 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-500)]">
                Current focus
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--color-ink-700)]">
                Review the workspace snapshot, then continue into the editor or profile without leaving the current shell.
              </p>
            </div>
          </div>
        </SurfaceCard>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-2">
          <span className={publicBadgeStyles.purple}>Overview</span>
          <h2 className="text-2xl font-semibold tracking-[-0.05em] text-[var(--color-deep-navy)]">
            Current workspace metrics
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {statCards.map((card) => (
            <div key={card.label}>
              {isStatsLoading ? (
                <SurfaceCard tone="metric" className="px-4 py-4 sm:px-5">
                  <div className="animate-pulse space-y-3">
                    <div className="h-3 w-20 rounded-full bg-[color:rgb(56_153_236_/_0.14)]" />
                    <div className="h-8 w-24 rounded-2xl bg-[color:rgb(56_153_236_/_0.12)]" />
                    <div className="h-4 w-full rounded-full bg-[color:rgb(146_146_146_/_0.12)]" />
                    <div className="h-4 w-4/5 rounded-full bg-[color:rgb(146_146_146_/_0.1)]" />
                  </div>
                </SurfaceCard>
              ) : (
                <StatCard label={card.label} value={card.value} hint={card.hint} />
              )}
            </div>
          ))}
        </div>

        {statsError ? (
          <StatusBanner tone="error">
            Dashboard stats could not be loaded right now.
          </StatusBanner>
        ) : null}
      </section>
    </PageShell>
  );
}
