"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearUser } from "@/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { persistor } from "@/redux/store/store";

export function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    dispatch(clearUser());
    await persistor.purge();
    router.push("/login");
    router.refresh();
  };

  const navLinks = user
    ? [
        {
          href: "/profile",
          label: user ? `${user.firstName} ${user.lastName}` : "Profile",
        },
        { href: "/dashboard", label: "Dashboard" },
      ]
    : [
        { href: "/login", label: "Login" },
        { href: "/register", label: "Register" },
        { href: "/about", label: "about" },
        { href: "/explore", label: "explore" },
      ];

  const authAction = user
    ? { label: "Logout", onClick: handleLogout }
    : null;

  return (
    <header className="sticky top-0 z-50 border-b border-[color:rgb(146_146_146_/_0.18)] bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
        <Link href="/" aria-label="Swish CMS home" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Swish CMS logo"
            width={288}
            height={188}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <nav className="flex items-center gap-3 text-sm font-medium text-[var(--color-ink-700)] sm:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 hover:text-[var(--color-wix-blue)]"
            >
              {link.label}
            </Link>
          ))}
          {authAction ? (
            <button
              type="button"
              onClick={authAction.onClick}
              className="rounded-full px-3 py-2 hover:text-[var(--color-wix-blue)]"
            >
              {authAction.label}
            </button>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
