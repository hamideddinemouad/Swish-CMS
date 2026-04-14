"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import {
  DEFAULT_SETUP_TEMPLATE_ID,
  SETUP_TEMPLATE_OPTIONS,
  type SetupTemplateId,
} from "@/lib/setup-templates";
import { setUser } from "@/redux/slices/userSlice";
import { useAppSelector } from "@/redux/hooks";
import { useAppDispatch } from "@/redux/hooks";

type AvailabilityResponse = {
  available: boolean;
};

type CreateTenantResponse = {
  id: string;
  subdomain: string;
  name: string;
  settings: Record<string, unknown>;
  userId: string | null;
  templateId?: SetupTemplateId;
};

type MeResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  tenantId: string | null;
  tenantSubdomain: string | null;
};

const SUBDOMAIN_REGEX = /^[a-z0-9-]+$/;
const RESERVED_SUBDOMAINS = new Set([
  "www",
  "app",
  "api",
  "admin",
  "static",
  "assets",
  "cdn",
  "mail",
]);

function normalizeSubdomain(value: string) {
  return value.trim().toLowerCase();
}

function isValidSubdomain(value: string) {
  return SUBDOMAIN_REGEX.test(value);
}

function isReservedSubdomain(value: string) {
  return RESERVED_SUBDOMAINS.has(value);
}

export default function SetupPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.user);
  const [subdomain, setSubdomain] = useState("");
  const [touched, setTouched] = useState(false);
  const [templateId, setTemplateId] = useState<SetupTemplateId>(
    DEFAULT_SETUP_TEMPLATE_ID,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const normalizedSubdomain = normalizeSubdomain(subdomain);
  const userId = currentUser?.id ?? null;
  const hasValidFormat = isValidSubdomain(normalizedSubdomain);
  const isReserved = isReservedSubdomain(normalizedSubdomain);
  const showValidation = touched && normalizedSubdomain.length > 0;
  const inputStateClass = showValidation
    ? hasValidFormat && !isReserved
      ? "border-[var(--color-wix-green)] bg-[color:rgb(96_188_87_/_0.05)]"
      : "border-[var(--color-wix-red)] bg-[color:rgb(224_43_74_/_0.05)]"
    : "border-[color:rgb(146_146_146_/_0.28)] bg-white";

  function resetFeedback() {
    if (isAvailable !== null || message) {
      setIsAvailable(null);
      setMessage("");
      setIsError(false);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextValue = event.currentTarget.value;
    setSubdomain(nextValue);
    resetFeedback();
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    setMessage("");
    setIsError(false);
    setIsAvailable(null);

    if (!normalizedSubdomain) {
      setMessage("Enter a subdomain to create your tenant.");
      setIsError(true);
      return;
    }

    if (!hasValidFormat) {
      setMessage("Use only lowercase letters, numbers, and hyphens.");
      setIsError(true);
      return;
    }

    if (isReserved) {
      setMessage("This subdomain is reserved. Choose another one.");
      setIsError(true);
      return;
    }

    if (!userId) {
      setMessage("Your session is missing. Please sign in again.");
      setIsError(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.get<AvailabilityResponse>(
        `/api/tenants/availability/${encodeURIComponent(normalizedSubdomain)}`
      );

      if (!response.data.available) {
        setIsAvailable(false);
        setMessage(`${normalizedSubdomain} is already taken.`);
        setIsError(true);
        return;
      }

      const createResponse = await axios.post<CreateTenantResponse>("/api/tenants", {
        subdomain: normalizedSubdomain,
        name: normalizedSubdomain,
        userId,
        settings: {},
        templateId,
      });

      if (createResponse.status >= 200 && createResponse.status < 300) {
        await axios.post("/api/auth/refresh");
        const meResponse = await axios.get<MeResponse>(
          "/api/users/update-user-info"
        );
        dispatch(
          setUser({
            id: meResponse.data.id,
            firstName: meResponse.data.firstName,
            lastName: meResponse.data.lastName,
            email: meResponse.data.email,
            tenantId: meResponse.data.tenantId,
            tenantSubdomain: meResponse.data.tenantSubdomain,
          })
        );
        //
        router.replace("/dashboard");
      }
    } catch (error) {
      setIsError(true);

      if (axios.isAxiosError<{ message?: string }>(error)) {
        setMessage(error.response?.data?.message ?? "Tenant creation failed");
      } else {
        setMessage("Tenant creation failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
      <section className="w-full max-w-6xl overflow-hidden rounded-[32px] border border-[color:rgb(146_146_146_/_0.18)] bg-white/92 shadow-[0_20px_50px_rgb(54_54_54_/_0.08)] backdrop-blur">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-[linear-gradient(180deg,rgba(56,153,236,0.12)_0%,rgba(255,255,255,0.9)_100%)] p-6 sm:p-8 lg:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
                Workspace setup
              </p>
              <h1 className="mt-3 max-w-md text-3xl font-semibold tracking-[-0.04em] text-[var(--color-ink-900)] sm:text-4xl">
                Set up your workspace
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-7 text-[var(--color-ink-700)] sm:text-base">
                Start by choosing a template, then pick a unique subdomain. Your
                workspace name will be created automatically from that subdomain.
              </p>
            </div>

            <div className="mt-6 rounded-[28px] border border-[color:rgb(56_153_236_/_0.22)] bg-[linear-gradient(180deg,rgba(56,153,236,0.14)_0%,rgba(255,255,255,0.96)_100%)] p-4 shadow-[0_0_0_1px_rgb(56_153_236_/_0.06),0_24px_60px_rgb(56_153_236_/_0.18)] sm:p-5">
              <div className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 shadow-[0_12px_24px_rgb(56_153_236_/_0.08)]">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-wix-blue)] text-sm font-semibold text-white shadow-[0_12px_24px_rgb(56_153_236_/_0.26)]">
                  3
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
                    Setup Flow
                  </p>
                  <p className="text-sm font-semibold text-[var(--color-ink-900)]">
                    Pick a template, claim a subdomain, then launch.
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-2xl border border-[color:rgb(56_153_236_/_0.14)] bg-white/92 px-4 py-4 shadow-[0_14px_30px_rgb(56_153_236_/_0.1)] ring-1 ring-[color:rgb(56_153_236_/_0.08)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-wix-blue)]">
                  01
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[var(--color-ink-900)]">
                    Choose a template
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[var(--color-ink-700)]">
                    Start from a structure that fits the kind of site you want to launch.
                  </p>
                </div>
                <div className="rounded-2xl border border-[color:rgb(56_153_236_/_0.14)] bg-white/92 px-4 py-4 shadow-[0_14px_30px_rgb(56_153_236_/_0.1)] ring-1 ring-[color:rgb(56_153_236_/_0.08)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-wix-blue)]">
                  02
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[var(--color-ink-900)]">
                    Pick your subdomain
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[var(--color-ink-700)]">
                    This becomes both the workspace address and its default name.
                  </p>
                </div>
                <div className="rounded-2xl border border-[color:rgb(56_153_236_/_0.14)] bg-white/92 px-4 py-4 shadow-[0_14px_30px_rgb(56_153_236_/_0.1)] ring-1 ring-[color:rgb(56_153_236_/_0.08)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-wix-blue)]">
                  03
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[var(--color-ink-900)]">
                    Launch the workspace
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[var(--color-ink-700)]">
                    We create the workspace only when the address is available and valid.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <p className="mb-2 block text-sm font-semibold text-[var(--color-ink-900)]">
              Starter template
            </p>
            <div className="grid gap-3">
              {SETUP_TEMPLATE_OPTIONS.map((template) => {
                const isSelected = template.id === templateId;

                return (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => {
                      setTemplateId(template.id);
                      resetFeedback();
                    }}
                    className={`rounded-2xl border px-4 py-4 text-left transition ${
                      isSelected
                        ? "border-[var(--color-wix-blue)] bg-[color:rgb(56_153_236_/_0.08)]"
                        : "border-[color:rgb(146_146_146_/_0.18)] bg-white hover:border-[var(--color-wix-blue)]"
                    }`}
                  >
                    <div className="mb-4 overflow-hidden rounded-[20px] border border-[color:rgb(146_146_146_/_0.14)] bg-[linear-gradient(180deg,#ffffff_0%,#f7fafc_100%)]">
                      <img
                        src={template.previewImage}
                        alt={`${template.label} template preview`}
                        className="block h-auto w-full"
                      />
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-[var(--color-ink-900)]">
                          {template.label}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-[var(--color-ink-700)]">
                          {template.description}
                        </p>
                        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-500)]">
                          {template.audience}
                        </p>
                      </div>
                      {isSelected ? (
                        <span className="rounded-full bg-[var(--color-wix-blue)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                          Selected
                        </span>
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-sm text-[var(--color-ink-500)]">
              Your selected template now seeds a different starter page set for the new
              workspace.
            </p>
          </div>

          <div>
            <label
              htmlFor="subdomain"
              className="mb-2 block text-sm font-semibold text-[var(--color-ink-900)]"
            >
              Subdomain
            </label>
            <input
              id="subdomain"
              name="subdomain"
              type="text"
              value={subdomain}
              onChange={handleChange}
              onBlur={() => setTouched(true)}
              placeholder="acme"
              autoComplete="off"
              spellCheck={false}
              required
              className={`w-full rounded-2xl border px-4 py-3 text-sm text-[var(--color-ink-900)] outline-none ring-0 transition focus:border-[var(--color-wix-blue)] ${inputStateClass}`}
            />
            <p className="mt-2 text-sm text-[var(--color-ink-500)]">
              Use lowercase letters, numbers, and hyphens. Keep it short, memorable, and
              avoid reserved names like `www` and `api`.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--color-wix-blue)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgb(56_153_236_/_0.18)] transition hover:bg-[#2f8fe2] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Creating workspace..." : "Create workspace"}
          </button>

          {message ? (
            <p
              aria-live="polite"
              className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${
                isError
                  ? "border-[color:rgb(224_43_74_/_0.18)] bg-[color:rgb(224_43_74_/_0.06)] text-[var(--color-wix-red)]"
                  : "border-[color:rgb(96_188_87_/_0.18)] bg-[color:rgb(96_188_87_/_0.06)] text-[var(--color-ink-700)]"
              }`}
            >
              {message}
            </p>
          ) : null}

          {isAvailable === true ? (
            <div className="rounded-2xl border border-[color:rgb(96_188_87_/_0.18)] bg-[color:rgb(96_188_87_/_0.06)] px-4 py-3 text-sm text-[var(--color-wix-green)]">
              You can use this subdomain.
            </div>
          ) : null}

          {isAvailable === false ? (
            <div className="rounded-2xl border border-[color:rgb(224_43_74_/_0.18)] bg-[color:rgb(224_43_74_/_0.06)] px-4 py-3 text-sm text-[var(--color-wix-red)]">
              Choose another subdomain.
            </div>
          ) : null}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
//add button create that will call api/tenant to create tenant it will use redux slice to get userid the button will replace existing checkavailability and have two jobs create tenant if subdomain available else do the error feedback
//the form should also add  name field settings for now {} is an empty object 
