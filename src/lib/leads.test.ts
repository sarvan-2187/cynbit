import { test } from "node:test";
import assert from "node:assert/strict";
import { allow, applicationSchema, fieldErrors, leadSchema } from "./leads.ts";

const valid = {
  name: "Priya Sharma",
  email: "priya@example.com",
  company: "",
  need: "ai",
  message: "We want an agent that answers WhatsApp enquiries after hours.",
};

test("accepts a complete lead and trims whitespace", () => {
  const r = leadSchema.safeParse({ ...valid, name: "  Priya Sharma  " });
  assert.ok(r.success);
  assert.equal(r.data.name, "Priya Sharma");
});

test("reports one message per invalid field", () => {
  const r = leadSchema.safeParse({ ...valid, email: "not-an-email", need: "pizza", message: "hi" });
  assert.ok(!r.success);
  const errors = fieldErrors(r.error);
  assert.deepEqual(Object.keys(errors).sort(), ["email", "message", "need"]);
  assert.match(errors.message, /20 characters/);
});

test("job application: optional LinkedIn may be blank, links must be real URLs", () => {
  const base = {
    role: "full-stack-developer-intern",
    name: "Arjun Mehta",
    email: "arjun@example.com",
    phone: "+91 98765 43210",
    portfolio: "https://github.com/arjun",
    linkedin: "",
    message: "I have shipped two Next.js apps and want to work on client products.",
  };
  assert.ok(applicationSchema.safeParse(base).success);
  const r = applicationSchema.safeParse({ ...base, portfolio: "my resume", linkedin: "linkedin", phone: "12" });
  assert.ok(!r.success);
  assert.deepEqual(Object.keys(fieldErrors(r.error)).sort(), ["linkedin", "phone", "portfolio"]);
});

test("rate limiter blocks after the limit and frees up after the window", () => {
  const t0 = 1_000_000;
  for (let i = 0; i < 3; i++) assert.ok(allow("ip-a", 3, 60_000, t0 + i));
  assert.equal(allow("ip-a", 3, 60_000, t0 + 10), false);
  assert.ok(allow("ip-b", 3, 60_000, t0 + 10), "other keys are unaffected");
  assert.ok(allow("ip-a", 3, 60_000, t0 + 60_005), "window has passed");
});
