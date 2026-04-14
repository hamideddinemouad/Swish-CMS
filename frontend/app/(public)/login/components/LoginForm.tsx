"use client";

import axios from "axios";
import { setUser, type User } from "@/redux/slices/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import {
  type ChangeEvent,
  type FocusEvent,
  type SubmitEvent,
  useState,
} from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email: string) {
  return EMAIL_REGEX.test(email);
}

type LoginResponse = {
  accessToken: string;
  user: User;
  message?: string;
};

export function LoginForm() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const showEmailValidation = emailTouched && !isEmailFocused;
  const emailIsValid = isValidEmail(email);
  const emailInputStateClass = showEmailValidation
    ? emailIsValid
      ? "border-[var(--color-wix-green)] bg-[color:rgb(96_188_87_/_0.05)]"
      : "border-[var(--color-wix-red)] bg-[color:rgb(224_43_74_/_0.05)]"
    : "border-[color:rgb(146_146_146_/_0.28)] bg-white";

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.currentTarget.value);
  }

  function handleEmailFocus() {
    setIsEmailFocused(true);
  }

  function handleEmailBlur(event: FocusEvent<HTMLInputElement>) {
    setIsEmailFocused(false);
    setEmailTouched(true);
    setEmail(event.currentTarget.value.trim());
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsError(false);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await axios.post<LoginResponse>("/api/auth/login", {
        email,
        password,
      });

      if (response.status >= 200 && response.status < 300) {
        dispatch(setUser(response.data.user));
        setMessage(response.data?.message ?? "Login successful");
      }
    } catch (error) {
      setIsError(true);

      if (axios.isAxiosError<{ message?: string }>(error)) {
        setMessage(error.response?.data?.message ?? "Login failed");
        return;
      }

      setMessage("Login failed");
    }
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-[var(--color-ink-900)]"
        >
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={handleEmailChange}
          onFocus={handleEmailFocus}
          onBlur={handleEmailBlur}
          aria-invalid={showEmailValidation && !emailIsValid}
          placeholder="name@company.com"
          className={`w-full rounded-2xl border px-4 py-3 text-sm text-[var(--color-ink-900)] outline-none ring-0 transition focus:border-[var(--color-wix-blue)] ${emailInputStateClass}`}
          required
        />
        {showEmailValidation ? (
          <p
            className={`mt-2 text-sm ${
              emailIsValid
                ? "text-[var(--color-wix-green)]"
                : "text-[var(--color-wix-red)]"
            }`}
          >
            {emailIsValid ? "Email looks good." : "Enter a valid email address."}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-semibold text-[var(--color-ink-900)]"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          className="w-full rounded-2xl border border-[color:rgb(146_146_146_/_0.28)] bg-white px-4 py-3 text-sm text-[var(--color-ink-900)] outline-none ring-0 transition focus:border-[var(--color-wix-blue)]"
          required
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--color-wix-blue)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgb(56_153_236_/_0.18)] hover:bg-[#2f8fe2]"
      >
        Sign in
      </button>

      {message ? (
        <p
          aria-live="polite"
          className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${
            isError
              ? "border-[color:rgb(224_43_74_/_0.18)] bg-[color:rgb(224_43_74_/_0.06)] text-[var(--color-wix-red)]"
              : "border-[color:rgb(56_153_236_/_0.18)] bg-[color:rgb(56_153_236_/_0.07)] text-[var(--color-ink-700)]"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
