import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageIntro } from "@/components/PageIntro";
import { founders } from "@/content/company";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet Mohak Saini, Ashutosh Upadhyay and Dhawan Nama, the founders leading Cynbit Technologies in Jaipur.",
  alternates: { canonical: "/team" },
};

const facts = [
  ["100+", "projects delivered"],
  ["15+", "people on the team"],
  ["2021", "when the work began"],
  ["1,000+", "BitElevate students certified"],
];

const values = [
  ["Honest about trade-offs", "We tell you what something will really cost and where it could go wrong, before you commit."],
  ["Proof over promises", "We point to systems we've shipped and numbers clients reported, not slogans."],
  ["No single point of failure", "Knowledge is shared across the team, so your project never depends on one person."],
];

export default function TeamPage() {
  return (
    <>
      <PageIntro
        title="The people behind Cynbit"
        lead="Cynbit is led by its three founders and a team of engineers, designers and marketers working from Pratap Nagar, Jaipur, and remotely across India."
      />

      <section aria-labelledby="founders-title" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <h2 id="founders-title" className="sr-only">
          Founders
        </h2>
        <ul className="grid gap-10 md:grid-cols-3">
          {founders.map((f, i) => (
            <li key={f.name} style={{ "--i": i } as React.CSSProperties} className="reveal">
              <Image
                src={f.photo}
                alt={`${f.name}, ${f.role} at Cynbit`}
                width={480}
                height={600}
                sizes="(min-width: 768px) 360px, 100vw"
                priority={i === 0}
                className="aspect-4/5 w-full rounded-3xl object-cover object-top"
              />
              <h3 className="mt-5 text-2xl font-semibold tracking-tight">{f.name}</h3>
              <p className="text-teal">{f.role}</p>
              <p className="mt-3 text-lg leading-relaxed text-mist">{f.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="facts-title" className="border-y border-line bg-deep">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 id="facts-title" className="sr-only">
            Cynbit in numbers
          </h2>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {facts.map(([value, label], i) => (
              <div key={label} style={{ "--i": i } as React.CSSProperties} className="reveal border-t border-line pt-5">
                <dt className="sr-only">{label}</dt>
                <dd className="text-5xl font-semibold tracking-[-0.04em]">{value}</dd>
                <dd className="mt-2 text-mist">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="values-title" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <h2 id="values-title" className="reveal text-title font-semibold">
          How we try to work
        </h2>
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {values.map(([title, body], i) => (
            <li key={title} style={{ "--i": i } as React.CSSProperties} className="reveal border-t border-line pt-5">
              <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 leading-relaxed text-mist">{body}</p>
            </li>
          ))}
        </ul>
        <p className="reveal mt-14 text-lg text-mist">
          Want to work with us from the inside?{" "}
          <Link href="/careers" className="font-semibold text-teal hover:underline">
            See open roles
          </Link>
          .
        </p>
      </section>

      <CtaBand />
    </>
  );
}
