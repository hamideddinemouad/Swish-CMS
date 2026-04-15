"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setUser, type User } from "@/redux/slices/userSlice";
import {
  StatusBanner,
  cx,
  publicBadgeStyles,
  publicButtonStyles,
} from "./public-ui";

type DemoResponse = {
  message?: string;
  user: User;
};

type InstantDemoButtonProps = {
  label?: string;
  loadingLabel?: string;
  disabled?: boolean;
  className?: string;
  showMessage?: boolean;
  messageClassName?: string;
};

const demoHighlights = [
  {
    label: "Fresh account",
    value: "A new test user is generated every time.",
  },
  {
    label: "Instant access",
    value: "You skip manual signup and land in setup faster.",
  },
  {
    label: "Your choice",
    value: "The subdomain is still yours to choose on the next step.",
  },
];

function useInstantDemoLaunch() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleStartDemo() {
    setIsLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const response = await axios.post<DemoResponse>("/api/auth/demo");

      dispatch(setUser(response.data.user));
      router.replace("/setup");
    } catch (error) {
      setIsError(true);

      if (axios.isAxiosError<{ message?: string }>(error)) {
        setMessage(
          error.response?.data?.message ??
            "Could not prepare the recruiter demo account."
        );
      } else {
        setMessage("Could not prepare the recruiter demo account.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return {
    handleStartDemo,
    isLoading,
    isError,
    message,
  };
}

export function InstantDemoButton({
  label = "Launch Instant Demo",
  loadingLabel = "Preparing your instant demo...",
  disabled = false,
  className,
  showMessage = false,
  messageClassName,
}: InstantDemoButtonProps) {
  const { handleStartDemo, isLoading, isError, message } = useInstantDemoLaunch();

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleStartDemo}
        disabled={disabled || isLoading}
        className={cx(
          className,
          publicButtonStyles.special,
          "disabled:cursor-not-allowed disabled:opacity-70",
        )}
      >
        {isLoading ? loadingLabel : label}
      </button>

      {showMessage && message ? (
        <StatusBanner
          aria-live="polite"
          tone={isError ? "error" : "info"}
          className={messageClassName}
        >
          {message}
        </StatusBanner>
      ) : null}
    </div>
  );
}

export function RecruiterDemoAccess({
  disabled = false,
  className,
}: {
  disabled?: boolean;
  className?: string;
}) {

  return (
    <div
      className={cx(
        "relative isolate overflow-hidden rounded-[34px] border border-[rgb(56_153_236_/_0.2)] bg-[linear-gradient(135deg,#09152b_0%,#0e3263_45%,#eef6ff_145%)] p-[1px] shadow-[0_36px_100px_-44px_rgba(15,23,42,0.78)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute -left-12 top-0 h-40 w-40 rounded-full bg-[rgb(56_153_236_/_0.3)] blur-3xl motion-safe:animate-pulse motion-reduce:animate-none" />
      <div className="pointer-events-none absolute -bottom-16 right-0 h-44 w-44 rounded-full bg-[rgb(251_125_51_/_0.22)] blur-3xl motion-safe:animate-pulse motion-reduce:animate-none" />

      <div className="relative rounded-[33px] bg-[linear-gradient(145deg,rgba(7,18,40,0.98),rgba(14,47,94,0.95)_48%,rgba(245,250,255,0.98)_150%)] px-5 py-5 sm:px-7 sm:py-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-end">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className={publicBadgeStyles.orange}>Featured demo path</span>
              <span
                className={cx(
                  publicBadgeStyles.green,
                  "border-white/16 bg-white/10 text-sky-100",
                )}
              >
                Fastest way in
              </span>
            </div>

            <div className="space-y-3">
              <p className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.07em] text-white sm:text-4xl">
                Enter Swish in one click.
              </p>
              <p className="max-w-2xl text-sm leading-7 text-sky-50/88 sm:text-base">
                Skip the form-filling. This creates a fresh demo account, signs in
                automatically, and sends you straight to setup so you can choose the
                subdomain yourself.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {demoHighlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[22px] border border-white/14 bg-white/10 px-4 py-4 backdrop-blur"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-100">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-100/88">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <p className="max-w-2xl text-xs leading-6 text-sky-100/78 sm:text-sm">
              The demo login is generated as{" "}
              <span className="font-semibold text-white">
                testuserxxxxx@email.com
              </span>{" "}
              and that same value is used as the password for the session.
            </p>
          </div>

          <div className="space-y-3 lg:pl-2">
            <div className="rounded-[26px] border border-white/14 bg-white/10 p-3 shadow-[0_18px_48px_-34px_rgba(15,23,42,0.78)] backdrop-blur-md">
              <InstantDemoButton
                disabled={disabled}
                className="min-h-[3.75rem] w-full cursor-pointer rounded-[22px] px-6 text-base shadow-[0_24px_50px_-24px_rgba(56,153,236,0.98)] ring-1 ring-white/24 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(125_211_252_/_0.42)]"
                showMessage
                messageClassName="mt-4"
              />

              <p className="mt-3 text-xs leading-6 text-slate-100/84">
                Best for reviewers who want the full onboarding flow without manual
                account setup.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
