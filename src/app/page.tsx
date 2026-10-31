import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { ProductWindow } from "@/components/ProductWindow";
import { SkyCanvas } from "@/components/SkyCanvas";
import { founders, stack, steps, story } from "@/content/company";
import { LIVE, contact } from "@/lib/site";

const services = [
  {
    span: "md:col-span-4",
    lead: "AI automation.",
    rest: "Agents and LLM workflows that take repetitive work off your team: lead replies, document extraction, support triage, voice agents.",
    visual: "flow",
  },
  {
    span: "md:col-span-2",
    lead: "Software and cloud.",
    rest: "Web and mobile platforms, backends built for 99.9% uptime, and migrations to AWS or Azure.",
    visual: "uptime",
  },
  {
    span: "md:col-span-3",
    lead: "Growth and SEO.",
    rest: "Technical SEO, performance ads and CRM automation, measured against the numbers you already report.",
    visual: "growth",
  },
  {
    span: "md:col-span-3",
    lead: "The stack we work in.",
    rest: "We pick boring, proven tools and keep your code in your repository.",
    visual: "stack",
  },
] as const;

const stackList = Object.values(stack).flat();

const stats = [
  ["98%", "client retention"],
  ["24/7", "production support"],
  ["3x", "average ROI uplift"],
  ["99.9%", "system stability"],
];

const work = [
  {
    client: "Marketing Addict",
    project: "AI-powered campaign optimisation for a global marketing agency",
    result: "+40% organic leads",
    slug: "marketing-addict-ai-optimization",
  },
  {
    client: "Evento",
    project: "Real-time ticketing that holds up during major on-sales",
    result: "50K+ users, no added latency",
    slug: "evento-ticketing-scalability",
  },
  {
    client: "Urban Wardrobe",
    project: "AR virtual try-on for a fashion retailer",
    result: "99.9% uptime",
    slug: "urban-wardrobe-ar-integration",
  },
];

const faqs = [
  [
    "How do we start a project with Cynbit?",
    "Send the project form or call us. We reply within 24 hours and set up a discovery call to understand your workflows before proposing anything.",
  ],
  [
    "Do you build custom AI automation?",
    "Yes. We build AI agents, LLM workflows and voice agents, and connect them to the tools you already use, such as your CRM, WhatsApp or helpdesk.",
  ],
  [
    "Can you work with our existing system?",
    "Yes. We modernise legacy systems, migrate them to AWS or Azure, and extend codebases built by other teams.",
  ],
  [
    "Where is Cynbit based?",
    "Our engineering team works from Pratap Nagar, Jaipur. We work with clients across India and abroad.",
  ],
  [
    "Can I join BitElevate?",
    "BitElevate is open to students and early-career developers. Tracks, fees and enrolment are on the BitElevate page.",
  ],
];

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cynbit Technologies",
  url: LIVE,
  logo: `${LIVE}/logo.svg`,
  email: contact.email,
  telephone: contact.phones[0],
  address: {
    "@type": "PostalAddress",
    streetAddress: "32/115 Pratap Nagar",
    addressLocality: "Jaipur",
    addressRegion: "Rajasthan",
    postalCode: "302033",
    addressCountry: "IN",
  },
};

// Stagger index for the scroll-reveal animation in globals.css.
const at = (i: number) => ({ "--i": i }) as React.CSSProperties;

function SectionHead({ id, title, children }: { id: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="reveal max-w-3xl">
      <h2 id={id} className="text-title font-semibold">
        {title}
      </h2>
      {children && <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist">{children}</p>}
    </div>
  );
}

function ServiceVisual({ kind }: { kind: (typeof services)[number]["visual"] }) {
  if (kind === "flow") {
    const nodes = ["New WhatsApp enquiry", "Agent drafts reply and qualifies", "CRM updated, call booked"];
    return (
      <ol className="grid gap-3 sm:grid-cols-3">
        {nodes.map((n, i) => (
          <li key={n} style={at(i + 1)} className="reveal rounded-xl border border-line bg-ink/60 p-4 text-[14px] text-mist">
            <span className={`mb-3 block size-2 rounded-full ${i === 2 ? "bg-amber" : "bg-teal"}`} aria-hidden="true" />
            {n}
          </li>
        ))}
      </ol>
    );
  }
  if (kind === "uptime") {
    return (
      <div aria-hidden="true" className="grow-bars flex h-20 items-end gap-0.75">
        {Array.from({ length: 30 }, (_, i) => (
          <span key={i} className={`h-full flex-1 rounded-sm ${i === 17 ? "bg-amber/70" : "bg-teal/60"}`} />
        ))}
      </div>
    );
  }
  if (kind === "growth") {
    return (
      <svg viewBox="0 0 300 80" preserveAspectRatio="none" className="h-20 w-full" aria-hidden="true">
        <path
          d="M0 70 C40 66 60 60 90 58 S150 44 180 36 S240 20 300 8"
          fill="none"
          stroke="var(--color-teal)"
          strokeWidth="2.5"
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          className="draw-line"
        />
        <path d="M0 70 C40 66 60 60 90 58 S150 44 180 36 S240 20 300 8 V80 H0Z" fill="var(--color-brand)" opacity="0.35" />
      </svg>
    );
  }
  return (
    <ul className="flex flex-wrap gap-2">
      {stackList.map((t) => (
        <li key={t} className="rounded-full border border-line px-3 py-1 text-[13px] text-mist">
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />

      {/* Hero over a teal-graded sky; the product window rises out of the clouds below it. */}
      <div className="relative isolate -mt-[68px]">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[1000px] overflow-hidden md:h-[1180px]">
          <Image
            src="/hero-sky.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="origin-bottom scale-[1.04] object-cover object-bottom"
          />
          <SkyCanvas src="/hero-sky.jpg" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_38_42/0.35)_0%,transparent_40%,transparent_62%,var(--color-ink)_100%)]" />
        </div>

        <section className="px-4 pb-44 pt-[148px] text-center text-white sm:px-6 md:pt-[180px]">
          <h1 className="mx-auto max-w-6xl text-display font-semibold text-balance [text-shadow:0_2px_24px_rgb(0_40_44/0.35)]">
            <span className="intro-line">
              <span>Software your business runs on.</span>
            </span>
            <span className="intro-line text-white/75">
              <span style={{ "--d": "120ms" } as React.CSSProperties}>Designed and built in Jaipur.</span>
            </span>
          </h1>
          <p
            className="intro-fade mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/90"
            style={{ "--d": "300ms" } as React.CSSProperties}
          >
            Cynbit builds AI agents, custom platforms and growth systems for companies that have outgrown spreadsheets
            and off-the-shelf tools.
          </p>
          <div
            className="intro-fade mt-9 flex flex-wrap justify-center gap-3"
            style={{ "--d": "420ms" } as React.CSSProperties}
          >
            <Link
              href="/contact"
              className="rounded-full bg-white px-6 py-3 font-semibold text-[#00474d] shadow-lg shadow-black/10 transition-colors hover:bg-[#e6f4f2]"
            >
              Start a project
            </Link>
            <Link
              href="/case-studies"
              className="rounded-full border border-white/45 bg-white/15 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/25"
            >
              See our work
            </Link>
          </div>
          <div
            className="intro-fade mt-10 flex items-center justify-center gap-3 text-[15px] text-white/90"
            style={{ "--d": "540ms" } as React.CSSProperties}
          >
            <div className="flex -space-x-2.5">
              {founders.map((f) => (
                <Image
                  key={f.name}
                  src={f.photo}
                  alt=""
                  width={36}
                  height={36}
                  className="size-9 rounded-full object-cover object-top ring-2 ring-white/70"
                />
              ))}
            </div>
            <p className="text-left">
              A team of 15+ in Pratap Nagar, Jaipur.
              <span className="block text-white/75">100+ projects delivered.</span>
            </p>
          </div>
        </section>

        <div className="-mt-28">
          <ProductWindow />
        </div>
      </div>

      <section aria-labelledby="services-title" id="services" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 md:py-24">
        <SectionHead id="services-title" title="What we're good at">
          Most projects touch two or three of these. One team owns the whole thing, from first sketch to the
          servers it runs on.
        </SectionHead>
        <ul className="mt-14 grid gap-4 md:grid-cols-6">
          {services.map((s, i) => (
            <li
              key={s.lead}
              style={at(i % 2)}
              className={`reveal lift flex flex-col justify-between gap-8 rounded-3xl border border-line bg-deep p-6 sm:p-8 ${s.span}`}
            >
              <ServiceVisual kind={s.visual} />
              <p className="max-w-lg leading-relaxed text-mist">
                <strong className="font-semibold text-paper">{s.lead}</strong> {s.rest}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="work-title" id="work" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 md:py-24">
        <SectionHead id="work-title" title="Recent work">
          A few projects from our case studies, with the numbers our clients reported.
        </SectionHead>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map(([value, label], i) => (
            <div key={label} style={at(i)} className="reveal border-t border-line pt-5">
              <dt className="sr-only">{label}</dt>
              <dd className="text-5xl font-semibold tracking-[-0.04em]">{value}</dd>
              <dd className="mt-2 text-mist">{label}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-16 border-t border-line">
          {work.map((w, i) => (
            <li key={w.slug} style={at(i)} className="reveal border-b border-line">
              <a
                href={`/case-studies/${w.slug}`}
                className="group grid items-baseline gap-2 py-7 transition-colors md:grid-cols-[200px_1fr_auto_24px] md:gap-8"
              >
                <span className="font-semibold">{w.client}</span>
                <span className="text-mist group-hover:text-paper">{w.project}</span>
                <span className="text-xl font-semibold tracking-tight text-teal">{w.result}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  size={20}
                  className="hidden text-dim transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper md:block"
                />
              </a>
            </li>
          ))}
        </ul>

        <figure className="reveal mt-16 max-w-3xl">
          <blockquote className="text-2xl leading-snug tracking-tight sm:text-3xl">
            “From the first blueprint to final deployment, the Cynbit team acted as true architects of our story.”
          </blockquote>
          <figcaption className="mt-4 text-mist">Cloudy Tales, creative studio</figcaption>
        </figure>
      </section>

      <section aria-labelledby="team-title" id="team" className="border-y border-line bg-deep">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
            <div className="max-w-md">
              <h2 id="team-title" className="text-title font-semibold">
                The people you&apos;ll work with
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-mist">
                Cynbit is a team of 15+ engineers, designers and marketers in Pratap Nagar, Jaipur, led by its three
                founders.
              </p>
              <Link href="/team" className="mt-6 inline-flex items-center gap-1.5 font-semibold text-teal hover:underline">
                Meet the team <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <ul className="grid gap-6 sm:grid-cols-3">
              {founders.map((f, i) => (
                <li key={f.name} style={at(i)} className="reveal">
                  <Image
                    src={f.photo}
                    alt={`${f.name}, ${f.role} at Cynbit`}
                    width={320}
                    height={400}
                    sizes="(min-width: 1024px) 240px, (min-width: 640px) 30vw, 90vw"
                    className="aspect-4/5 w-full rounded-2xl object-cover object-top"
                  />
                  <p className="mt-4 font-semibold">{f.name}</p>
                  <p className="text-sm text-teal">{f.role}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-mist">{f.note}</p>
                </li>
              ))}
            </ul>
          </div>

          <ol className="relative mt-16 grid gap-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
            <span aria-hidden="true" className="fill-rule absolute -top-px left-0 h-0.5 w-full bg-teal" />
            {story.map(([year, title, body], i) => (
              <li key={year} style={at(i)} className="reveal">
                <p className="text-3xl font-semibold tracking-tight text-teal">{year}</p>
                <h3 className="mt-2 font-semibold">{title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-mist">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="process-title" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <SectionHead id="process-title" title="How a project runs">
          Big platform or small automation, every project goes through the same four stages.
        </SectionHead>
        <ol className="mt-14 grid gap-8 md:grid-cols-4 md:gap-6">
          {steps.map(([title, body], i) => (
            <li key={title} style={at(i)} className="reveal border-t border-line pt-5">
              <span className="text-sm text-teal">Step {i + 1}</span>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 leading-relaxed text-mist">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="bitelevate-title" className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="reveal grid gap-8 rounded-3xl bg-teal p-8 text-ink sm:p-12 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-2xl">
            <h2 id="bitelevate-title" className="text-3xl font-semibold tracking-[-0.035em] text-balance sm:text-4xl">
              BitElevate: real projects for students, not more tutorials.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/85">
              Our remote internship programme pairs students with industry projects and mentors who ship code for a
              living. Over 1,000 students certified so far. With Manav Seva Trust, we also teach computer skills in
              rural and government schools.
            </p>
          </div>
          <a
            href="/bitelevate"
            className="justify-self-start rounded-full bg-ink px-6 py-3 font-semibold text-paper transition-colors hover:bg-deep"
          >
            Explore BitElevate
          </a>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="mx-auto grid max-w-6xl gap-10 px-4 py-24 sm:px-6 md:grid-cols-[1fr_1.4fr] md:py-32">
        <h2 id="faq-title" className="text-title font-semibold text-balance md:sticky md:top-28 md:self-start">
          What people ask us first
        </h2>
        <div className="border-t border-line">
          {faqs.map(([q, a], i) => (
            <details key={q} style={at(i)} className="reveal group border-b border-line">
              <summary className="flex items-center justify-between gap-6 py-5 text-lg font-semibold">
                {q}
                <span aria-hidden="true" className="faq-icon text-2xl font-light text-mist transition-transform">
                  +
                </span>
              </summary>
              <p className="max-w-xl pb-6 leading-relaxed text-mist">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
