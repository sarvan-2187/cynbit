import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageIntro } from "@/components/PageIntro";
import { LIVE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Social impact",
  description:
    "BitElevate's career and well-being programmes for students, and computer teaching in rural and government schools with Manav Seva Trust.",
  alternates: { canonical: "/impact" },
};

const programmes = [
  {
    title: "Skills and career readiness",
    body: "Practical workshops, technical training and real industry exposure, so students leave college able to do the job, not just describe it.",
    tags: ["Technical training", "Career readiness", "Practical learning", "Industry exposure"],
  },
  {
    title: "Well-being and mental health",
    body: "Student life comes with stress, academic pressure and self-doubt. We run sessions and a safe space to talk about it, because confident people build better things.",
    tags: ["Mental wellness", "Emotional health", "Safe space", "Confidence"],
  },
];

export default function ImpactPage() {
  return (
    <>
      <PageIntro
        title="Cynbit for society"
        dim="Technology as a way up."
        lead="Alongside client work, we invest in students and in schools that don't have access to computer education. Our programmes grow with the student: first skills, then the resilience to use them."
      />

      <section aria-labelledby="programmes-title" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <h2 id="programmes-title" className="reveal text-title font-semibold">
          Through BitElevate
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {programmes.map((p, i) => (
            <article key={p.title} style={{ "--i": i } as React.CSSProperties} className="reveal lift rounded-3xl border border-line bg-deep p-8">
              <h3 className="text-2xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-3 text-lg leading-relaxed text-mist">{p.body}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li key={t} className="rounded-full border border-line px-3 py-1 text-sm text-mist">
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="reveal mt-8 text-mist">
          Students write about this side of college in our{" "}
          <a href={`${LIVE}/diaries`} className="font-semibold text-teal hover:underline">
            student diaries
          </a>
          .
        </p>
      </section>

      <section aria-labelledby="trust-title" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="reveal grid gap-8 rounded-3xl bg-teal p-8 text-ink sm:p-12 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <h2 id="trust-title" className="text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl">
              Computer classes in rural and government schools
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/85">
              With Manav Seva Trust, we teach foundational computer and IT skills to students in government schools and
              rural areas, and provide the equipment and resources to make that possible.
            </p>
          </div>
          <Link
            href="/contact"
            className="justify-self-start rounded-full bg-ink px-6 py-3 font-semibold text-paper transition-colors hover:bg-deep md:justify-self-end"
          >
            Support the programme
          </Link>
        </div>
      </section>

      <CtaBand title="Want to partner on a social project?" dim="We'd like to hear about it." />
    </>
  );
}
