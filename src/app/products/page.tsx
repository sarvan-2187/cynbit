import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageIntro } from "@/components/PageIntro";
import { Revio, Studio, TenantEase } from "@/components/scenes";
import { TitleBar } from "@/components/TitleBar";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Cynbit Studio for coding careers, TenantEase for property management and Revio for review management. Software built and run by Cynbit.",
  alternates: { canonical: "/products" },
};

const products = [
  {
    id: "cynbit-studio",
    name: "Cynbit Studio",
    tagline: "A coding platform that knows where you stand.",
    body: "Cynbit Studio takes students and developers from learning to employable. A placement test sets your level, adaptive missions push you at the right pace, and AI reviews the quality of your code, not just whether it runs.",
    features: [
      ["Placement assessment", "Skip what you already know and start at your level."],
      ["AI code review", "Feedback on readability and structure, not just passing tests."],
      ["Career tools", "AI mock interviews, a resume builder and job matching in the same place."],
      ["Visible progress", "XP, a skill radar and certificates that prove the work happened."],
    ],
    Scene: Studio,
  },
  {
    id: "tenantease",
    name: "TenantEase",
    tagline: "Run your properties without notebooks and scattered chats.",
    body: "TenantEase puts buildings, units, tenants and rent in one dashboard. Reminders go out on their own, every payment is recorded, and you can see occupancy and revenue at a glance.",
    features: [
      ["Rent tracking", "Monthly rent, payments received and dues pending, with automatic reminders."],
      ["Unit tracking", "Add buildings and rooms and see what's vacant instantly."],
      ["Tenant profiles", "ID verification, contacts and history in one secure record."],
      ["Business dashboard", "Occupancy rates and revenue trends for every property."],
    ],
    Scene: TenantEase,
  },
  {
    id: "revio",
    name: "Revio",
    tagline: "Every review answered, at every branch.",
    body: "Revio brings reviews from Google, social media and industry sites into one feed. It drafts a professional reply to each one, tracks sentiment per location and flags a problem before it becomes a crisis.",
    features: [
      ["Cross-platform sync", "Google, social and industry reviews in one place."],
      ["AI replies", "A drafted response for every review, ready to approve or edit."],
      ["Sentiment by branch", "Ratings and mood tracked for each location separately."],
      ["Roles and access", "Admins, brand managers and branch advisors see what they need."],
    ],
    Scene: Revio,
  },
];

function AppFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="window-shadow overflow-hidden rounded-[22px] border border-line bg-deep" aria-hidden="true">
      <TitleBar title={title} />
      <div className="p-3 sm:p-4">{children}</div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <>
      <PageIntro
        title="Products we build and run"
        lead="Alongside client work, we build our own software. Each one started as a problem we kept seeing in the businesses and students we work with."
      >
        {products.map((p) => (
          <a
            key={p.id}
            href={`#${p.id}`}
            className="rounded-full border border-line px-5 py-2.5 font-semibold transition-colors hover:border-teal hover:text-teal"
          >
            {p.name}
          </a>
        ))}
      </PageIntro>

      {products.map((p, idx) => (
        <section
          key={p.id}
          id={p.id}
          aria-labelledby={`${p.id}-title`}
          className="mx-auto max-w-6xl scroll-mt-20 border-t border-line px-4 py-20 sm:px-6 md:py-24"
        >
          <div className={`grid items-center gap-12 lg:grid-cols-2 ${idx % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div>
              <h2 id={`${p.id}-title`} className="reveal text-title font-semibold">
                {p.name}
              </h2>
              <p className="reveal mt-3 text-xl tracking-tight text-teal">{p.tagline}</p>
              <p className="reveal mt-5 max-w-lg text-lg leading-relaxed text-mist">{p.body}</p>
              <dl className="mt-8 grid gap-5 sm:grid-cols-2">
                {p.features.map(([name, body], i) => (
                  <div key={name} style={{ "--i": i } as React.CSSProperties} className="reveal border-t border-line pt-4">
                    <dt className="font-semibold">{name}</dt>
                    <dd className="mt-1 text-[15px] leading-relaxed text-mist">{body}</dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/contact?need=products"
                className="reveal mt-8 inline-block rounded-full bg-teal px-6 py-3 font-semibold text-ink transition-colors hover:bg-paper"
              >
                Book a {p.name} demo
              </Link>
            </div>
            <div className="reveal">
              <AppFrame title={p.name}>
                <p.Scene />
              </AppFrame>
            </div>
          </div>
        </section>
      ))}

      <CtaBand title="Need something none of these do?" dim="We build custom software too." />
    </>
  );
}
