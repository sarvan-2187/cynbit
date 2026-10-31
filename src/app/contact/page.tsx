import type { Metadata } from "next";
import { ContactForm } from "@/components/forms";
import { JaipurTime } from "@/components/JaipurTime";
import { contact, needs, tel } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Tell Cynbit about the software, AI automation or growth project you need. We reply within 24 hours.",
  alternates: { canonical: "/contact" },
};

// ?need=products (from a product's demo button) pre-selects that option in the form.
export default async function ContactPage({ searchParams }: { searchParams: Promise<{ need?: string }> }) {
  const { need } = await searchParams;
  const defaultNeed = need && need in needs ? need : undefined;
  return (
    <div className="horizon">
      <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-24 pt-16 sm:px-6 md:pt-24 lg:grid-cols-[1fr_1.35fr]">
        <div>
          <h1 className="text-display font-semibold">
            <span className="intro-line">
              <span>Start a project.</span>
            </span>
            <span className="intro-line text-dim">
              <span style={{ "--d": "120ms" } as React.CSSProperties}>We reply within a day.</span>
            </span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-mist">
            Tell us what you&apos;re building or what&apos;s slowing your team down. We read every message and set
            up a discovery call if we&apos;re a good fit.
          </p>

          <dl className="mt-12 grid gap-6 border-t border-line pt-8 text-[15px]">
            <div>
              <dt className="text-dim">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${contact.email}`} className="text-paper hover:text-teal">
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-dim">Phone</dt>
              {contact.phones.map((p) => (
                <dd key={p} className="mt-1">
                  <a href={tel(p)} className="text-paper hover:text-teal">
                    {p}
                  </a>
                </dd>
              ))}
            </div>
            <div>
              <dt className="text-dim">Office</dt>
              <dd className="mt-1 text-paper">{contact.address}</dd>
              <dd className="mt-1 text-mist">
                <JaipurTime />
              </dd>
            </div>
          </dl>
        </div>

        <div className="intro-fade" style={{ "--d": "300ms" } as React.CSSProperties}>
          <ContactForm defaultNeed={defaultNeed} />
        </div>
      </section>
    </div>
  );
}
