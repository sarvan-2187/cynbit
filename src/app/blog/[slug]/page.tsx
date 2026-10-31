import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { getPost, posts, readingMinutes, type Block } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", publishedTime: post.date ?? undefined, images: post.image ? [post.image] : undefined },
  };
}

// Article HTML was allowlist-sanitised at migration time (research/scripts/scrape.mjs).
function Block({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "ul":
      return <ul dangerouslySetInnerHTML={{ __html: block.html }} />;
    case "ol":
      return <ol dangerouslySetInnerHTML={{ __html: block.html }} />;
    case "table":
      return (
        <div className="table-wrap">
          <table dangerouslySetInnerHTML={{ __html: block.html }} />
        </div>
      );
    default:
      return <p dangerouslySetInnerHTML={{ __html: block.html }} />;
  }
}

// Old posts use ALL-CAPS headings; show them in sentence case.
const sentence = (s: string) => (s === s.toUpperCase() ? s.charAt(0) + s.slice(1).toLowerCase() : s);

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="horizon px-4 pb-10 pt-12 sm:px-6 md:pt-16">
          <div className="mx-auto max-w-3xl">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-[15px] text-mist hover:text-paper">
              <ArrowLeft size={16} aria-hidden="true" /> All articles
            </Link>
            <p className="intro-fade mt-8 text-sm text-teal">
              {post.date}, {readingMinutes(post)} min read
            </p>
            <h1 className="mt-3 text-title font-semibold text-balance">
              <span className="intro-line">
                <span>{post.title}</span>
              </span>
            </h1>
            <p className="intro-fade mt-5 text-lg leading-relaxed text-mist" style={{ "--d": "250ms" } as React.CSSProperties}>
              {post.description}
            </p>
          </div>
        </header>

        {post.image && (
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <Image
              src={post.image}
              alt=""
              width={1600}
              height={800}
              sizes="(min-width: 1024px) 976px, 100vw"
              priority
              className="aspect-2/1 w-full rounded-3xl border border-line object-cover"
            />
          </div>
        )}

        <div className="article mx-auto max-w-3xl px-4 py-14 sm:px-6">
          {post.blocks.map((b, i) => (
            <Block key={i} block={"text" in b ? { ...b, text: sentence(b.text) } : b} />
          ))}
        </div>
      </article>

      <section aria-labelledby="related-title" className="mx-auto max-w-6xl border-t border-line px-4 py-16 sm:px-6">
        <h2 id="related-title" className="text-2xl font-semibold tracking-tight">
          Keep reading
        </h2>
        <ul className="mt-8 grid gap-8 md:grid-cols-3">
          {related.map((p, i) => (
            <li key={p.slug} style={{ "--i": i } as React.CSSProperties} className="reveal">
              <Link href={`/blog/${p.slug}`} className="group block">
                <p className="text-sm text-dim">{p.date}</p>
                <p className="mt-1 font-semibold leading-snug group-hover:underline">{p.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand title="Want this working in your business?" dim="Let's talk about it." />
    </>
  );
}
