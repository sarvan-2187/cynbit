import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { siteUrl } from "@/lib/site";
import "./globals.css";

// Geist (Vercel, SIL Open Font License) for all text, self-hosted by next/font as a variable font.
const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });

// Code only: the Studio mock, the BitElevate terminal and code in articles. Self-hosted by next/font.
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Pages set a bare title; the template adds the brand exactly once.
  title: {
    default: "Cynbit Technologies | AI automation and software, Jaipur",
    template: "%s | Cynbit Technologies",
  },
  description:
    "Cynbit builds AI agents, custom software platforms and growth systems for businesses. Engineering studio based in Jaipur, Rajasthan.",
  openGraph: { siteName: "Cynbit Technologies", locale: "en_IN", type: "website" },
  twitter: { card: "summary_large_image" },
};

// Marks each .reveal as it scrolls into view. Siblings without an explicit --i get one from their position,
// so groups cascade. Watches for elements added by client-side navigation. If this never runs, nothing is
// hidden, because the hiding CSS only applies under .js-reveal.
const revealScript = `(function(){
if(matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver" in window))return;
var d=document.documentElement;d.classList.add("js-reveal");
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("is-in");io.unobserve(e.target)}})},{rootMargin:"0px 0px -6% 0px",threshold:0.1});
function watch(el){if(el.classList.contains("is-in"))return;if(!el.style.getPropertyValue("--i")&&el.parentElement){var sib=[].filter.call(el.parentElement.children,function(c){return c.classList.contains("reveal")});el.style.setProperty("--i",String(Math.min(sib.indexOf(el),6)))}io.observe(el)}
function scan(root){if(root.classList&&root.classList.contains("reveal"))watch(root);if(root.querySelectorAll)[].forEach.call(root.querySelectorAll(".reveal"),watch)}
var q=[],t=0;new MutationObserver(function(ms){ms.forEach(function(m){[].forEach.call(m.addedNodes,function(n){if(n.nodeType===1)q.push(n)})});if(!t&&q.length)t=requestAnimationFrame(function(){t=0;q.splice(0).forEach(scan)})}).observe(d,{childList:true,subtree:true});
})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        {/* Apply a saved dark theme before first paint to avoid a light flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.theme==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`,
          }}
        />
        {/* Staggered reveals: see .js-reveal in globals.css. Runs before paint so nothing flashes. */}
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
