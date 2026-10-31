import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageIntro } from "@/components/PageIntro";
import { founders } from "@/content/company";

export const metadata: Metadata = {
  title: "Our story",
  description: "How Cynbit Technologies grew from groundwork in 2021 to an AI and software company in Jaipur.",
  alternates: { canonical: "/story" },
};

const chapters = [
  {
    year: "2021",
    title: "Groundwork",
    body: "Before Cynbit had a name, we spent the year on the parts nobody sees: security modules, internal frameworks and the blueprints that everything we build now runs on.",
  },
  {
    year: "2022",
    title: "First clients",
    body: "We took those frameworks to real businesses. Working with our first partners showed that the approach held up in production, at real scale, with real users.",
  },
  {
    year: "2023",
    title: "Our own products",
    body: "A year of experiments. We refined our AI tooling and turned BitElevate, Cynbit Studio and TenantEase from ideas into products that were ready to launch.",
  },
  {
    year: "2024",
    title: "Cynbit launches",
    body: "Cynbit Technologies launched officially, together with BitElevate and TenantEase. Today we're a team of 15+ with 100+ projects delivered.",
  },
];

export default function StoryPage() {
  return (
    <>
      <PageIntro
        title="How Cynbit started"
        dim="Jaipur, 2021."
        lead="Cynbit was founded in Jaipur, Rajasthan, to build AI, automation and software that solve real business problems. This is how we got here."
      />

      <section aria-labelledby="purpose-title" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <h2 id="purpose-title" className="sr-only">
          What we&apos;re for
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="reveal rounded-3xl border border-line bg-deep p-8">
            <p className="text-sm text-teal">Vision</p>
            <p className="mt-3 text-2xl font-semibold leading-snug tracking-tight">
              Software that is technically precise and still feels human to use.
            </p>
          </div>
          <div className="reveal rounded-3xl border border-line bg-deep p-8" style={{ "--i": 1 } as React.CSSProperties}>
            <p className="text-sm text-teal">Mission</p>
            <p className="mt-3 text-2xl font-semibold leading-snug tracking-tight">
              Take the friction out of running a business, and out of starting a career in tech.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="timeline-title" className="border-y border-line bg-deep">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <h2 id="timeline-title" className="reveal text-title font-semibold">
            Four years, four chapters
          </h2>
          <ol className="relative mt-14 border-l border-line">
            <span aria-hidden="true" className="fill-rule-y absolute -left-px top-0 h-full w-0.5 bg-teal" />
            {chapters.map((c, i) => (
              <li
                key={c.year}
                style={{ "--i": i } as React.CSSProperties}
                className="reveal grid gap-2 pb-14 pl-8 last:pb-0 md:grid-cols-[180px_1fr] md:gap-10"
              >
                <p className="text-5xl font-semibold tracking-tight text-teal">{c.year}</p>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">{c.title}</h3>
                  <p className="mt-3 max-w-xl text-lg leading-relaxed text-mist">{c.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="people-title" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="people-title" className="reveal text-title font-semibold">
            Started by three founders
          </h2>
          <Link href="/team" className="reveal font-semibold text-teal hover:underline">
            Meet the team
          </Link>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-3">
          {founders.map((f, i) => (
            <li key={f.name} style={{ "--i": i } as React.CSSProperties} className="reveal flex items-center gap-4">
              <Image src={f.photo} alt="" width={64} height={64} className="size-16 rounded-full object-cover object-top" />
              <div>
                <p className="font-semibold">{f.name}</p>
                <p className="text-sm text-mist">{f.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand title="Write the next chapter with us." dim="Start with a conversation." />
    </>
  );
}
