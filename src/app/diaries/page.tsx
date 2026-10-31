import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageIntro } from "@/components/PageIntro";
import { diaries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Student diaries",
  description: "Unfiltered stories from students on attendance, loneliness, self-doubt and finding direction in college.",
  alternates: { canonical: "/diaries" },
};

const unquote = (s: string) => s.replace(/^["“]|["”]$/g, "");

export default function DiariesPage() {
  return (
    <>
      <PageIntro
        title="Student diaries"
        dim="Stories we don't usually hear."
        lead="Short, anonymous stories from students in our community about the parts of college that don't make the brochure."
      />
      <section aria-label="Stories" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <ul className="grid gap-5 md:grid-cols-2">
          {diaries.map((d, i) => (
            <li key={d.slug} style={{ "--i": i % 2 } as React.CSSProperties} className="reveal lift rounded-3xl">
              <Link
                href={`/diaries/${d.slug}`}
                className="group flex h-full flex-col justify-between gap-8 rounded-3xl border border-line bg-deep p-7"
              >
                <blockquote className="text-2xl leading-snug tracking-tight text-balance">
                  &ldquo;{unquote(d.lead)}&rdquo;
                </blockquote>
                <div className="flex items-end justify-between gap-4 text-[15px]">
                  <p className="text-mist">
                    {d.author}, {d.role}
                  </p>
                  <span className="font-semibold text-teal group-hover:underline">Read</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand title="Have a story of your own?" dim="Tell us about it." />
    </>
  );
}
