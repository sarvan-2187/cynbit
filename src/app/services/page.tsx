import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageIntro } from "@/components/PageIntro";
import { stack, steps } from "@/content/company";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI agents and automation, custom software and cloud, and growth engineering from Cynbit Technologies in Jaipur.",
  alternates: { canonical: "/services" },
};

const areas = [
  {
    id: "ai",
    title: "AI agents and automation",
    lead: "Assistants that do the work, not chatbots that answer questions. We build agents and automation that plug into the tools your team already uses.",
    items: [
      ["Autonomous agents", "AI assistants that reply to leads, qualify them and coordinate follow-ups."],
      ["LLM automation", "Document handling and data entry done by language models, with a person checking what matters."],
      ["AI voice agents", "Phone and voice assistants that handle routine calls and hand over the rest."],
      ["AI in your existing stack", "Adding AI features to the CRM, helpdesk or SaaS product you already run."],
    ],
  },
  {
    id: "software",
    title: "Software and cloud",
    lead: "Web and mobile products, the backends behind them, and the cloud they run on, built to stay up and stay maintainable.",
    items: [
      ["Full-stack development", "Web and mobile platforms built with React, Next.js, Node.js and Python."],
      ["Backend systems", "APIs and services designed for 99.9% uptime and predictable performance."],
      ["Cloud infrastructure", "Deployments on AWS and Azure with zero-trust security from day one."],
      ["Legacy migration", "Breaking old monoliths into systems your team can change without fear."],
    ],
  },
  {
    id: "growth",
    title: "Growth and SEO",
    lead: "Marketing that's engineered and measured: technical SEO, paid acquisition and the automation that turns leads into customers.",
    items: [
      ["Performance ads", "Google and Meta campaigns run against lead cost and revenue, not impressions."],
      ["Technical SEO", "Site speed, structure and content fixes that help you rank and stay ranked."],
      ["CRM automation", "Follow-up sequences that nurture leads without anyone copying and pasting."],
      ["Funnel optimisation", "Landing pages tested and improved based on how visitors actually behave."],
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        title="What we build"
        dim="and keep running after launch."
        lead="Cynbit works across three areas. Most projects touch two or three of them, so one team owns the whole thing."
      >
        {areas.map((a) => (
          <a
            key={a.id}
            href={`#${a.id}`}
            className="rounded-full border border-line px-5 py-2.5 font-semibold transition-colors hover:border-teal hover:text-teal"
          >
            {a.title}
          </a>
        ))}
      </PageIntro>

      {areas.map((area) => (
        <section
          key={area.id}
          id={area.id}
          aria-labelledby={`${area.id}-title`}
          className="mx-auto grid max-w-6xl scroll-mt-20 gap-10 border-t border-line px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-[1fr_1.4fr]"
        >
          <div className="reveal lg:sticky lg:top-28 lg:self-start">
            <h2 id={`${area.id}-title`} className="text-title font-semibold text-balance">
              {area.title}
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-mist">{area.lead}</p>
          </div>
          <ul className="border-t border-line">
            {area.items.map(([name, body], i) => (
              <li key={name} style={{ "--i": i } as React.CSSProperties} className="reveal border-b border-line py-7">
                <h3 className="text-xl font-semibold tracking-tight">{name}</h3>
                <p className="mt-2 max-w-xl leading-relaxed text-mist">{body}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section aria-labelledby="stack-title" className="border-y border-line bg-deep">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <h2 id="stack-title" className="reveal text-title font-semibold">
            Tools we work with
          </h2>
          <p className="reveal mt-5 max-w-xl text-lg leading-relaxed text-mist">
            Proven, widely used technology, so the next team to touch your code can hire for it.
          </p>
          <dl className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {Object.entries(stack).map(([group, tools], i) => (
              <div key={group} style={{ "--i": i } as React.CSSProperties} className="reveal border-t border-line pt-5">
                <dt className="font-semibold">{group}</dt>
                {tools.map((t) => (
                  <dd key={t} className="mt-2 text-mist">
                    {t}
                  </dd>
                ))}
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="process-title" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <h2 id="process-title" className="reveal text-title font-semibold">
          How a project runs
        </h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
          {steps.map(([title, body], i) => (
            <li key={title} style={{ "--i": i } as React.CSSProperties} className="reveal border-t border-line pt-5">
              <span className="text-sm text-teal">Step {i + 1}</span>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 leading-relaxed text-mist">{body}</p>
            </li>
          ))}
        </ol>
        <p className="reveal mt-12 text-mist">
          Want to see the result first?{" "}
          <Link href="/case-studies" className="font-semibold text-teal hover:underline">
            Browse our case studies
          </Link>
          .
        </p>
      </section>

      <CtaBand />
    </>
  );
}
