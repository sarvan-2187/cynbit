import Link from "next/link";
import { JaipurTime } from "@/components/JaipurTime";
import { contact, tel } from "@/lib/site";

// Closing call to action shared by every page.
export function CtaBand({
  title = "Tell us what's slowing your team down.",
  dim = "We'll show you what to build first.",
}: {
  title?: string;
  dim?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <div className="reveal grid gap-8 border-t border-line pt-16">
        <h2 id="cta-title" className="max-w-4xl text-title font-semibold text-balance">
          {title}
          <span className="block text-dim">{dim}</span>
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/contact" className="rounded-full bg-teal px-6 py-3 font-semibold text-ink transition-colors hover:bg-paper">
            Start a project
          </Link>
          <a
            href={tel(contact.phones[0])}
            className="rounded-full border border-line px-6 py-3 font-semibold transition-colors hover:border-paper/50"
          >
            Call {contact.phones[0]}
          </a>
          <p className="text-sm text-mist sm:ml-3">
            <JaipurTime /> We reply to every enquiry within 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
}
