"use server";

import { headers } from "next/headers";
import { getJob } from "@/lib/content";
import { saveApplication, saveLead, saveSubscriber } from "@/lib/db";
import { allow, applicationSchema, fieldErrors, leadSchema, subscriberSchema } from "@/lib/leads";
import { contact, needs } from "@/lib/site";

export type FormState = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
  values?: Record<string, string>;
};

const LEAD_FIELDS = ["name", "email", "company", "need", "message"] as const;

async function clientIp() {
  return (await headers()).get("x-forwarded-for")?.split(",")[0].trim() || "local";
}

export async function submitLead(_prev: FormState, form: FormData): Promise<FormState> {
  const values = Object.fromEntries(LEAD_FIELDS.map((k) => [k, String(form.get(k) ?? "")]));

  // Honeypot: bots fill the hidden field. Report success so they don't retry.
  if (form.get("website")) return { ok: true, message: "Thanks. We'll be in touch." };

  if (!allow(`lead:${await clientIp()}`)) {
    return {
      ok: false,
      values,
      message: `Too many messages from this network in the last 10 minutes. Try again later or email ${contact.email}.`,
    };
  }

  const parsed = leadSchema.safeParse(values);
  if (!parsed.success) return { ok: false, values, errors: fieldErrors(parsed.error) };

  try {
    await saveLead(parsed.data);
  } catch (err) {
    console.error("saveLead failed", err);
    return {
      ok: false,
      values,
      message: `Your message wasn't saved. Try again, or email ${contact.email} directly.`,
    };
  }

  // The lead is already stored, so a failed email never loses it.
  const lead = parsed.data;
  await emailTeam(
    `New project enquiry: ${lead.name} (${needs[lead.need]})`,
    [`Name: ${lead.name}`, `Email: ${lead.email}`, `Company: ${lead.company || "-"}`, `Needs: ${needs[lead.need]}`, "", lead.message].join("\n"),
    lead.email,
  );

  const first = parsed.data.name.split(" ")[0];
  return {
    ok: true,
    message: `Thanks, ${first}. We've received your project details and will reply to ${parsed.data.email} within 24 hours.`,
  };
}

export async function subscribe(_prev: FormState, form: FormData): Promise<FormState> {
  const values = { email: String(form.get("email") ?? "") };
  if (!allow(`sub:${await clientIp()}`)) {
    return { ok: false, values, message: "Too many attempts from this network. Try again in 10 minutes." };
  }
  const parsed = subscriberSchema.safeParse(values);
  if (!parsed.success) return { ok: false, values, errors: fieldErrors(parsed.error) };
  try {
    await saveSubscriber(parsed.data.email);
  } catch (err) {
    console.error("saveSubscriber failed", err);
    return { ok: false, values, message: "Subscription wasn't saved. Try again in a minute." };
  }
  return { ok: true, message: `Subscribed. The next briefing goes to ${parsed.data.email}.` };
}

const APPLICATION_FIELDS = ["role", "name", "email", "phone", "portfolio", "linkedin", "message"] as const;

export async function submitApplication(_prev: FormState, form: FormData): Promise<FormState> {
  const values = Object.fromEntries(APPLICATION_FIELDS.map((k) => [k, String(form.get(k) ?? "")]));
  if (form.get("website")) return { ok: true, message: "Application received." };

  if (!allow(`apply:${await clientIp()}`)) {
    return {
      ok: false,
      values,
      message: `Too many applications from this network in the last 10 minutes. Try again later or email ${contact.email}.`,
    };
  }

  const parsed = applicationSchema.safeParse(values);
  if (!parsed.success) return { ok: false, values, errors: fieldErrors(parsed.error) };
  const a = parsed.data;
  const job = getJob(a.role);
  if (!job) return { ok: false, values, message: "This role is no longer open. Pick another from the careers page." };

  try {
    await saveApplication(a);
  } catch (err) {
    console.error("saveApplication failed", err);
    return { ok: false, values, message: `Your application wasn't saved. Try again, or email ${contact.email}.` };
  }

  await emailTeam(
    `New application: ${a.name} for ${job.title}`,
    [`Role: ${job.title}`, `Name: ${a.name}`, `Email: ${a.email}`, `Phone: ${a.phone}`, `Portfolio: ${a.portfolio}`, `LinkedIn: ${a.linkedin || "-"}`, "", a.message].join("\n"),
    a.email,
  );

  return {
    ok: true,
    message: `Thanks, ${a.name.split(" ")[0]}. Your application for ${job.title} is in. We review applications within 48 hours and will write to ${a.email}.`,
  };
}

// Email the team through Resend when it's configured; otherwise submissions live in the database only.
async function emailTeam(subject: string, text: string, replyTo: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_INBOX;
  if (!key || !to) return;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.LEADS_FROM ?? "Cynbit website <onboarding@resend.dev>",
        to,
        reply_to: replyTo,
        subject,
        text,
      }),
    });
    if (!res.ok) console.error("Lead email failed", res.status, await res.text());
  } catch (err) {
    console.error("Lead email failed", err);
  }
}
