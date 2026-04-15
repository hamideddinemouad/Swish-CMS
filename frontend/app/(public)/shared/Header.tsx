"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-6xl px-3 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 rounded-[28px] border border-slate-200/80 bg-white/90 px-4 py-3 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.45)] backdrop-blur sm:px-5 md:flex-row md:items-center md:justify-between">
          <Link href="/" aria-label="Swish CMS home" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Swish CMS logo"
              width={288}
              height={188}
              className="h-8 w-auto sm:h-9"
              priority
            />
          </Link>

          <nav className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-600 md:justify-end">
            {navLinks.map((link) => {
              const Icon = "icon" in link ? link.icon : null;
              const active = isActiveLink(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 transition-colors ${
                    active
                      ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {Icon ? <Icon /> : null}
                  <span>{link.label}</span>
                </Link>
              );
            })}
            {tenantHomeHref ? (
              <a
                href={tenantHomeHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[color:rgb(56_153_236_/_0.32)] bg-[linear-gradient(135deg,#4fa8ff_0%,#3899ec_45%,#7cc6ff_100%)] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_0_1px_rgb(56_153_236_/_0.14),0_18px_40px_rgb(56_153_236_/_0.3),0_0_32px_rgb(124_198_255_/_0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgb(56_153_236_/_0.18),0_24px_48px_rgb(56_153_236_/_0.34),0_0_40px_rgb(124_198_255_/_0.42)]"
              >
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#ff4d5e] shadow-[0_0_12px_rgb(255_77_94_/_0.95)]" />
                <span>View</span>
                <span className="text-[#ffdde1]">LIVE</span>
                <span>site</span>
              </a>
            ) : null}
            {authAction ? (
              <button
                type="button"
                onClick={authAction.onClick}
                className="rounded-full border border-slate-900 bg-slate-900 px-3.5 py-2 text-white transition-colors hover:bg-slate-800"
              >
                {authAction.label}
              </button>
            ) : null}
          </nav>
        </div>
      </div>
    </header>
  );
}
