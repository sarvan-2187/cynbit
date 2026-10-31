import { z } from "zod";
import { needs } from "./site.ts";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80, "Use 80 characters or fewer."),
  email: z.string().trim().email("Enter an email address like name@company.com.").max(120),
  company: z.string().trim().max(120, "Use 120 characters or fewer."),
  need: z.enum(Object.keys(needs) as [keyof typeof needs], { message: "Choose what you need help with." }),
  message: z
    .string()
    .trim()
    .min(20, "Describe the project in at least 20 characters.")
    .max(4000, "Keep the message under 4,000 characters."),
});

const url = (msg: string) => z.string().trim().url(msg).max(300);

export const applicationSchema = z.object({
  role: z.string().trim().min(1).max(80),
  name: z.string().trim().min(2, "Enter your name.").max(80, "Use 80 characters or fewer."),
  email: z.string().trim().email("Enter an email address like name@example.com.").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9 ()-]{8,20}$/, "Enter a phone number, for example +91 98765 43210."),
  portfolio: url("Paste a link to your resume or portfolio, starting with https://"),
  linkedin: z.union([z.literal(""), url("Paste your LinkedIn profile link, starting with https://")]),
  message: z
    .string()
    .trim()
    .min(30, "Tell us why you want this role in at least 30 characters.")
    .max(3000, "Keep this under 3,000 characters."),
});

export type Application = z.infer<typeof applicationSchema>;

export const subscriberSchema = z.object({
  email: z.string().trim().email("Enter an email address like name@company.com.").max(120),
});

export type Lead = z.infer<typeof leadSchema>;

/** First error message per field, ready to render next to the input. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0]);
    out[key] ??= issue.message;
  }
  return out;
}

// ponytail: in-memory sliding window, per server instance. Move to Redis/Upstash
// when the site runs on more than one instance and abuse becomes real.
const hits = new Map<string, number[]>();

export function allow(key: string, limit = 5, windowMs = 10 * 60_000, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  const ok = recent.length < limit;
  if (ok) recent.push(now);
  hits.set(key, recent);
  return ok;
}
