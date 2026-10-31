import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageIntro } from "@/components/PageIntro";
import { TitleBar } from "@/components/TitleBar";
import { learningTracks } from "@/lib/content";

export const metadata: Metadata = {
  title: "BitElevate career paths",
  description: `Choose from ${learningTracks.length} tracks, from full stack and AI to cybersecurity and design, and build your own order of learning.`,
  alternates: { canonical: "/bitelevate/paths" },
};

const profile = [
  "Initialising learner profile...",
  "Skill gap detected: cloud-native security",
  "Action: adding advanced Kubernetes module",
  "Estimated completion: 14 days (accelerated)",
];

export default function PathsPage() {
  return (
    <>
      <PageIntro
        title="Design your own path."
        dim="No fixed syllabus."
        lead="At BitElevate your learning path is built around the project you're working on, not a rigid curriculum. Pick the tracks that matter to you and move between them as your work demands."
      >
        <Link href="/bitelevate" className="rounded-full bg-teal px-6 py-3 font-semibold text-ink transition-colors hover:bg-paper">
          How BitElevate works
        </Link>
      </PageIntro>

      <section aria-labelledby="tracks-title" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <h2 id="tracks-title" className="reveal text-title font-semibold">
          {learningTracks.length} tracks to mix and match
        </h2>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {learningTracks.map((t, i) => (
            <li
              key={t.name}
              style={{ "--i": i % 4 } as React.CSSProperties}
              className="reveal lift rounded-2xl border border-line bg-deep p-5"
            >
              <h3 className="font-semibold leading-snug">{t.name}</h3>
              {t.note && <p className="mt-1 text-[15px] text-mist">{t.note}</p>}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="adaptive-title" className="border-y border-line bg-deep">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 id="adaptive-title" className="reveal text-title font-semibold text-balance">
              No two learners are alike. Why should two curricula be?
            </h2>
            <dl className="mt-8 grid gap-6">
              <div className="reveal">
                <dt className="text-lg font-semibold">Non-linear learning</dt>
                <dd className="mt-1 leading-relaxed text-mist">
                  Jump between modules as your project needs them. We care about the outcome, not the sequence.
                </dd>
              </div>
              <div className="reveal" style={{ "--i": 1 } as React.CSSProperties}>
                <dt className="text-lg font-semibold">Personalised pacing</dt>
                <dd className="mt-1 leading-relaxed text-mist">
                  The platform spots gaps as you go and adjusts the difficulty of what comes next.
                </dd>
              </div>
            </dl>
          </div>
          <figure className="reveal">
            <div className="window-shadow overflow-hidden rounded-2xl border border-line bg-ink">
              <TitleBar title="learner-profile" />
              <pre className="overflow-x-auto p-5 font-mono text-[13.5px] leading-loose [font-variant-ligatures:none]">
                <code>
                  {profile.map((line) => (
                    <span key={line} className="block text-teal">
                      <span className="text-dim">{"> "}</span>
                      {line}
                    </span>
                  ))}
                </code>
              </pre>
            </div>
            <figcaption className="mt-3 text-sm text-mist">An example of how your path can adapt.</figcaption>
          </figure>
        </div>
      </section>

      <CtaBand title="Ready to build your own path?" dim="Start on BitElevate." />
    </>
  );
}
