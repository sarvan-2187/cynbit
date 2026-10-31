import blog from "@/content/blog.json";
import cases from "@/content/cases.json";
import careers from "@/content/careers.json";

// Content migrated from cynbit.in by research/scripts/scrape.mjs.

export type Block = { type: "h2" | "h3"; text: string } | { type: "p" | "ul" | "ol" | "table"; html: string };
export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string | null;
  image: string | null;
  blocks: Block[];
};
export type CaseStudy = (typeof cases)[number];
export type Job = (typeof careers)[number];

const time = (d: string | null) => (d ? Date.parse(d) : 0);

export const posts = (blog as Post[]).toSorted((a, b) => time(b.date) - time(a.date));
export const caseStudies: CaseStudy[] = cases;
export const jobs: Job[] = careers;

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const getCase = (slug: string) => caseStudies.find((c) => c.slug === slug);
export const getJob = (slug: string) => jobs.find((j) => j.slug === slug);

/** Jobs grouped by team, in the order teams first appear. */
export function jobsByTeam() {
  const groups = new Map<string, Job[]>();
  for (const job of jobs) groups.set(job.team, [...(groups.get(job.team) ?? []), job]);
  return [...groups];
}

/** Rough reading time from the article text. */
export function readingMinutes(post: Post) {
  const words = post.blocks
    .map((b) => ("text" in b ? b.text : b.html.replace(/<[^>]+>/g, " ")))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
