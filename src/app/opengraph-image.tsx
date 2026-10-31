import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// PNG social preview. The live site points og:image at an SVG, which LinkedIn, X and WhatsApp don't render.
export const alt = "Cynbit Technologies: software your business runs on";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  // Same typeface as the site. next/og needs static TTF or WOFF files, not woff2.
  const font = (file: string) => readFile(join(process.cwd(), "src/fonts", file));
  const [medium, bold] = await Promise.all([font("Geist-Medium.woff"), font("Geist-Bold.woff")]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          fontFamily: "Geist",
          color: "#0b1715",
          background: "radial-gradient(110% 70% at 50% 100%, #c5e4e0 0%, #f6f8f7 65%)",
        }}
      >
        <div style={{ fontSize: 34, color: "#006067", marginBottom: 24 }}>Cynbit Technologies</div>
        <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -3.5, lineHeight: 1 }}>
          Software your business runs on.
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -3.5, lineHeight: 1, color: "rgba(11,23,21,0.5)" }}>
          Designed and built in Jaipur.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: medium, weight: 500, style: "normal" },
        { name: "Geist", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
