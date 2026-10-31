"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit" });

// Live office time. Rendered after mount so server and client HTML match.
export function JaipurTime() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()).toLowerCase());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!now) return <>We&apos;re in Jaipur, India.</>;
  return <>It&apos;s {now} in Jaipur right now.</>;
}
