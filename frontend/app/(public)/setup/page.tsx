"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import {
  DEFAULT_SETUP_TEMPLATE_ID,
  SETUP_TEMPLATE_OPTIONS,
  type SetupTemplateId,
} from "@/lib/setup-templates";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/slices/userSlice";
import {
  PageShell,
  StatusBanner,
  SurfaceCard,
  cx,
  getInputStateClass,
  publicBadgeStyles,
  publicButtonStyles,
  publicInputBaseClass,
} from "../shared/public-ui";

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

const setupSteps = [
  {
    label: "Step 01",
    title: "Choose a template",
    description: "Start from a structure that fits the kind of site you want to launch.",
  },
  {
    label: "Step 02",
    title: "Pick your subdomain",
    description: "This becomes both the workspace address and its default name.",
  },
  {
    label: "Step 03",
    title: "Create the workspace",
    description: "The workspace is created only when the address is available and valid.",
  },
];

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
  const [templateId, setTemplateId] = useState<SetupTemplateId>(DEFAULT_SETUP_TEMPLATE_ID);
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
    ? getInputStateClass(hasValidFormat && !isReserved ? "success" : "error")
    : getInputStateClass("default");

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
        `/api/tenants/availability/${encodeURIComponent(normalizedSubdomain)}`,
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
        const meResponse = await axios.get<MeResponse>("/api/users/update-user-info");
        dispatch(
          setUser({
            id: meResponse.data.id,
            firstName: meResponse.data.firstName,
            lastName: meResponse.data.lastName,
            email: meResponse.data.email,
            tenantId: meResponse.data.tenantId,
            tenantSubdomain: meResponse.data.tenantSubdomain,
          }),
        );
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
    <PageShell size="wide" className="justify-center">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-stretch">
        <SurfaceCard tone="dark" className="p-6 sm:p-8 lg:p-10">
          <div className="space-y-6">
            <span className={publicBadgeStyles.blue}>Workspace setup</span>
            <div className="space-y-4">
              <h1 className="max-w-xl text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl">
                Set up your workspace with a clear, guided flow.
              </h1>
              <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Start by choosing a template, then pick a unique subdomain. The current
                logic stays the same, but the setup experience is organized so each choice
                reads more clearly.
              </p>
            </div>

            <div className="space-y-3">
              {setupSteps.map((step) => (
                <div
                  key={step.label}
                  className="rounded-[24px] border border-white/10 bg-white/6 px-4 py-4"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-200">
                    {step.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">{step.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard tone="hero" className="px-6 py-7 sm:px-8 sm:py-9">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <span className={publicBadgeStyles.slate}>Template and subdomain</span>
              <h2 className="text-2xl font-semibold tracking-[-0.05em] text-[var(--color-deep-navy)] sm:text-3xl">
                Create the workspace
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-[var(--color-ink-700)]">
                Choose a starter template, then enter the subdomain that will anchor the
                workspace. The selected template still seeds the same starter pages as before.
              </p>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-[var(--color-ink-900)]">
                Starter template
              </p>
              <div className="grid gap-4 lg:grid-cols-2">
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
                      className={cx(
                        "rounded-[26px] border p-4 text-left transition motion-reduce:transition-none",
                        isSelected
                          ? "border-[var(--color-wix-blue)] bg-[color:rgb(56_153_236_/_0.08)] shadow-[0_18px_36px_-30px_rgba(56,153,236,0.52)]"
                          : "border-slate-200/80 bg-white/90 hover:border-[var(--color-wix-blue)]",
                      )}
                    >
                      <div className="mb-4 overflow-hidden rounded-[20px] border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f7fafc_100%)]">
                        <Image
                          src={template.previewImage}
                          alt={`${template.label} template preview`}
                          width={960}
                          height={640}
                          className="block h-auto w-full"
                        />
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-[var(--color-ink-900)]">
                            {template.label}
                          </p>
                          <p className="mt-1 text-sm leading-6 text-[var(--color-ink-700)]">
                            {template.description}
                          </p>
                          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-500)]">
                            {template.audience}
                          </p>
                        </div>
                        {isSelected ? (
                          <span className={publicBadgeStyles.blue}>Selected</span>
                        ) : null}
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-sm text-[var(--color-ink-500)]">
                Your selected template seeds a different starter page set for the new workspace.
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
                className={cx(publicInputBaseClass, inputStateClass)}
              />
              <p className="mt-2 text-sm text-[var(--color-ink-500)]">
                Use lowercase letters, numbers, and hyphens. Avoid reserved names like
                `www`, `app`, and `api`.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={cx(
                publicButtonStyles.primary,
                "w-full disabled:cursor-not-allowed disabled:opacity-70",
              )}
            >
              {isSubmitting ? "Creating workspace..." : "Create workspace"}
            </button>

            {message ? (
              <StatusBanner tone={isError ? "error" : "success"}>{message}</StatusBanner>
            ) : null}

            {isAvailable === true ? (
              <StatusBanner tone="success">You can use this subdomain.</StatusBanner>
            ) : null}

            {isAvailable === false ? (
              <StatusBanner tone="error">Choose another subdomain.</StatusBanner>
            ) : null}
          </form>
        </SurfaceCard>
      </section>
    </PageShell>
  );
}
