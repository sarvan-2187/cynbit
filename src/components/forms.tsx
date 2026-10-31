"use client";

import { useActionState } from "react";
import { submitApplication, submitLead, subscribe, type FormState } from "@/app/actions";
import { needs } from "@/lib/site";

const initial: FormState = { ok: false };

const input =
  "w-full rounded-xl border border-line bg-deep px-4 py-3 text-paper placeholder:text-dim transition-colors hover:border-teal/40 focus:border-teal focus:outline-none aria-[invalid=true]:border-rose";

function Field({
  name,
  label,
  hint,
  error,
  children,
}: {
  name: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid content-start gap-2">
      <label htmlFor={name} className="text-[15px] font-medium text-paper">
        {label} {hint && <span className="font-normal text-dim">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="text-sm text-rose">
          {error}
        </p>
      )}
    </div>
  );
}

const a11y = (name: string, state: FormState) => ({
  id: name,
  name,
  "aria-invalid": Boolean(state.errors?.[name]),
  "aria-describedby": state.errors?.[name] ? `${name}-error` : undefined,
});

export function ContactForm({ defaultNeed }: { defaultNeed?: string }) {
  const [state, action, pending] = useActionState(submitLead, initial);

  if (state.ok) {
    return (
      <div role="status" className="rounded-3xl border border-teal/30 bg-brand/20 p-8">
        <p className="text-2xl font-semibold tracking-tight text-paper">Project details sent</p>
        <p className="mt-3 text-mist">{state.message}</p>
      </div>
    );
  }

  const v = state.values ?? {};
  return (
    <form action={action} noValidate className="relative grid gap-5 rounded-3xl border border-line bg-panel/60 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Name" error={state.errors?.name}>
          <input {...a11y("name", state)} defaultValue={v.name} autoComplete="name" required className={input} />
        </Field>
        <Field name="email" label="Work email" error={state.errors?.email}>
          <input
            {...a11y("email", state)}
            type="email"
            defaultValue={v.email}
            autoComplete="email"
            required
            className={input}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="company" label="Company" hint="(optional)" error={state.errors?.company}>
          <input {...a11y("company", state)} defaultValue={v.company} autoComplete="organization" className={input} />
        </Field>
        <Field name="need" label="What do you need?" error={state.errors?.need}>
          <select {...a11y("need", state)} defaultValue={v.need ?? defaultNeed ?? ""} required className={input}>
            <option value="" disabled>
              Choose one
            </option>
            {Object.entries(needs).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field name="message" label="About the project" error={state.errors?.message}>
        <textarea
          {...a11y("message", state)}
          defaultValue={v.message}
          rows={5}
          required
          placeholder="What are you building, what's slowing you down, and when do you need it?"
          className={`${input} resize-y`}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {state.message && (
        <p role="alert" className="rounded-xl border border-rose/40 bg-rose/10 px-4 py-3 text-sm text-paper">
          {state.message}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-teal px-6 py-3 font-semibold text-ink transition-colors hover:bg-paper disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send project details"}
        </button>
        <p className="text-sm text-dim">We reply within 24 hours on working days.</p>
      </div>
    </form>
  );
}

export function ApplicationForm({ role, title }: { role: string; title: string }) {
  const [state, action, pending] = useActionState(submitApplication, initial);

  if (state.ok) {
    return (
      <div role="status" className="rounded-3xl border border-teal/30 bg-brand/20 p-8">
        <p className="text-2xl font-semibold tracking-tight text-paper">Application sent</p>
        <p className="mt-3 text-mist">{state.message}</p>
      </div>
    );
  }

  const v = state.values ?? {};
  return (
    <form action={action} noValidate className="relative grid gap-5 rounded-3xl border border-line bg-deep p-6 sm:p-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Apply for this role</h2>
        <p className="mt-1 text-[15px] text-mist">Six fields. It takes about two minutes.</p>
      </div>
      <input type="hidden" name="role" value={role} />

      <Field name="name" label="Name" error={state.errors?.name}>
        <input {...a11y("name", state)} defaultValue={v.name} autoComplete="name" required className={input} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="email" label="Email" error={state.errors?.email}>
          <input {...a11y("email", state)} type="email" defaultValue={v.email} autoComplete="email" required className={input} />
        </Field>
        <Field name="phone" label="Phone" error={state.errors?.phone}>
          <input {...a11y("phone", state)} type="tel" defaultValue={v.phone} autoComplete="tel" required className={input} />
        </Field>
      </div>
      <Field name="portfolio" label="Resume or portfolio link" error={state.errors?.portfolio}>
        <input
          {...a11y("portfolio", state)}
          type="url"
          defaultValue={v.portfolio}
          placeholder="https://"
          required
          className={input}
        />
      </Field>
      <Field name="linkedin" label="LinkedIn" hint="(optional)" error={state.errors?.linkedin}>
        <input {...a11y("linkedin", state)} type="url" defaultValue={v.linkedin} placeholder="https://linkedin.com/in/" className={input} />
      </Field>
      <Field name="message" label={`Why ${title}?`} error={state.errors?.message}>
        <textarea
          {...a11y("message", state)}
          defaultValue={v.message}
          rows={4}
          required
          placeholder="Something you've built, what you want to learn here, or both."
          className={`${input} resize-y`}
        />
      </Field>

      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {state.message && (
        <p role="alert" className="rounded-xl border border-rose/40 bg-rose/10 px-4 py-3 text-sm text-paper">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="justify-self-start rounded-full bg-teal px-6 py-3 font-semibold text-ink transition-colors hover:bg-paper disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send application"}
      </button>
    </form>
  );
}

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribe, initial);

  if (state.ok) return <p role="status" className="text-teal">{state.message}</p>;

  return (
    <form action={action} noValidate className="grid gap-2">
      <label htmlFor="newsletter-email" className="text-[15px] font-medium">
        Weekly engineering briefing
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="name@company.com"
          defaultValue={state.values?.email}
          aria-invalid={Boolean(state.errors?.email)}
          aria-describedby={state.errors?.email || state.message ? "newsletter-error" : undefined}
          className={`${input} py-2.5`}
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 rounded-full border border-line px-5 font-semibold text-paper transition-colors hover:border-teal hover:text-teal disabled:opacity-60"
        >
          {pending ? "…" : "Subscribe"}
        </button>
      </div>
      {(state.errors?.email || state.message) && (
        <p id="newsletter-error" className="text-sm text-rose">
          {state.errors?.email ?? state.message}
        </p>
      )}
    </form>
  );
}
