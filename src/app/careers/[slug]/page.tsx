import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { ApplicationForm } from "@/components/forms";
import { getJob, jobs } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = getJob((await params).slug);
  if (!job) return {};
  return {
    title: `${job.title}, careers`,
    description: `${job.about} ${job.location}. Apply in two minutes.`,
    alternates: { canonical: `/careers/${job.slug}` },
  };
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="reveal mt-12">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed text-mist">
            <Check size={18} aria-hidden="true" className="mt-1 shrink-0 text-teal" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function JobPage({ params }: Props) {
  const job = getJob((await params).slug);
  if (!job) notFound();

  return (
    <div className="horizon">
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 md:pt-16">
        <Link href="/careers#openings" className="inline-flex items-center gap-1.5 text-[15px] text-mist hover:text-paper">
          <ArrowLeft size={16} aria-hidden="true" /> All open roles
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <article>
            <p className="intro-fade text-teal">{job.team}</p>
            <h1 className="mt-3 text-display font-semibold text-balance">
              <span className="intro-line">
                <span>{job.title}</span>
              </span>
            </h1>
            <p className="intro-fade mt-4 text-mist" style={{ "--d": "200ms" } as React.CSSProperties}>
              {job.location}. Applications reviewed within 48 hours.
            </p>
            <p
              className="intro-fade mt-8 max-w-xl text-xl leading-relaxed"
              style={{ "--d": "280ms" } as React.CSSProperties}
            >
              {job.about}
            </p>
            <List title="What you'll do" items={job.responsibilities} />
            <List title="What we're looking for" items={job.requirements} />
            <section className="reveal mt-12 rounded-2xl border border-line bg-deep p-6">
              <h2 className="font-semibold">Also part of the deal</h2>
              <p className="mt-2 leading-relaxed text-mist">
                Remote-first work, learning time and Research Fridays, ownership of what you build, and time set aside
                for our social impact programmes.
              </p>
            </section>
          </article>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <ApplicationForm role={job.slug} title={job.title} />
          </div>
        </div>
      </div>
    </div>
  );
}
