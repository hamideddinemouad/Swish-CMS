"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
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
  const [name, setName] = useState("");
  const [touched, setTouched] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const normalizedSubdomain = normalizeSubdomain(subdomain);
  const normalizedName = name.trim();
  const userId = currentUser?.id ?? null;
  const hasValidFormat = isValidSubdomain(normalizedSubdomain);
  const isReserved = isReservedSubdomain(normalizedSubdomain);
  const showValidation = touched && normalizedSubdomain.length > 0;
  const showNameValidation = nameTouched;
  const hasValidName = normalizedName.length > 0;
  const inputStateClass = showValidation
    ? hasValidFormat && !isReserved
      ? "border-[var(--color-wix-green)] bg-[color:rgb(96_188_87_/_0.05)]"
      : "border-[var(--color-wix-red)] bg-[color:rgb(224_43_74_/_0.05)]"
    : "border-[color:rgb(146_146_146_/_0.28)] bg-white";
  const nameInputStateClass = showNameValidation
    ? hasValidName
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

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.currentTarget.value);
    resetFeedback();
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    setNameTouched(true);
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

    if (!hasValidName) {
      setMessage("Enter a tenant name.");
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
        name: normalizedName,
        userId,
        settings: {},
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
      <section className="w-full max-w-md rounded-[28px] border border-[color:rgb(146_146_146_/_0.18)] bg-white/92 p-6 shadow-[0_20px_50px_rgb(54_54_54_/_0.08)] backdrop-blur sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
          Workspace setup
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink-900)] sm:text-3xl">
          Set up your workspace
        </h1>
        <p className="mt-4 text-sm leading-7 text-[var(--color-ink-700)]">
          Choose a workspace name and a unique subdomain. We’ll check availability before
          creating it.
        </p>

        <form className="mt-7 space-y-5 sm:mt-8" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-[var(--color-ink-900)]"
            >
              Tenant name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              onBlur={() => setNameTouched(true)}
              placeholder="Acme Studio"
              autoComplete="off"
              spellCheck={false}
              required
              className={`w-full rounded-2xl border px-4 py-3 text-sm text-[var(--color-ink-900)] outline-none ring-0 transition focus:border-[var(--color-wix-blue)] ${nameInputStateClass}`}
            />
            <p className="mt-2 text-sm text-[var(--color-ink-500)]">
              This is the name people will see for your workspace.
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
      </section>
    </main>
  );
}
//add button create that will call api/tenant to create tenant it will use redux slice to get userid the button will replace existing checkavailability and have two jobs create tenant if subdomain available else do the error feedback
//the form should also add  name field settings for now {} is an empty object 
