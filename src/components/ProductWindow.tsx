"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Building2, Code2, LayoutDashboard, Star } from "lucide-react";
import { Dashboard, LeadDesk, Revio, Studio, TenantEase } from "./scenes";
import { TitleBar } from "./TitleBar";

const scenes = [
  {
    tab: "AI agents",
    app: "Lead desk",
    Icon: Bot,
    Body: LeadDesk,
    lead: "Leads answered in seconds.",
    rest: "Agents reply on WhatsApp and email, qualify the enquiry and book the call while your team is offline.",
  },
  {
    tab: "Dashboards",
    app: "Operations dashboard",
    Icon: LayoutDashboard,
    Body: Dashboard,
    lead: "Every number on one screen.",
    rest: "Custom dashboards that pull sales, operations and support data together and keep it current.",
  },
  {
    tab: "Cynbit Studio",
    app: "Cynbit Studio",
    Icon: Code2,
    Body: Studio,
    lead: "Cynbit Studio.",
    rest: "Adaptive coding missions with AI code review, so students build proof of skill instead of collecting certificates.",
  },
  {
    tab: "TenantEase",
    app: "TenantEase",
    Icon: Building2,
    Body: TenantEase,
    lead: "TenantEase.",
    rest: "Properties, tenants and rent in one place, with payment reminders that go out on their own.",
  },
  {
    tab: "Revio",
    app: "Revio",
    Icon: Star,
    Body: Revio,
    lead: "Revio.",
    rest: "Reviews from Google and social in one feed, with AI-drafted replies and sentiment for every branch.",
  },
];

// Scroll-pinning only where there's room for it and the visitor hasn't asked for less motion.
const PIN = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
const NAV = 80;

export function ProductWindow() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!matchMedia(PIN).matches) return;
      const r = el.getBoundingClientRect();
      const travel = r.height - (innerHeight - NAV);
      if (travel <= 0) return;
      const p = Math.min(Math.max((NAV - r.top) / travel, 0), 0.999);
      setActive(Math.floor(p * scenes.length));
    };
    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    update();
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  function select(i: number) {
    const el = ref.current;
    if (el && matchMedia(PIN).matches) {
      const travel = el.offsetHeight - (innerHeight - NAV);
      const top = el.getBoundingClientRect().top + scrollY - NAV;
      scrollTo({ top: top + ((i + 0.5) / scenes.length) * travel, behavior: "smooth" });
    }
    setActive(i);
  }

  const scene = scenes[active];

  return (
    <section ref={ref} id="products" aria-labelledby="products-title" className="relative md:motion-safe:h-[420vh]">
      <div className="px-4 pb-16 sm:px-6 md:motion-safe:sticky md:motion-safe:top-20 md:motion-safe:flex md:motion-safe:h-[calc(100vh-5rem)] md:motion-safe:flex-col md:motion-safe:justify-center md:motion-safe:pb-0">
        <div className="mx-auto w-full max-w-7xl">
          <h2 id="products-title" className="sr-only">
            What we build, running
          </h2>

          <div role="group" aria-label="Choose what to preview" className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:justify-center">
            {scenes.map((s, i) => (
              <button
                key={s.tab}
                type="button"
                aria-pressed={i === active}
                onClick={() => select(i)}
                className={`shrink-0 rounded-full px-4 py-2 text-[15px] transition-colors ${
                  i === active
                    ? "bg-paper font-semibold text-ink"
                    : "border border-line bg-deep/95 text-mist hover:text-paper"
                }`}
              >
                {s.tab}
              </button>
            ))}
          </div>

          <div className="rise window-shadow overflow-hidden rounded-[22px] border border-line bg-deep">
            <TitleBar title={scene.app} />

            <div className="grid md:grid-cols-[64px_1fr]">
              <ul className="hidden content-start justify-items-center gap-2 border-r border-line py-3 md:grid" aria-hidden="true">
                {scenes.map(({ tab, Icon }, i) => (
                  <li
                    key={tab}
                    className={`grid size-10 place-items-center rounded-xl ${
                      i === active ? "bg-brand text-paper" : "text-dim"
                    }`}
                  >
                    <Icon size={18} strokeWidth={1.8} />
                  </li>
                ))}
              </ul>

              {/* All scenes share one grid cell so the frame keeps a stable height. */}
              {/* Small UI text reads thin at weight 400, so the mock-ups use weight 450. */}
              <div className="grid p-3 font-[450] sm:p-5 md:h-[min(62vh,600px)]">
                {scenes.map(({ tab, Body }, i) => (
                  <div
                    key={tab}
                    aria-hidden={i !== active}
                    inert={i !== active}
                    className={`[grid-area:1/1] overflow-hidden transition-[opacity,translate] duration-500 ease-out ${
                      i === active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                    }`}
                  >
                    <Body />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Keyed so the caption re-enters each time the scene changes. */}
          <p key={active} className="intro-fade mx-auto mt-5 max-w-2xl text-center text-lg leading-snug text-mist">
            <strong className="font-semibold text-paper">{scene.lead}</strong> {scene.rest}
          </p>
        </div>
      </div>
    </section>
  );
}
