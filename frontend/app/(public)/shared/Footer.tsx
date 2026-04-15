import { ActionLink, publicSurfaceStyles } from "./public-ui";

function FooterIconFrame({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-[16px] border border-white/12 bg-white/8 text-sky-100">
      {children}
    </span>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.5 2.6 3.9 5.8 3.9 9s-1.4 6.4-3.9 9c-2.5-2.6-3.9-5.8-3.9-9S9.5 5.6 12 3Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
      <path d="M6.94 8.5H3.56V20h3.38V8.5Zm-1.69-1.56a1.96 1.96 0 1 0 0-3.92 1.96 1.96 0 0 0 0 3.92ZM20 20h-3.37v-5.57c0-1.33-.03-3.04-1.86-3.04-1.87 0-2.16 1.45-2.16 2.95V20H9.24V8.5h3.23v1.57h.05c.45-.85 1.55-1.75 3.2-1.75 3.42 0 4.05 2.25 4.05 5.18V20Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.18-3.37-1.18-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.54 1.03 1.54 1.03.9 1.52 2.35 1.08 2.92.82.09-.64.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.92 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.84c.85 0 1.71.11 2.5.33 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.82-2.34 4.67-4.57 4.92.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6.5h16v11H4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 8 7 5 7-5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.8 3.5h2.6l1.3 4.2-1.7 1.7a15.1 15.1 0 0 0 5.6 5.6l1.7-1.7 4.2 1.3v2.6c0 .8-.6 1.4-1.4 1.4A15.6 15.6 0 0 1 5.4 4.9c0-.8.6-1.4 1.4-1.4Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="pb-4 pt-2">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`${publicSurfaceStyles.dark} overflow-hidden px-5 py-6 sm:px-6`}>
          <div className="mx-auto max-w-4xl text-center">
            <div className="space-y-5">
              <span className="inline-flex items-center rounded-full border border-white/14 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-200">
                Built by Mouad Hamideddine
              </span>

              <div className="space-y-3">
                <p className="text-2xl font-semibold tracking-[-0.05em] text-white sm:text-3xl">
                  Connect with the builder behind Swish CMS.
                </p>
                <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Portfolio, socials, and direct contact are all here in one place.
                </p>
              </div>

              <div className="mx-auto max-w-sm">
                <ActionLink
                  href="https://moad.dev"
                  target="_blank"
                  rel="noreferrer"
                  variant="special"
                  className="w-full gap-2"
                >
                  <GlobeIcon />
                  Visit moad.dev
                </ActionLink>
              </div>

              <div className="grid gap-3 text-left sm:grid-cols-2">
                <a
                  href="https://www.linkedin.com/in/mouad-hamideddine/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[22px] border border-white/10 bg-white/6 px-4 py-4 transition hover:border-white/18 hover:bg-white/9"
                >
                  <div className="flex items-start gap-3">
                    <FooterIconFrame>
                      <LinkedInIcon />
                    </FooterIconFrame>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-200">
                        LinkedIn
                      </p>
                      <p className="mt-2 text-sm text-white">mouad-hamideddine</p>
                    </div>
                  </div>
                </a>

                <a
                  href="https://github.com/hamideddinemouad"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[22px] border border-white/10 bg-white/6 px-4 py-4 transition hover:border-white/18 hover:bg-white/9"
                >
                  <div className="flex items-start gap-3">
                    <FooterIconFrame>
                      <GitHubIcon />
                    </FooterIconFrame>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-200">
                        GitHub
                      </p>
                      <p className="mt-2 text-sm text-white">hamideddinemouad</p>
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:hamideddinemouad@gmail.com"
                  className="rounded-[22px] border border-white/10 bg-white/6 px-4 py-4 transition hover:border-white/18 hover:bg-white/9"
                >
                  <div className="flex items-start gap-3">
                    <FooterIconFrame>
                      <MailIcon />
                    </FooterIconFrame>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-200">
                        Email
                      </p>
                      <p className="mt-2 text-sm text-white">hamideddinemouad@gmail.com</p>
                    </div>
                  </div>
                </a>

                <a
                  href="tel:+212637275511"
                  className="rounded-[22px] border border-white/10 bg-white/6 px-4 py-4 transition hover:border-white/18 hover:bg-white/9"
                >
                  <div className="flex items-start gap-3">
                    <FooterIconFrame>
                      <PhoneIcon />
                    </FooterIconFrame>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-200">
                        Phone
                      </p>
                      <p className="mt-2 text-sm text-white">0637.27.55.11</p>
                    </div>
                  </div>
                </a>
              </div>

              <p className="text-sm text-slate-300">© 2026 Swish CMS showcase MVP.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
