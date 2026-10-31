import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { TitleBar } from "@/components/TitleBar";
import { LIVE } from "@/lib/site";

export const metadata: Metadata = {
  title: "BitElevate remote internships",
  description:
    "Learn software engineering by shipping a pull request a day on a real project, with mentor reviews and a verifiable certificate.",
  alternates: { canonical: "/bitelevate" },
};

const ENROL = `${LIVE}/bitelevate`;

const compare = [
  { name: "Recorded courses", body: "You watch someone else build. There's no repo of yours, no review and nothing a recruiter can open.", ok: false },
  { name: "Certificate-only internships", body: "You get a letter at the end. The work behind it is hard to see and harder to check.", ok: false },
  { name: "BitElevate", body: "A real repo, a pull request every day, mentor feedback on each one, and a certificate with a QR code anyone can scan.", ok: true },
];

const howItWorks = [
  ["Pick a lab", "Choose one of six tracks, from full stack to UI/UX."],
  ["Get your repo", "Your portal account is created automatically. Fork and clone your lab."],
  ["Ship a PR a day", "Branch, build, test, open a pull request and paste the link into your workbench."],
  ["Get reviewed and certified", "Mentors approve or request changes. Finish the roadmap and get a verifiable certificate."],
];

const workbench = [
  ["Daily sprint tasks", "Every day unlocks a clear task: which files to change, how it's tested and which branch to use."],
  ["Pull request reviews", "Submit your PR link and get inline feedback from a senior reviewer before it's approved."],
  ["War-room challenges", "60 simulated production incidents: memory crashes, database deadlocks, outage logs."],
  ["Exam freeze", "Mid-terms or finals? Pause your streak through the portal without losing progress."],
];

const roadmap = [
  ["Setup", "Fork the repo, set up your environment, run the app locally and open your first pull request."],
  ["Bugs and tests", "Reproduce real production errors, find the cause and write test suites that prove the fix."],
  ["Core architecture", "Authentication, roles and permissions, relational schemas and clean API contracts."],
  ["Speed and scale", "Caching, query profiling, indexes and background jobs for heavy traffic."],
  ["Ship it", "Docker builds, CI/CD with GitHub Actions, a security review and your capstone release."],
];

const terminal = [
  ["$ ", "git clone https://github.com/you/bitelevate-fullstack-lab.git"],
  ["$ ", "git checkout -b task/day-14-api-cache"],
  ["$ ", "pytest tests/ --cov=app"],
  ["", "24 passed in 1.42s, 100% coverage"],
  ["$ ", "git push origin task/day-14-api-cache"],
  ["", "Pull request opened, waiting for mentor review"],
];

export default function BitElevatePage() {
  return (
    <>
      <PageIntro
        title="Stop watching tutorials."
        dim="Start doing the work."
        lead="BitElevate is Cynbit's remote software internship. You learn by building a real project: fixing bugs, writing tests and shipping a pull request every day, reviewed by working engineers."
      >
        <a href={ENROL} className="rounded-full bg-teal px-6 py-3 font-semibold text-ink transition-colors hover:bg-paper">
          Enrol on BitElevate
        </a>
        <a
          href={`${LIVE}/bitelevate/paths`}
          className="rounded-full border border-line px-6 py-3 font-semibold transition-colors hover:border-paper/50"
        >
          Design your own path
        </a>
      </PageIntro>

      <section aria-labelledby="compare-title" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <h2 id="compare-title" className="reveal text-title font-semibold text-balance">
          Tutorials teach you to follow. Jobs ask you to ship.
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {compare.map((c, i) => (
            <li
              key={c.name}
              style={{ "--i": i } as React.CSSProperties}
              className={`reveal rounded-3xl p-7 ${c.ok ? "bg-teal text-ink" : "border border-line bg-deep"}`}
            >
              <p className="flex items-center gap-2 text-lg font-semibold">
                {c.ok ? <Check size={20} aria-hidden="true" /> : <Minus size={20} aria-hidden="true" className="text-dim" />}
                {c.name}
              </p>
              <p className={`mt-3 leading-relaxed ${c.ok ? "text-ink/85" : "text-mist"}`}>{c.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how-title" className="border-y border-line bg-deep">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 id="how-title" className="reveal text-title font-semibold">
              How it works
            </h2>
            <ol className="mt-10 grid gap-6">
              {howItWorks.map(([title, body], i) => (
                <li key={title} style={{ "--i": i } as React.CSSProperties} className="reveal grid grid-cols-[40px_1fr] gap-4">
                  <span className="grid size-10 place-items-center rounded-full border border-line font-semibold text-teal">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="mt-1 leading-relaxed text-mist">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <figure className="reveal">
            <div className="window-shadow overflow-hidden rounded-2xl border border-line bg-ink">
              <TitleBar title="bitelevate-fullstack-lab" />
              <pre className="overflow-x-auto p-5 font-mono text-[13.5px] leading-loose">
                <code>
                  {terminal.map(([prompt, line], i) => (
                    <span key={i} className={`block ${prompt ? "text-paper" : "text-teal"}`}>
                      <span className="text-dim">{prompt}</span>
                      {line}
                    </span>
                  ))}
                </code>
              </pre>
            </div>
            <figcaption className="mt-3 text-sm text-mist">Day 14 of the full-stack track.</figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="workbench-title" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <h2 id="workbench-title" className="reveal text-title font-semibold">
          Your daily workbench
        </h2>
        <p className="reveal mt-5 max-w-2xl text-lg leading-relaxed text-mist">
          You get your own login to the intern portal from day one. No chaotic WhatsApp groups or lost Drive folders:
          everything lives in one place.
        </p>
        <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {workbench.map(([title, body], i) => (
            <div key={title} style={{ "--i": i } as React.CSSProperties} className="reveal border-t border-line pt-5">
              <dt className="text-lg font-semibold">{title}</dt>
              <dd className="mt-2 leading-relaxed text-mist">{body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="roadmap-title" className="border-y border-line bg-deep">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <h2 id="roadmap-title" className="reveal text-title font-semibold">
            The 60-day roadmap
          </h2>
          <ol className="relative mt-12 grid gap-8 md:grid-cols-5 md:gap-6">
            <span aria-hidden="true" className="fill-rule absolute left-0 top-0 hidden h-0.5 w-full bg-teal md:block" />
            {roadmap.map(([title, body], i) => (
              <li key={title} style={{ "--i": i } as React.CSSProperties} className="reveal border-t border-line pt-5">
                <span className="text-sm text-teal">Phase {i + 1}</span>
                <h3 className="mt-1 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-mist">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="enrol-title" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <div className="reveal grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h2 id="enrol-title" className="text-title font-semibold text-balance">
              Join 1,000+ engineers who shipped their way in.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-mist">
              One fee, instant enrolment and your lab repository ready on day one. Enrolment and payment happen on the
              BitElevate portal.
            </p>
          </div>
          <a href={ENROL} className="justify-self-start rounded-full bg-teal px-6 py-3 font-semibold text-ink transition-colors hover:bg-paper">
            Enrol on BitElevate
          </a>
        </div>
      </section>
    </>
  );
}
