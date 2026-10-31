import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { diaries, getDiary } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => diaries.map((d) => ({ slug: d.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = getDiary((await params).slug);
  if (!d) return {};
  return { title: d.title.replace(/\.$/, ""), description: d.lead, alternates: { canonical: `/diaries/${d.slug}` } };
}

export default async function DiaryPage({ params }: Props) {
  const d = getDiary((await params).slug);
  if (!d) notFound();
  const more = diaries.filter((x) => x.slug !== d.slug).slice(0, 2);
  return (
    <>
      <article>
        <header className="horizon px-4 pb-10 pt-12 sm:px-6 md:pt-16">
          <div className="mx-auto max-w-3xl">
            <Link href="/diaries" className="inline-flex items-center gap-1.5 text-[15px] text-mist hover:text-paper">
              <ArrowLeft size={16} aria-hidden="true" /> All diaries
            </Link>
            <p className="intro-fade mt-8 text-sm text-teal">
              {d.author}, {d.role}
            </p>
            <h1 className="mt-3 text-title font-semibold text-balance">
              <span className="intro-line">
                <span>{d.title}</span>
              </span>
            </h1>
          </div>
        </header>
        <div className="article mx-auto max-w-3xl px-4 pb-16 pt-6 sm:px-6">
          <p className="text-2xl leading-snug tracking-tight text-paper">{d.lead}</p>
          {d.body.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
      </article>
      <section aria-labelledby="more-title" className="mx-auto max-w-3xl border-t border-line px-4 py-14 sm:px-6">
        <h2 id="more-title" className="text-2xl font-semibold tracking-tight">
          More stories
        </h2>
        <ul className="mt-6 grid gap-5">
          {more.map((m) => (
            <li key={m.slug}>
              <Link href={`/diaries/${m.slug}`} className="font-semibold leading-snug hover:text-teal hover:underline">
                {m.title}
              </Link>
              <p className="mt-1 text-mist">{m.lead}</p>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand title="Learning shouldn't feel like this." dim="BitElevate is our answer." />
    </>
  );
}
