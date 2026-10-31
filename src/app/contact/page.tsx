import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/forms";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Tell Cynbit about the software, AI automation or growth project you need. We reply within 24 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
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

          <ol className="mt-12 grid gap-5 border-t border-line pt-8">
            {[
              ["We read it", "Someone on the team reads your message the same working day."],
              ["We reply within 24 hours", "With questions, or a time for a short discovery call."],
              ["You get a plan", "A written outline of what we'd build, how long it takes and what it costs."],
            ].map(([t, d], i) => (
              <li key={t} className="grid grid-cols-[28px_1fr] gap-3">
                <span className="grid size-7 place-items-center rounded-full border border-line text-sm text-teal">{i + 1}</span>
                <div>
                  <p className="font-semibold">{t}</p>
                  <p className="text-[15px] leading-relaxed text-mist">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="intro-fade" style={{ "--d": "300ms" } as React.CSSProperties}>
          <Suspense fallback={<div className="h-[520px] rounded-3xl border border-line bg-panel/60" />}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
