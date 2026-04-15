"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProfilePageSkeleton } from "@/components/loading/PageSkeletons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/slices/userSlice";
import {
  ActionLink,
  PageShell,
  StatCard,
  StatusBanner,
  SurfaceCard,
  cx,
  publicBadgeStyles,
  publicButtonStyles,
  publicInputBaseClass,
} from "../shared/public-ui";
import { useHydrated } from "../shared/useHydrated";

type ProfileResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  tenantId: string | null;
  tenantSubdomain: string | null;
  tenantTemplateId: string | null;
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

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const mounted = useHydrated();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [tenantSubdomain, setTenantSubdomain] = useState<string | null>(null);
  const [tenantTemplateId, setTenantTemplateId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [statusTone, setStatusTone] = useState<"success" | "error">("success");

  useEffect(() => {
    if (mounted && !user) {
      router.replace("/login");
    }
  }, [mounted, router, user]);

  useEffect(() => {
    if (!mounted || !user) {
      return;
    }

    let cancelled = false;

    async function loadProfile() {
      try {
        const response = await axios.get<ProfileResponse>("/api/users/update-user-info");

        if (cancelled) {
          return;
        }

        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setTenantSubdomain(response.data.tenantSubdomain);
        setTenantTemplateId(response.data.tenantTemplateId);
      } catch {
        if (!cancelled) {
          setStatusTone("error");
          setStatus("Could not load profile details.");
        }
      } finally {
        if (!cancelled) {
          setIsProfileLoading(false);
        }
      }
    }

    void loadProfile();

    return () => {
      cancelled = true;
    };
  }, [mounted, user]);

  async function handleSave() {
    if (isSaving) {
      return;
    }

    setIsSaving(true);
    setStatus("");

    try {
      await axios.patch("/api/users/profile", {
        firstName,
        lastName,
      });

      if (user) {
        dispatch(
          setUser({
            ...user,
            firstName,
            lastName,
          }),
        );
      }

      setStatusTone("success");
      setStatus("Profile updated.");
    } catch {
      setStatusTone("error");
      setStatus("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  }

  if (!mounted || !user || isProfileLoading) {
    return <ProfilePageSkeleton />;
  }

  const liveSiteHref = tenantSubdomain ? buildTenantHomeUrl(tenantSubdomain) : null;

  return (
    <PageShell size="medium">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_22rem] lg:items-start">
        <SurfaceCard tone="hero" className="px-6 py-7 sm:px-8 sm:py-9">
          <div className="space-y-5">
            <span className={publicBadgeStyles.blue}>Profile</span>
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold tracking-[-0.06em] text-[var(--color-deep-navy)] sm:text-4xl">
                Your account, workspace, and launch status.
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-[var(--color-ink-700)] sm:text-base">
                Keep your account details tidy and stay close to the workspace identity your
                visitors will actually see.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <StatCard
                label="Workspace"
                value={tenantSubdomain ?? "Not created"}
                hint="Current public workspace"
              />
              <StatCard
                label="Template"
                value={tenantTemplateId ? titleize(tenantTemplateId) : "Not set"}
                hint="Template assigned to this workspace"
              />
              <StatCard
                label="Status"
                value={tenantSubdomain ? "Workspace active" : "Setup pending"}
                hint="Launch state of the current account"
              />
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard tone="soft" className="p-5 sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-wix-purple)]">
            Quick actions
          </p>
          <div className="mt-4 flex flex-col gap-3">
            <ActionLink href="/dashboard">Back to dashboard</ActionLink>
            <ActionLink href="/editor/home" variant="secondary">
              Open editor
            </ActionLink>
            {liveSiteHref ? (
              <ActionLink href={liveSiteHref} target="_blank" rel="noreferrer" variant="secondary">
                View live site
              </ActionLink>
            ) : null}
          </div>
        </SurfaceCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
        <SurfaceCard tone="panel" className="p-6 sm:p-8">
          <div className="space-y-3">
            <span className={publicBadgeStyles.slate}>Account info</span>
            <h2 className="text-2xl font-semibold tracking-[-0.05em] text-[var(--color-deep-navy)]">
              Personal details
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-[var(--color-ink-700)]">
              Update the identity details tied to your current Swish account while keeping
              the login email visible as a fixed reference.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-[var(--color-ink-700)]">First name</span>
              <input
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                className={publicInputBaseClass}
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-[var(--color-ink-700)]">Last name</span>
              <input
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                className={publicInputBaseClass}
              />
            </label>
          </div>

          <label className="mt-4 block space-y-2">
            <span className="text-sm font-medium text-[var(--color-ink-700)]">Email</span>
            <input
              value={email}
              readOnly
              className={cx(
                publicInputBaseClass,
                "border-[color:rgb(146_146_146_/_0.14)] bg-[linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)] text-[var(--color-ink-500)] focus:border-[color:rgb(146_146_146_/_0.14)] focus:shadow-none",
              )}
            />
          </label>

          <div className="mt-6 rounded-[26px] border border-[color:rgb(56_153_236_/_0.14)] bg-[linear-gradient(135deg,rgba(56,153,236,0.08)_0%,rgba(255,255,255,0.9)_100%)] p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[var(--color-ink-900)]">
                  Save account changes
                </p>
                <p className="mt-1 text-sm leading-6 text-[var(--color-ink-700)]">
                  This keeps the account identity aligned with the current workspace.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className={cx(
                  publicButtonStyles.primary,
                  "disabled:cursor-not-allowed disabled:opacity-70",
                )}
              >
                {isSaving ? "Saving..." : "Save changes"}
              </button>
            </div>
            {status ? (
              <StatusBanner className="mt-4" tone={statusTone}>
                {status}
              </StatusBanner>
            ) : null}
          </div>
        </SurfaceCard>

        <SurfaceCard tone="soft" className="p-6 sm:p-8">
          <div className="space-y-3">
            <span className={publicBadgeStyles.green}>Workspace snapshot</span>
            <h2 className="text-2xl font-semibold tracking-[-0.05em] text-[var(--color-deep-navy)]">
              Launch context
            </h2>
            <p className="text-sm leading-7 text-[var(--color-ink-700)]">
              A compact view of the workspace identity currently attached to your account.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="overflow-hidden rounded-[26px] border border-slate-200/80 bg-white/92">
              <div className="border-b border-slate-200/80 px-5 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
                  Live workspace
                </p>
              </div>
              <div className="grid gap-0 sm:grid-cols-2">
                <InfoTile label="Subdomain" value={tenantSubdomain ?? "No workspace yet"} emphasis="strong" />
                <InfoTile label="Template" value={tenantTemplateId ? titleize(tenantTemplateId) : "Not set"} />
                <InfoTile
                  label="Workspace status"
                  value={tenantSubdomain ? "Active and available" : "Waiting for setup"}
                />
                <InfoTile label="Account email" value={email || "Not available"} />
              </div>
            </div>
          </div>
        </SurfaceCard>
      </section>
    </PageShell>
  );
}

function InfoTile({
  label,
  value,
  emphasis = "normal",
}: {
  label: string;
  value: string;
  emphasis?: "normal" | "strong";
}) {
  return (
    <div className="border-t border-slate-200/80 px-5 py-4 first:border-t-0 sm:border-l sm:first:border-l-0 sm:[&:nth-child(odd)]:border-l-0 sm:[&:nth-child(-n+2)]:border-t-0">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-500)]">
        {label}
      </p>
      <p
        className={cx(
          "mt-2 leading-6 text-[var(--color-ink-700)]",
          emphasis === "strong" ? "text-base font-semibold text-[var(--color-ink-900)]" : "text-sm",
        )}
      >
        {value}
      </p>
    </div>
  );
}
