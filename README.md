# Cynbit website: homepage and lead pipeline rebuild

A working prototype of a faster, clearer cynbit.in homepage and a hardened contact form backend.
Built for the Cynbit Full Stack Developer Intern assessment.

## What's in it

| Route | What it does |
|---|---|
| `/` | New homepage: hero, a pinned product window that walks through Cynbit's AI agents, dashboards, Cynbit Studio, TenantEase and Revio as you scroll, services, results, process, BitElevate, FAQ |
| `/contact` | Project enquiry form backed by a server action: validation, honeypot, rate limit, database, optional email alert |
| `/opengraph-image` | PNG link preview generated at build time |
| `/robots.txt`, `/sitemap.xml` | Generated from code |

Pages outside this scope (blog, careers, case studies and so on) link to the live site.

## Run it locally

Requires Node 20 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # validation and rate-limit tests
npm run build && npm start
```

With no environment variables set, enquiries are stored in `leads.db` (SQLite) in the project folder.
To read them:

```bash
node -e "const {createClient}=require('@libsql/client');createClient({url:'file:leads.db'}).execute('select * from leads').then(r=>console.table(r.rows))"
```

## Deploying

Copy `.env.example` to `.env.local` (or set the variables in Vercel):

- `SITE_URL`: the public URL.
- `DATABASE_URL` and `DATABASE_AUTH_TOKEN`: a Turso/libSQL database. Required on Vercel, whose filesystem is read-only. The same code runs against the local file and the hosted database.
- `RESEND_API_KEY`, `LEADS_INBOX`, `LEADS_FROM`: optional email alert for each new lead. The lead is saved before the email is sent, so a failed email never loses it.

## Results

Lighthouse 12.8, mobile preset (simulated mid-range phone on a throttled 4G connection), 31 Oct 2026.
The live site was measured at cynbit.in; the prototype was measured as a production build served locally,
so re-run against the deployed URL for a like-for-like network comparison.

| Page | Performance | Accessibility | Best practices | SEO | First paint | Largest paint | Page weight | Requests |
|---|---|---|---|---|---|---|---|---|
| Live home | 56 | 82 | 100 | 100 | 9.4 s | 11.3 s | 1,685 KB | 45 |
| **New home** | **98** | **100** | 100 | 100 | 1.2 s | 2.3 s | 241 KB | 18 |
| Live contact | 56 | 90 | 100 | 100 | 9.2 s | 11.1 s | 1,679 KB | 44 |
| **New contact** | **98** | **100** | 100 | 100 | 1.1 s | 2.4 s | 227 KB | 15 |

Where the weight went: the live site loads the full 1.1 MB Material Symbols variable font to draw 39 icons
and keeps content invisible until scroll animations run. The prototype ships tree-shaken SVG icons, one
42 KB self-hosted variable font, and server-rendered content that is visible without JavaScript.

## Stack

Next.js 15 (App Router, server actions), React 19, TypeScript, Tailwind CSS 4, lucide-react for icons,
zod for validation, libSQL for storage.

Motion is CSS only: a one-off hero entrance, scroll-linked reveals (`animation-timeline: view()`) and small
responses to clicks and hovers. Content is visible without JavaScript, browsers without scroll timelines
simply show the finished page, and everything is switched off under `prefers-reduced-motion`.

Type is Satoshi by Indian Type Foundry (Fontshare, free for commercial use), self-hosted from `src/fonts`.
Light theme by default; the moon button in the header switches to dark and remembers the choice.
