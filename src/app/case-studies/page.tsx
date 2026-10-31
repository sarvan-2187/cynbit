import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageIntro } from "@/components/PageIntro";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Projects Cynbit has delivered in healthcare, retail, fintech, education and entertainment, with the results clients reported.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  const [featured, ...rest] = caseStudies;
  return (
    <>
      <PageIntro
        title="Case studies"
        dim="What we built, and what changed."
        lead={`${caseStudies.length} projects across healthcare, retail, fintech, education and entertainment. Each one lists the problem, what we built and the result the client reported.`}
      />

      <section aria-label="All case studies" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <Link
          href={`/case-studies/${featured.slug}`}
          className="reveal group grid overflow-hidden rounded-3xl border border-line bg-deep md:grid-cols-[1.2fr_1fr]"
        >
          {featured.image && (
            <Image
              src={featured.image}
              alt=""
              width={900}
              height={600}
              sizes="(min-width: 768px) 55vw, 100vw"
              priority
              className="h-full max-h-[420px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          )}
          <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
            <p className="text-sm text-teal">
              {featured.client}, {featured.service}
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-balance">{featured.title}</h2>
            <p className="leading-relaxed text-mist">{featured.outcome}</p>
            <span className="font-semibold text-teal group-hover:underline">Read the case study</span>
          </div>
        </Link>

        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((c, i) => (
            <li key={c.slug} style={{ "--i": i % 3 } as React.CSSProperties} className="reveal lift rounded-2xl">
              <Link href={`/case-studies/${c.slug}`} className="group block">
                {c.image && (
                  <div className="overflow-hidden rounded-2xl border border-line">
                    <Image
                      src={c.image}
                      alt=""
                      width={600}
                      height={400}
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 100vw"
                      className="aspect-3/2 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                )}
                <p className="mt-4 text-sm text-teal">{c.client}</p>
                <h2 className="mt-1 text-lg font-semibold leading-snug tracking-tight group-hover:underline">{c.title}</h2>
                <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-mist">{c.outcome}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand title="Want results like these?" dim="Tell us where you're stuck." />
    </>
  );
}
