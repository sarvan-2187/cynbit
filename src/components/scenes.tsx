// Mock product screens shown inside the hero window. Figures are illustrative.
import { Star } from "lucide-react";

const card = "rounded-xl border border-line bg-ink";
const pill = "rounded-full px-2 py-0.5 text-[12px] font-medium";

export function LeadDesk() {
  const leads = [
    { name: "Aarav Clinics", via: "WhatsApp", status: "Call booked", tone: "bg-amber/15 text-amber" },
    { name: "Northwind Foods", via: "Email", status: "Qualified", tone: "bg-teal/15 text-teal" },
    { name: "Meera Interiors", via: "Website", status: "Replied in 38s", tone: "bg-paper/10 text-mist" },
    { name: "Kota Logistics", via: "WhatsApp", status: "New", tone: "bg-paper/10 text-mist" },
  ];
  return (
    <div className="grid h-full gap-3 md:grid-cols-[240px_1fr]">
      <ul className="hidden content-start gap-2 md:grid">
        {leads.map((l, i) => (
          <li key={l.name} className={`${card} p-3 ${i === 0 ? "border-teal/40" : ""}`}>
            <p className="text-[14px] font-semibold">{l.name}</p>
            <div className="mt-1 flex items-center justify-between text-[12px] text-dim">
              {l.via}
              <span className={`${pill} ${l.tone}`}>{l.status}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className={`${card} flex flex-col gap-3 p-5 text-[15px] leading-relaxed`}>
        <p className="text-[12px] text-dim">Aarav Clinics, WhatsApp, 9:42 pm</p>
        <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-panel px-4 py-2.5 text-paper">
          Hi, we run three clinics in Jaipur and miss most evening enquiries. Can you help?
        </p>
        <p className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-teal px-4 py-2.5 text-ink">
          Yes. I can answer after-hours messages and book appointments straight into your calendar. Roughly how many
          enquiries come in each evening?
        </p>
        <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-panel px-4 py-2.5 text-paper">Around 30 across the three.</p>
        <p className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-teal px-4 py-2.5 text-ink">
          That&apos;s a good fit. I&apos;ve booked a 20-minute discovery call with the Cynbit team for Tuesday at
          11:00 and sent the invite to your email.
        </p>
        <div className="mt-auto grid gap-2 sm:grid-cols-2">
          <p className="rounded-lg border border-teal/30 px-3 py-2 text-[13px] text-teal">
            Qualified: healthcare, 3 locations
          </p>
          <p className="rounded-lg border border-amber/30 px-3 py-2 text-[13px] text-amber">
            Discovery call booked, Tue 11:00
          </p>
        </div>
      </div>
    </div>
  );
}

export function Dashboard() {
  const kpis = [
    ["Revenue this month", "₹18.4L", "+12%"],
    ["Orders", "1,284", "+6%"],
    ["Avg. fulfilment", "1.8 days", "−0.4"],
    ["Open tickets", "23", "−9"],
  ];
  const bars = [42, 55, 48, 61, 58, 70, 66, 74, 69, 82, 78, 91];
  return (
    <div className="grid h-full content-start gap-3">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map(([label, value, delta]) => (
          <div key={label} className={`${card} p-3`}>
            <p className="text-[12px] text-dim">{label}</p>
            <p className="mt-1 text-xl font-semibold tracking-tight">{value}</p>
            <p className="text-[12px] text-teal">{delta} vs last month</p>
          </div>
        ))}
      </div>
      <div className={`${card} p-4`}>
        <p className="text-[13px] text-mist">Revenue by month</p>
        <div className="mt-3 flex h-36 items-end gap-1.5 md:h-48" aria-hidden="true">
          {bars.map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%` }}
              className={`flex-1 rounded-t-md ${i === bars.length - 1 ? "bg-teal" : "bg-brand/70"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Studio() {
  const skills = [
    ["Logic", 78],
    ["Execution", 84],
    ["Code quality", 71],
  ] as const;
  return (
    <div className="grid h-full gap-3 md:grid-cols-[1.4fr_1fr]">
      <div className={`${card} flex flex-col overflow-hidden`}>
        <p className="border-b border-line px-4 py-2 text-[13px] text-mist">Mission 14: build a rate limiter</p>
        <pre className="overflow-hidden p-4 font-mono text-[13px] leading-relaxed text-mist">
          <code>
            <span className="text-teal">function</span> allow(key, limit, windowMs) {"{"}
            {"\n"}  <span className="text-teal">const</span> now = Date.now();
            {"\n"}  <span className="text-teal">const</span> recent = hits.get(key)
            {"\n"}    .filter(t =&gt; now - t &lt; windowMs);
            {"\n"}  <span className="text-teal">if</span> (recent.length &gt;= limit) <span className="text-teal">return</span> <span className="text-amber">false</span>;
            {"\n"}  hits.set(key, [...recent, now]);
            {"\n"}  <span className="text-teal">return</span> <span className="text-amber">true</span>;
            {"\n"}{"}"}
          </code>
        </pre>
        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-1 border-t border-line px-4 py-3 text-[13px]">
          <span className="text-teal">6 tests passed</span>
          <span className="text-amber">1 failing: resets after the window</span>
          <span className="text-dim">Run time 42 ms</span>
        </div>
      </div>
      <div className="grid content-start gap-3">
        <div className={`${card} p-4`}>
          <p className="text-[12px] text-dim">AI review</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight">
            86<span className="text-base text-dim">/100</span>
          </p>
          <ul className="mt-2 grid gap-1 text-[13px] text-mist">
            <li className="text-teal">Handles bursts correctly</li>
            <li className="text-amber">Add a test for the window reset</li>
          </ul>
        </div>
        <div className={`${card} grid gap-2 p-4`}>
          {skills.map(([label, v]) => (
            <div key={label}>
              <div className="flex justify-between text-[12px] text-mist">
                {label}
                <span>{v}</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-panel">
                <div style={{ width: `${v}%` }} className="h-full rounded-full bg-teal" />
              </div>
            </div>
          ))}
        </div>
        <div className={`${card} p-4`}>
          <p className="text-[12px] text-dim">Progress</p>
          <p className="mt-1 text-[14px] text-paper">2,340 XP</p>
          <p className="text-[13px] text-mist">Intermediate certificate in 3 more missions</p>
        </div>
      </div>
    </div>
  );
}

export function TenantEase() {
  // Shanti Residency: 4 floors x 4 flats. 14 of 16 occupied (88%), two with rent due.
  const due = new Set([204, 402]);
  const vacant = new Set([104, 403]);
  const floors = [4, 3, 2, 1];
  const tone = (n: number) =>
    vacant.has(n)
      ? ["border border-dashed border-line text-dim", "Vacant"]
      : due.has(n)
        ? ["border border-amber/40 bg-amber/10 text-amber", "Rent due"]
        : ["border border-teal/25 bg-teal/10 text-paper", "Occupied"];
  const rent = [
    ["Flat 204", "Meera S.", "₹14,000", "Due in 2 days, reminder scheduled", "text-amber"],
    ["Flat 302", "Kapoor family", "₹16,500", "Paid 1 Oct", "text-teal"],
    ["Flat 103", "Rohan V.", "₹11,000", "Paid 3 Oct", "text-teal"],
  ];
  return (
    <div className="grid h-full gap-3 md:grid-cols-[1.1fr_1fr]">
      <div className={`${card} flex flex-col p-4`}>
        <div className="flex items-baseline justify-between">
          <p className="text-[14px] font-semibold">Shanti Residency</p>
          <p className="text-[13px] text-teal">14 of 16 flats occupied</p>
        </div>
        <div className="mt-3 grid flex-1 content-center gap-2">
          {floors.map((f) => (
            <div key={f} className="grid grid-cols-[52px_repeat(4,1fr)] items-center gap-2">
              <span className="text-[12px] text-dim">Floor {f}</span>
              {[1, 2, 3, 4].map((u) => {
                const n = f * 100 + u;
                const [cls, label] = tone(n);
                return (
                  <div key={n} className={`rounded-lg px-2 py-1.5 ${cls}`}>
                    <p className="text-[13px] font-semibold leading-tight">{n}</p>
                    <p className="text-[11px] leading-tight opacity-80">{label}</p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-3 text-[12px] text-mist">
          <li className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm border border-teal/25 bg-teal/10" /> Occupied
          </li>
          <li className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm border border-amber/40 bg-amber/10" /> Rent due
          </li>
          <li className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm border border-dashed border-line" /> Vacant
          </li>
        </ul>
      </div>
      <div className="grid content-start gap-3">
        <div className={`${card} p-4`}>
          <p className="text-[12px] text-dim">Rent collected this month</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight">
            ₹3.1L <span className="text-base font-normal text-dim">of ₹3.4L</span>
          </p>
          <div className="mt-2 h-1.5 rounded-full bg-panel">
            <div className="h-full w-[91%] rounded-full bg-teal" />
          </div>
        </div>
        <ul className={`${card} divide-y divide-line`}>
          {rent.map(([unit, tenant, amount, status, tcls]) => (
            <li key={unit} className="flex items-center justify-between gap-3 px-4 py-3 text-[14px]">
              <div>
                <p className="font-semibold">
                  {unit} <span className="font-normal text-dim">{tenant}</span>
                </p>
                <p className={`text-[13px] ${tcls}`}>{status}</p>
              </div>
              <p className="text-mist">{amount}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Revio() {
  const branches = [
    ["Malviya Nagar", 4.7],
    ["C-Scheme", 4.5],
    ["Vaishali Nagar", 4.1],
  ] as const;
  return (
    <div className="grid h-full gap-3 md:grid-cols-[1.4fr_1fr]">
      <div className="grid content-start gap-3">
        <div className={`${card} p-4 text-[14px]`}>
          <div className="flex items-center justify-between text-[12px] text-dim">
            Google, Vaishali Nagar
            <span className={`${pill} bg-rose/15 text-rose`}>Negative</span>
          </div>
          <p className="mt-2 flex gap-0.5 text-amber" role="img" aria-label="2 out of 5 stars">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} size={14} aria-hidden="true" fill={i < 2 ? "currentColor" : "none"} />
            ))}
          </p>
          <p className="mt-1 text-mist">Waited 40 minutes for a table even with a booking.</p>
          <div className="mt-3 rounded-lg border border-teal/30 bg-brand/20 p-3">
            <p className="text-[12px] text-teal">AI draft reply</p>
            <p className="mt-1 text-[13px] text-paper">
              Sorry about the wait. That&apos;s not how bookings should work. We&apos;ve shared this with the
              Vaishali Nagar team and would like to host you again.
            </p>
            <div className="mt-2 flex gap-2 text-[12px]">
              <span className="rounded-full bg-teal px-3 py-1 font-semibold text-ink">Approve and post</span>
              <span className="rounded-full border border-line px-3 py-1 text-mist">Edit</span>
            </div>
          </div>
        </div>
        <div className={`${card} p-4 text-[14px]`}>
          <div className="flex items-center justify-between text-[12px] text-dim">
            Instagram, Malviya Nagar
            <span className={`${pill} bg-teal/15 text-teal`}>Positive</span>
          </div>
          <p className="mt-1 text-mist">Best filter coffee in the city. Staff remembered my order.</p>
        </div>
      </div>
      <div className="grid content-start gap-3">
        <div className={`${card} p-4`}>
          <p className="text-[12px] text-dim">Sentiment score</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight">94%</p>
        </div>
        <ul className={`${card} grid gap-3 p-4`}>
          {branches.map(([name, rating]) => (
            <li key={name}>
              <div className="flex justify-between text-[13px] text-mist">
                {name}
                <span>{rating}</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-panel">
                <div style={{ width: `${(rating / 5) * 100}%` }} className="h-full rounded-full bg-teal" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
