"use client";

import axios from "axios";
import { useState, type ChangeEvent, type SubmitEvent } from "react";

type AvailabilityResponse = {
  available: boolean;
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
  const [subdomain, setSubdomain] = useState("");
  const [touched, setTouched] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const normalizedSubdomain = normalizeSubdomain(subdomain);
  const hasValidFormat = isValidSubdomain(normalizedSubdomain);
  const isReserved = isReservedSubdomain(normalizedSubdomain);
  const showValidation = touched && normalizedSubdomain.length > 0;
  const inputStateClass = showValidation
    ? hasValidFormat && !isReserved
      ? "border-[var(--color-wix-green)] bg-[color:rgb(96_188_87_/_0.05)]"
      : "border-[var(--color-wix-red)] bg-[color:rgb(224_43_74_/_0.05)]"
    : "border-[color:rgb(146_146_146_/_0.28)] bg-white";

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextValue = event.currentTarget.value;
    setSubdomain(nextValue);

    if (isAvailable !== null || message) {
      setIsAvailable(null);
      setMessage("");
      setIsError(false);
    }
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    setMessage("");
    setIsError(false);
    setIsAvailable(null);

    if (!normalizedSubdomain) {
      setMessage("Enter a subdomain to check.");
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
    //

    setIsChecking(true);

    try {
      const response = await axios.get<AvailabilityResponse>(
        `/api/tenants/availability/${encodeURIComponent(normalizedSubdomain)}`
      );

      if (response.status >= 200 && response.status < 300) {
        setIsAvailable(response.data.available);
        setMessage(
          response.data.available
            ? `${normalizedSubdomain} is available.`
            : `${normalizedSubdomain} is already taken.`
        );
        setIsError(!response.data.available);
      }
    } catch (error) {
      setIsError(true);

      if (axios.isAxiosError<{ message?: string }>(error)) {
        setMessage(error.response?.data?.message ?? "Availability check failed");
      } else {
        setMessage("Availability check failed");
      }
    } finally {
      setIsChecking(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-md rounded-[28px] border border-[color:rgb(146_146_146_/_0.18)] bg-white p-8 shadow-[0_20px_50px_rgb(54_54_54_/_0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">
          Setup
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--color-ink-900)]">
          Choose your subdomain
        </h1>
        <p className="mt-4 text-sm leading-7 text-[var(--color-ink-700)]">
          Pick a unique tenant subdomain and check if it is available before you continue.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
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
              className={`w-full rounded-2xl border px-4 py-3 text-sm text-[var(--color-ink-900)] outline-none ring-0 transition focus:border-[var(--color-wix-blue)] ${inputStateClass}`}
            />
            <p className="mt-2 text-sm text-[var(--color-ink-500)]">
              Use lowercase letters, numbers, and hyphens only. Reserved values like
              www and api are not allowed.
            </p>
          </div>

          <button
            type="submit"
            disabled={isChecking}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--color-wix-blue)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgb(56_153_236_/_0.18)] hover:bg-[#2f8fe2] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isChecking ? "Checking..." : "Check availability"}
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
//add button create that will call api/route to create tenant