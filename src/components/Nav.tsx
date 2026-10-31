"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { nav } from "@/lib/site";

// Floating glass bar. It takes up 68px at the top of the page (12px gap + 56px bar).
export function Nav() {
  const path = usePathname();
  const current = (href: string) => (path === href || path.startsWith(`${href}/`) ? "page" : undefined);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-full border border-line bg-ink/80 pl-5 pr-2 shadow-[0_12px_32px_-16px_rgb(0_0_0/0.3)] backdrop-blur-lg">
        <Link href="/" aria-label="Cynbit Technologies home" className="shrink-0 text-teal">
          <Logo className="h-8" />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1 text-[15px] text-mist">
            {nav.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  aria-current={current(l.href)}
                  className="rounded-full px-3 py-1.5 transition-colors hover:bg-paper/5 hover:text-paper aria-[current=page]:bg-paper/8 aria-[current=page]:text-paper"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden h-10 items-center rounded-full bg-teal px-4 text-[15px] font-semibold text-ink transition-colors hover:bg-paper sm:flex"
          >
            Start a project
          </Link>

          {/* Mobile menu without extra JS: native disclosure. */}
          <details className="relative md:hidden">
            <summary
              aria-label="Menu"
              className="grid size-10 place-items-center rounded-full border border-line text-paper"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </summary>
            <ul className="absolute right-0 top-13 w-60 rounded-3xl border border-line bg-deep p-2 shadow-2xl">
              {nav.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    aria-current={current(l.href)}
                    className="block rounded-2xl px-4 py-3 text-paper hover:bg-panel aria-[current=page]:text-teal"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="mt-1 border-t border-line pt-2">
                <Link href="/contact" className="block rounded-2xl bg-teal px-4 py-3 font-semibold text-ink">
                  Start a project
                </Link>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </header>
  );
}
