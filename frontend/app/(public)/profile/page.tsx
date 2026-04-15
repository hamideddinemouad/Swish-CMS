"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/slices/userSlice";
import { ProfilePageSkeleton } from "@/components/loading/PageSkeletons";

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

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [mounted, setMounted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [tenantSubdomain, setTenantSubdomain] = useState<string | null>(null);
  const [tenantTemplateId, setTenantTemplateId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

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

      setStatus("Profile updated.");
    } catch {
      setStatus("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  }

  if (!mounted || !user || isProfileLoading) {
    return <ProfilePageSkeleton />;
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-5.5rem)] w-full max-w-6xl flex-col px-4 py-5 sm:px-6 sm:py-6">
      <section className="overflow-hidden rounded-[36px] border border-[color:rgb(146_146_146_/_0.16)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(245,250,255,0.95)_100%)] shadow-[0_24px_70px_rgb(54_54_54_/_0.08)]">
        <div className="border-b border-[color:rgb(146_146_146_/_0.12)] bg-[radial-gradient(circle_at_top_left,rgba(56,153,236,0.16),transparent_36%),linear-gradient(135deg,#ffffff_0%,#f4f9ff_46%,#eef6ff_100%)] px-6 py-7 sm:px-8 sm:py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
                Profile
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--color-ink-900)] sm:text-4xl">
                Your account, workspace, and launch status
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-ink-700)] sm:text-base">
                Keep your account details tidy and stay close to the workspace identity your
                visitors will actually see.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[23rem]">
              <div className="rounded-2xl border border-white/70 bg-white/85 px-4 py-4 shadow-[0_16px_34px_rgb(56_153_236_/_0.1)] backdrop-blur">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
                  Workspace
                </p>
                <p className="mt-2 text-base font-semibold text-[var(--color-ink-900)]">
                  {tenantSubdomain ?? "Not created"}
                </p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/85 px-4 py-4 shadow-[0_16px_34px_rgb(56_153_236_/_0.1)] backdrop-blur">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
                  Template
                </p>
                <p className="mt-2 text-base font-semibold text-[var(--color-ink-900)]">
                  {tenantTemplateId ? titleize(tenantTemplateId) : "Not set"}
                </p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/85 px-4 py-4 shadow-[0_16px_34px_rgb(56_153_236_/_0.1)] backdrop-blur">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
                  Status
                </p>
                <p className="mt-2 text-base font-semibold text-[var(--color-ink-900)]">
                  {tenantSubdomain ? "Workspace active" : "Setup pending"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 px-6 py-6 sm:px-8 sm:py-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[30px] border border-[color:rgb(146_146_146_/_0.14)] bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] p-5 shadow-[0_16px_40px_rgb(54_54_54_/_0.04)] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
                  Account Info
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-[var(--color-ink-900)]">
                  Personal details
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--color-ink-700)]">
                  Update the name shown across your workspace while keeping your login email
                  visible as a fixed reference.
                </p>
              </div>
              <div className="hidden rounded-full border border-[color:rgb(56_153_236_/_0.16)] bg-[color:rgb(56_153_236_/_0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-wix-blue)] sm:block">
                Account
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-[var(--color-ink-700)]">
                  First name
                </span>
                <input
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  className="w-full rounded-2xl border border-[color:rgb(146_146_146_/_0.18)] bg-[linear-gradient(180deg,#ffffff_0%,#f9fbfe_100%)] px-4 py-3 text-sm text-[var(--color-ink-900)] outline-none transition focus:border-[var(--color-wix-blue)] focus:shadow-[0_0_0_4px_rgb(56_153_236_/_0.08)]"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-[var(--color-ink-700)]">
                  Last name
                </span>
                <input
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  className="w-full rounded-2xl border border-[color:rgb(146_146_146_/_0.18)] bg-[linear-gradient(180deg,#ffffff_0%,#f9fbfe_100%)] px-4 py-3 text-sm text-[var(--color-ink-900)] outline-none transition focus:border-[var(--color-wix-blue)] focus:shadow-[0_0_0_4px_rgb(56_153_236_/_0.08)]"
                />
              </label>
            </div>

            <label className="mt-4 block space-y-2">
              <span className="text-sm font-medium text-[var(--color-ink-700)]">Email</span>
              <input
                value={email}
                readOnly
                className="w-full rounded-2xl border border-[color:rgb(146_146_146_/_0.14)] bg-[linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)] px-4 py-3 text-sm text-[var(--color-ink-500)] outline-none"
              />
            </label>

            <div className="mt-6 rounded-[26px] border border-[color:rgb(56_153_236_/_0.14)] bg-[linear-gradient(135deg,rgba(56,153,236,0.08)_0%,rgba(255,255,255,0.9)_100%)] p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-[var(--color-ink-900)]">
                    Save account changes
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[var(--color-ink-700)]">
                    This updates the identity details tied to your current Swish account.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#3899ec_0%,#1673cc_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_34px_rgb(56_153_236_/_0.24)] transition hover:translate-y-[-1px] hover:shadow-[0_20px_38px_rgb(56_153_236_/_0.3)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSaving ? "Saving..." : "Save changes"}
                </button>
              </div>
              {status ? (
                <p className="mt-3 text-sm font-medium text-[var(--color-ink-700)]">{status}</p>
              ) : null}
            </div>
          </section>

          <section className="rounded-[30px] border border-[color:rgb(146_146_146_/_0.14)] bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] p-5 shadow-[0_16px_40px_rgb(54_54_54_/_0.04)] sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
              Workspace Snapshot
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-[var(--color-ink-900)]">
              Launch context
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--color-ink-700)]">
              A compact view of the workspace identity currently attached to your account.
            </p>

            <div className="mt-6 space-y-4">
              <div className="overflow-hidden rounded-[26px] border border-[color:rgb(146_146_146_/_0.12)] bg-[linear-gradient(135deg,#ffffff_0%,#f4faff_100%)]">
                <div className="border-b border-[color:rgb(146_146_146_/_0.1)] px-5 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
                    Live workspace
                  </p>
                </div>
                <div className="grid gap-0 sm:grid-cols-2">
                  <InfoTile
                    label="Subdomain"
                    value={tenantSubdomain ?? "No workspace yet"}
                    emphasis="strong"
                  />
                  <InfoTile
                    label="Template"
                    value={tenantTemplateId ? titleize(tenantTemplateId) : "Not set"}
                  />
                  <InfoTile
                    label="Workspace status"
                    value={tenantSubdomain ? "Active and available" : "Waiting for setup"}
                  />
                  <InfoTile label="Account email" value={email || "Not available"} />
                </div>
              </div>

              <div className="rounded-[26px] border border-[color:rgb(146_146_146_/_0.12)] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
                  Working rhythm
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <PulseStat label="Profile" value="Editable" />
                  <PulseStat label="Workspace" value={tenantSubdomain ? "Linked" : "Pending"} />
                  <PulseStat label="Template" value={tenantTemplateId ? "Assigned" : "Unset"} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
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
    <div className="border-t border-[color:rgb(146_146_146_/_0.1)] px-5 py-4 first:border-t-0 sm:border-l sm:first:border-l-0 sm:[&:nth-child(odd)]:border-l-0 sm:[&:nth-child(-n+2)]:border-t-0">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-500)]">
        {label}
      </p>
      <p
        className={`mt-2 leading-6 ${
          emphasis === "strong"
            ? "text-lg font-semibold tracking-[-0.03em] text-[var(--color-ink-900)]"
            : "text-sm font-medium text-[var(--color-ink-800)]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function PulseStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[color:rgb(56_153_236_/_0.12)] bg-white px-4 py-4 shadow-[0_10px_24px_rgb(56_153_236_/_0.06)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-wix-blue)]">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-[var(--color-ink-900)]">{value}</p>
    </div>
  );
}
