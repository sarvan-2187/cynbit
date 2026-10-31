import "server-only";
import { createClient, type Client } from "@libsql/client";
import type { Application, Lead } from "./leads";

// Local: a SQLite file next to the app. Deployed: a Turso/libSQL URL via env.
let client: Client | undefined;
let ready: Promise<unknown> | undefined;

function db() {
  client ??= createClient({
    url: process.env.DATABASE_URL ?? "file:leads.db",
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });
  ready ??= client.batch([
    `create table if not exists leads (
      id integer primary key autoincrement,
      name text not null,
      email text not null,
      company text not null default '',
      need text not null,
      message text not null,
      created_at text not null default (datetime('now'))
    )`,
    `create table if not exists applications (
      id integer primary key autoincrement,
      role text not null,
      name text not null,
      email text not null,
      phone text not null,
      portfolio text not null,
      linkedin text not null default '',
      message text not null,
      created_at text not null default (datetime('now'))
    )`,
    `create table if not exists subscribers (
      email text primary key,
      created_at text not null default (datetime('now'))
    )`,
  ]);
  return { client, ready };
}

export async function saveLead(lead: Lead) {
  const { client, ready } = db();
  await ready;
  await client.execute({
    sql: "insert into leads (name, email, company, need, message) values (?, ?, ?, ?, ?)",
    args: [lead.name, lead.email, lead.company, lead.need, lead.message],
  });
}

export async function saveApplication(a: Application) {
  const { client, ready } = db();
  await ready;
  await client.execute({
    sql: "insert into applications (role, name, email, phone, portfolio, linkedin, message) values (?, ?, ?, ?, ?, ?, ?)",
    args: [a.role, a.name, a.email, a.phone, a.portfolio, a.linkedin, a.message],
  });
}

export async function saveSubscriber(email: string) {
  const { client, ready } = db();
  await ready;
  await client.execute({ sql: "insert or ignore into subscribers (email) values (?)", args: [email] });
}
