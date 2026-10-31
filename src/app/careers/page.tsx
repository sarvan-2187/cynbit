import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { jobs, jobsByTeam } from "@/lib/content";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description: `${jobs.length} open roles and internships at Cynbit Technologies, remote or in Jaipur. Apply in two minutes.`,
  alternates: { canonical: "/careers" },
};

const ways = [
  ["We write things down", "Clear documents over long meetings. Decisions live where everyone can find them."],
  ["We protect focus", "Most communication is asynchronous, so you get long stretches of uninterrupted work."],
  ["Reviews are about the work", "Code and design reviews aim for the best result together, not for catching people out."],
  ["We ship in short cycles", "Fast releases, built carefully enough that we don't have to rebuild them later."],
];

const perks = [
  ["Learning time", "Certifications, conferences and Research Fridays to explore new tools."],
  ["Remote-first", "Work from wherever you do your best work, with regular team meetups in Jaipur."],
  ["Ownership from day one", "Everyone can shape the technical plan and the product roadmap."],
];

export default function CareersPage() {
  return (
    <>
      <PageIntro
        title="Work at Cynbit"
        dim={`${jobs.length} open roles right now.`}
        lead="We're a team of 15+ in Jaipur and across India building software for clients and our own products. Every role below is remote or in Jaipur, and applying takes about two minutes."
      >
        <a href="#openings" className="rounded-full bg-teal px-6 py-3 font-semibold text-ink transition-colors hover:bg-paper">
          See open roles
        </a>
      </PageIntro>

      <section aria-labelledby="perks-title" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <h2 id="perks-title" className="reveal text-title font-semibold">
          Why people join
        </h2>
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {perks.map(([title, body], i) => (
            <li key={title} style={{ "--i": i } as React.CSSProperties} className="reveal border-t border-line pt-5">
              <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 leading-relaxed text-mist">{body}</p>
            </li>
          ))}
        </ul>

        <h3 className="reveal mt-20 text-2xl font-semibold tracking-tight">How we work</h3>
        <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ways.map(([title, body], i) => (
            <div key={title} style={{ "--i": i } as React.CSSProperties} className="reveal lift rounded-2xl border border-line bg-deep p-6">
              <dt className="font-semibold">{title}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-mist">{body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="openings" aria-labelledby="openings-title" className="scroll-mt-20 border-t border-line bg-deep">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <h2 id="openings-title" className="reveal text-title font-semibold">
            Open roles
          </h2>
          {jobsByTeam().map(([team, list]) => (
            <div key={team} className="mt-14">
              <h3 className="reveal text-sm font-semibold text-teal">
                {team} <span className="font-normal text-dim">({list.length})</span>
              </h3>
              <ul className="mt-4 border-t border-line">
                {list.map((job, i) => (
                  <li key={job.slug} style={{ "--i": i % 4 } as React.CSSProperties} className="reveal border-b border-line">
                    <Link
                      href={`/careers/${job.slug}`}
                      className="group grid items-baseline gap-1 py-5 md:grid-cols-[1fr_1.4fr_auto_20px] md:gap-8"
                    >
                      <span className="text-lg font-semibold tracking-tight group-hover:text-teal">{job.title}</span>
                      <span className="text-mist">{job.summary}</span>
                      <span className="text-sm text-dim">{job.location}</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        size={18}
                        className="hidden text-dim transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper md:block"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="reveal mt-14 text-lg text-mist">
            Don&apos;t see your role? Write to{" "}
            <a href={`mailto:${contact.email}`} className="font-semibold text-teal hover:underline">
              {contact.email}
            </a>{" "}
            with what you&apos;d like to work on.
          </p>
        </div>
      </section>
    </>
  );
}
