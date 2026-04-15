"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cx, publicBadgeStyles, publicButtonStyles } from "./public-ui";
import { clearUser } from "@/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { persistor } from "@/redux/store/store";

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5a8 8 0 0 1 16 0" />
    </svg>
  );
}

function PlusUserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5a8 8 0 0 1 16 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 8.5v5M16.5 11h5" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v5.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h.01" />
    </svg>
  );
}

function buildTenantHomeUrl(subdomain: string) {
  return `https://${subdomain}.swish.ltd/`;
}

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const isEditorRoute = pathname === "/editor" || pathname.startsWith("/editor/");

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    dispatch(clearUser());
    persistor.purge();
    router.replace("/login");
  };

  const navLinks = user
    ? [
        {
          href: "/profile",
          label: user ? `${user.firstName} ${user.lastName}` : "Profile",
          icon: UserIcon,
        },
        { href: "/dashboard", label: "Dashboard" },
        { href: "/editor/home", label: "Editor" },
      ]
    : [
        { href: "/login", label: "Login", icon: UserIcon },
        { href: "/register", label: "Register", icon: PlusUserIcon },
        { href: "/about", label: "About", icon: InfoIcon },
      ];

  const authAction = user
    ? { label: "Logout", onClick: handleLogout }
    : null;
  const tenantHomeHref = user?.tenantSubdomain
    ? buildTenantHomeUrl(user.tenantSubdomain)
    : null;

  const isActiveLink = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={cx(isEditorRoute ? "relative" : "sticky top-0 z-50")}>
      <div className="mx-auto w-full max-w-7xl px-3 pt-2 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[30px] border border-white/72 bg-[linear-gradient(145deg,rgba(255,255,255,0.88),rgba(244,249,255,0.82))] shadow-[0_24px_64px_-46px_rgba(15,23,42,0.42)] backdrop-blur-xl">
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(56,153,236,0.45),transparent)]" />
          <div className="flex flex-col gap-3 px-4 py-3 sm:px-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <Link href="/" aria-label="Swish CMS home" className="flex items-center">
                  <Image
                    src="/logo.svg"
                    alt="Swish CMS logo"
                    width={288}
                    height={188}
                    className="h-7 w-auto sm:h-8"
                    priority
                  />
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                {user ? (
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[13px] text-[var(--color-ink-700)]">
                    <span className="inline-flex h-2 w-2 rounded-full bg-[var(--color-wix-green)]" />
                    <span className="font-medium">
                      {user.tenantSubdomain ? `${user.tenantSubdomain}.swish.ltd` : "Setup pending"}
                    </span>
                  </div>
                ) : (
                  <span className={publicBadgeStyles.slate}>Product showcase</span>
                )}
                {tenantHomeHref ? (
                  <a
                    href={tenantHomeHref}
                    target="_blank"
                    rel="noreferrer"
                    className={cx(publicButtonStyles.primary, "rounded-full px-3.5 py-2 text-[13px]")}
                  >
                    View live site
                  </a>
                ) : null}
                {authAction ? (
                  <button
                    type="button"
                    onClick={authAction.onClick}
                    className={cx(publicButtonStyles.dark, "rounded-full px-3.5 py-2 text-[13px]")}
                  >
                    {authAction.label}
                  </button>
                ) : null}
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-slate-600">
              {navLinks.map((link) => {
                const Icon = "icon" in link ? link.icon : null;
                const active = isActiveLink(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] transition motion-reduce:transition-none",
                      active
                        ? "border-[rgb(56_153_236_/_0.18)] bg-[linear-gradient(135deg,#3899ec_0%,#2f7be6_100%)] text-white shadow-[0_16px_30px_-18px_rgba(56,153,236,0.88)]"
                        : "border-white/80 bg-white/82 text-slate-700 hover:border-slate-200 hover:bg-white hover:text-slate-900",
                    )}
                  >
                    {Icon ? <Icon /> : null}
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
