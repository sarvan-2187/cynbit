import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { caseStudies, getCase } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCase((await params).slug);
  if (!c) return {};
  return {
    title: `${c.client}: ${c.title.replace(/\.$/, "")}`,
    description: c.summary,
    alternates: { canonical: `/case-studies/${c.slug}` },
    openGraph: c.image ? { images: [c.image] } : undefined,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const c = getCase((await params).slug);
  if (!c) notFound();
  const more = caseStudies.filter((x) => x.slug !== c.slug).slice(0, 3);
  const story = [
    ["The challenge", c.challenge],
    ["What we built", c.solution],
    ["The result", c.outcome],
  ];

  return (
    <>
      <article>
        <header className="horizon px-4 pb-12 pt-12 sm:px-6 md:pt-16">
          <div className="mx-auto max-w-6xl">
            <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-[15px] text-mist hover:text-paper">
              <ArrowLeft size={16} aria-hidden="true" /> All case studies
            </Link>
            <p className="intro-fade mt-8 text-teal">
              {c.client}, {c.service}
            </p>
            <h1 className="mt-3 max-w-4xl text-display font-semibold text-balance">
              <span className="intro-line">
                <span>{c.title}</span>
              </span>
            </h1>
            <p
              className="intro-fade mt-6 max-w-2xl text-lg leading-relaxed text-mist"
              style={{ "--d": "250ms" } as React.CSSProperties}
            >
              {c.summary}
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {c.image && (
            <Image
              src={c.image}
              alt=""
              width={1600}
              height={800}
              sizes="(min-width: 1152px) 1104px, 100vw"
              priority
              className="intro-fade aspect-2/1 w-full rounded-3xl border border-line object-cover"
              style={{ "--d": "350ms" } as React.CSSProperties}
            />
          )}

          <dl className="grid grid-cols-2 gap-6 border-b border-line py-10 md:grid-cols-4">
            {[
              ["Client", c.client],
              ["Service", c.service],
              ["Completed", c.completed],
              ["Status", c.status],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-sm text-dim">{k}</dt>
                <dd className="mt-1 font-semibold">{v ?? "—"}</dd>
              </div>
            ))}
          </dl>

          <ol className="grid gap-10 py-16 md:grid-cols-3 md:gap-8">
            {story.map(([title, body], i) => (
              <li key={title} style={{ "--i": i } as React.CSSProperties} className="reveal">
                <h2 className={`text-2xl font-semibold tracking-tight ${i === 2 ? "text-teal" : ""}`}>{title}</h2>
                <p className="mt-3 text-lg leading-relaxed text-mist">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </article>

      <section aria-labelledby="more-title" className="mx-auto max-w-6xl border-t border-line px-4 py-16 sm:px-6">
        <h2 id="more-title" className="text-2xl font-semibold tracking-tight">
          More work
        </h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {more.map((m, i) => (
            <li key={m.slug} style={{ "--i": i } as React.CSSProperties} className="reveal">
              <Link href={`/case-studies/${m.slug}`} className="group block">
                <p className="text-sm text-teal">{m.client}</p>
                <p className="mt-1 font-semibold leading-snug group-hover:underline">{m.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand title="Have a problem like this one?" dim="Tell us about it." />
    </>
  );
}
