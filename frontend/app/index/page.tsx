"use client";

import { FormEvent, useState } from "react";

type AuthResponse = {
  accessToken: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Idle");
  const [result, setResult] = useState<AuthResponse | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Logging in...");
    setResult(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setStatus(data?.message ?? "Login failed");
        return;
      }

      setResult(data);
      setStatus("Login succeeded. Check the browser cookies for refreshToken.");
    } catch {
      setStatus("Request failed");
    }
  }

  async function handleRefresh() {
    setStatus("Refreshing...");

    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setStatus(data?.message ?? "Refresh failed");
        return;
      }

      setResult(data);
      setStatus("Refresh succeeded. The cookie was sent with the request.");
    } catch {
      setStatus("Request failed");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-4 rounded border p-4">
        <h1 className="text-lg font-semibold">Login test</h1>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            className="w-full rounded border px-3 py-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="w-full rounded border px-3 py-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="w-full rounded border px-3 py-2" type="submit">
            Login
          </button>
        </form>

        <button
          className="w-full rounded border px-3 py-2"
          type="button"
          onClick={handleRefresh}
        >
          Test refresh cookie
        </button>

        <p className="text-sm">{status}</p>

        {result ? (
          <pre className="overflow-x-auto rounded border p-3 text-xs">
            {JSON.stringify(result, null, 2)}
          </pre>
        ) : null}
      </div>
    </main>
  );
}
