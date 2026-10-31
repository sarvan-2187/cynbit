import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { posts, readingMinutes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Practical writing from the Cynbit team on AI agents, automation, software and growth.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const [latest, ...rest] = posts;
  return (
    <>
      <PageIntro
        title="Notes from the team"
        lead="What we're learning about AI agents, automation, software and growth while building for clients, written up so you can use it too."
      />

      <section aria-label="Articles" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <Link href={`/blog/${latest.slug}`} className="reveal group grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-center">
          {latest.image && (
            <div className="overflow-hidden rounded-3xl border border-line">
              <Image
                src={latest.image}
                alt=""
                width={900}
                height={560}
                sizes="(min-width: 768px) 600px, 100vw"
                priority
                className="aspect-16/10 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          )}
          <div>
            <p className="text-sm text-teal">
              Latest, {latest.date}, {readingMinutes(latest)} min read
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-balance group-hover:underline">
              {latest.title}
            </h2>
            <p className="mt-4 leading-relaxed text-mist">{latest.description}</p>
          </div>
        </Link>

        <ul className="mt-16 grid gap-x-8 gap-y-12 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <li key={p.slug} style={{ "--i": i % 3 } as React.CSSProperties} className="reveal lift rounded-2xl">
              <Link href={`/blog/${p.slug}`} className="group block">
                {p.image && (
                  <div className="overflow-hidden rounded-2xl border border-line">
                    <Image
                      src={p.image}
                      alt=""
                      width={600}
                      height={375}
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 100vw"
                      className="aspect-16/10 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                )}
                <p className="mt-4 text-sm text-dim">
                  {p.date}, {readingMinutes(p)} min read
                </p>
                <h2 className="mt-1 text-lg font-semibold leading-snug tracking-tight group-hover:underline">{p.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
