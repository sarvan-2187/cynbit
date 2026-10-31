import type { MetadataRoute } from "next";
import { caseStudies, jobs, posts } from "@/lib/content";
import { siteUrl } from "@/lib/site";

const pages = ["", "/services", "/products", "/case-studies", "/careers", "/blog", "/story", "/team", "/impact", "/bitelevate", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((p) => ({ url: `${siteUrl}${p}`, priority: p ? 0.8 : 1 })),
    ...caseStudies.map((c) => ({ url: `${siteUrl}/case-studies/${c.slug}`, priority: 0.6 })),
    ...jobs.map((j) => ({ url: `${siteUrl}/careers/${j.slug}`, priority: 0.6 })),
    ...posts.map((p) => ({
      url: `${siteUrl}/blog/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : undefined,
      priority: 0.5,
    })),
  ];
}
