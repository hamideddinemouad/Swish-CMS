"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import Loading from "./loading";

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

export default function DashboardPage() {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [statsError, setStatsError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <main className="mx-auto flex min-h-[calc(100vh-5.5rem)] w-full max-w-6xl flex-col px-4 py-5 sm:px-6 sm:py-6">
      <section className="rounded-[32px] border border-[color:rgb(146_146_146_/_0.18)] bg-white/92 p-6 shadow-[0_20px_50px_rgb(54_54_54_/_0.08)] backdrop-blur sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
          Dashboard
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink-900)] sm:text-3xl">
          Welcome, {user?.firstName} {user?.lastName}
        </h1>
        <p className="mt-4 text-sm leading-7 text-[var(--color-ink-700)]">
          Signed in as {user?.email}.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {statCards.map((card) => (
            <article
              key={card.label}
              className="rounded-[24px] border border-[color:rgb(146_146_146_/_0.14)] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5 shadow-[0_16px_40px_rgb(54_54_54_/_0.04)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
                {card.label}
              </p>
              {isStatsLoading ? (
                <div className="mt-3 space-y-3 animate-pulse">
                  <div className="h-9 w-20 rounded-2xl bg-[color:rgb(56_153_236_/_0.12)]" />
                  <div className="h-4 w-full rounded-full bg-[color:rgb(146_146_146_/_0.14)]" />
                  <div className="h-4 w-4/5 rounded-full bg-[color:rgb(146_146_146_/_0.12)]" />
                </div>
              ) : (
                <>
                  <p className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--color-ink-900)]">
                    {card.value}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[var(--color-ink-700)]">
                    {card.hint}
                  </p>
                </>
              )}
            </article>
          ))}
        </div>

        {statsError ? (
          <p className="mt-6 rounded-2xl border border-[color:rgb(224_43_74_/_0.18)] bg-[color:rgb(224_43_74_/_0.06)] px-4 py-3 text-sm text-[var(--color-wix-red)]">
            Dashboard stats could not be loaded right now.
          </p>
        ) : null}
      </section>
    </main>
  );
}
