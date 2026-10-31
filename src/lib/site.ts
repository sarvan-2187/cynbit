// Pages outside the prototype's scope link to the live site.
export const LIVE = "https://www.cynbit.in";

// This deployment's own URL: explicit SITE_URL, else Vercel's production domain, else local.
export const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const contact = {
  email: "opportunities@cynbit.in",
  phones: ["+91 89479 62667", "+91 78912 09777", "+91 83023 37367"],
  address: "32/115 Pratap Nagar, Jaipur, Rajasthan 302033",
};

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Work", href: "/case-studies" },
  { label: "BitElevate", href: "/bitelevate" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
];

export const needs = {
  ai: "AI automation",
  software: "Software or cloud platform",
  growth: "Growth and SEO",
  products: "One of our products",
  other: "Something else",
} as const;

export const tel =(p: string) => `tel:${p.replace(/\s/g, "")}`;
