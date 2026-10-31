import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/PageIntro";
import { getLegal } from "@/lib/content";
import { contact } from "@/lib/site";

const anchor = (h: string) => h.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const plain = (h: string) => h.replace(/^\d+\.\s*/, "");

export function legalMetadata(slug: string): Metadata {
  const doc = getLegal(slug);
  return {
    title: doc?.title,
    description: `${doc?.title} for Cynbit Technologies. Last updated ${doc?.updated}.`,
    alternates: { canonical: `/${slug}` },
  };
}

// Policy text is migrated word for word from the live site; only the layout is new.
export function LegalPage({ slug }: { slug: string }) {
  const doc = getLegal(slug);
  if (!doc) notFound();
  return (
    <>
      <PageIntro title={doc.title} lead={`Last updated ${doc.updated}.`} />
      <article className="mx-auto grid max-w-6xl gap-10 px-4 pb-24 sm:px-6 lg:grid-cols-[220px_1fr]">
        <nav aria-label="On this page" className="hidden lg:block">
          <ul className="sticky top-28 grid gap-2 border-l border-line pl-4 text-[15px] text-mist">
            {doc.sections
              .filter((s) => s.heading)
              .map((s) => (
                <li key={s.heading}>
                  <a href={`#${anchor(s.heading)}`} className="hover:text-paper">
                    {plain(s.heading)}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
        <div className="max-w-2xl">
          {doc.sections.map((s, i) => (
            <section
              key={`${i}-${s.heading}`}
              id={s.heading ? anchor(s.heading) : undefined}
              className="scroll-mt-28 border-t border-line py-8 first:border-t-0 first:pt-0"
            >
              {s.heading && <h2 className="text-2xl font-semibold tracking-tight">{plain(s.heading)}</h2>}
              {s.paragraphs.map((t) => (
                <p key={t} className="mt-3 text-lg leading-relaxed text-mist">
                  {t}
                </p>
              ))}
            </section>
          ))}
          <p className="mt-6 border-t border-line pt-8 text-mist">
            Questions about this page? Write to{" "}
            <a href={`mailto:${contact.email}`} className="font-semibold text-teal hover:underline">
              {contact.email}
            </a>
            .
          </p>
        </div>
      </article>
    </>
  );
}
