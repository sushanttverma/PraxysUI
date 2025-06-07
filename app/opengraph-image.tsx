import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Praxys UI - Animated React Components";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#050505",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(60% 50% at 50% 45%, rgba(232,78,45,0.15), transparent 70%)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "#E84E2D",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontWeight: 700,
              color: "#050505",
            }}
          >
            P
          </div>
          <span
            style={{
              fontSize: "48px",
              fontWeight: 700,
              color: "#F2ECE2",
              letterSpacing: "-0.02em",
            }}
          >
            Praxys UI
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: "28px",
            color: "#C9958A",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          44 beautifully crafted, animated React components.
        </p>
        <p
          style={{
            fontSize: "22px",
            color: "#6b6560",
            marginTop: "12px",
          }}
        >
          Browse. Copy. Paste. Ship.
        </p>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            gap: "24px",
            fontSize: "16px",
            color: "#6b6560",
          }}
        >
          <span>Next.js 16</span>
          <span style={{ color: "#3d3937" }}>·</span>
          <span>React 19</span>
          <span style={{ color: "#3d3937" }}>·</span>
          <span>Tailwind CSS 4</span>
          <span style={{ color: "#3d3937" }}>·</span>
          <span>Framer Motion</span>
          <span style={{ color: "#3d3937" }}>·</span>
          <span style={{ color: "#E84E2D" }}>ui.praxys.xyz</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
