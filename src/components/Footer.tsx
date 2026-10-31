import Link from "next/link";
import { NewsletterForm } from "@/components/forms";
import { Logo } from "@/components/Logo";
import { LIVE, contact, tel } from "@/lib/site";

const columns = [
  {
    title: "Company",
    links: [
      ["Our story", "/story"],
      ["Team", "/team"],
      ["Careers", "/careers"],
      ["Social impact", "/impact"],
    ],
  },
  {
    title: "Expertise",
    links: [
      ["Services", "/services"],
      ["Products", "/products"],
      ["Case studies", "/case-studies"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Learn",
    links: [
      ["BitElevate", "/bitelevate"],
      ["Career paths", `${LIVE}/bitelevate/paths`],
      ["Blog", "/blog"],
      ["Student diaries", `${LIVE}/diaries`],
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-10 pt-16 sm:px-6 lg:grid-cols-[1.3fr_2fr]">
        <div className="grid content-start gap-8">
          <Logo className="h-10 text-teal" />
          <address className="grid gap-1 text-[15px] not-italic text-mist">
            <a href={`mailto:${contact.email}`} className="hover:text-paper">
              {contact.email}
            </a>
            {contact.phones.map((p) => (
              <a key={p} href={tel(p)} className="hover:text-paper">
                {p}
              </a>
            ))}
            <span className="mt-2">{contact.address}</span>
          </address>
          <div className="max-w-sm">
            <NewsletterForm />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-[15px] font-semibold">{col.title}</h2>
              <ul className="mt-4 grid gap-3 text-[15px] text-mist">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="hover:text-paper">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Decorative wordmark drawn as SVG: it's an image of the name, not readable text. */}
      <svg aria-hidden="true" viewBox="0 0 1000 190" className="wordmark mx-auto block w-full max-w-6xl px-4 sm:px-6">
        <text x="0" y="172" textLength="1000" lengthAdjust="spacingAndGlyphs" fontSize="230" fontWeight="800">
          CYNBIT
        </text>
      </svg>

      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 border-t border-line px-4 py-6 text-sm text-dim sm:px-6">
        <p>© {new Date().getFullYear()} Cynbit Technologies</p>
        <ul className="flex gap-5">
          <li><a href={`${LIVE}/privacy`} className="hover:text-paper">Privacy</a></li>
          <li><a href={`${LIVE}/terms`} className="hover:text-paper">Terms</a></li>
          <li><a href={`${LIVE}/cookies`} className="hover:text-paper">Cookies</a></li>
        </ul>
      </div>
    </footer>
  );
}
