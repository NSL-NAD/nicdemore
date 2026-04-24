import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nic DeMore: Builder. Operator. Founder.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#1C1917",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* GAS Orange accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "#F4631E",
          }}
        />

        {/* GAS dot */}
        <div
          style={{
            position: "absolute",
            top: "48px",
            right: "80px",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            background: "#F4631E",
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: "80px",
            fontWeight: 800,
            color: "#FAF9F6",
            lineHeight: 1.0,
            letterSpacing: "-0.025em",
            marginBottom: "20px",
          }}
        >
          Nic DeMore
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "32px",
            fontWeight: 500,
            color: "#F4631E",
            letterSpacing: "0.02em",
            marginBottom: "32px",
          }}
        >
          Builder. Operator. Founder.
        </div>

        {/* Subtext */}
        <div
          style={{
            fontSize: "18px",
            color: "rgba(250,249,246,0.5)",
            maxWidth: "700px",
            lineHeight: 1.5,
          }}
        >
          Co-founder of Margle Media and Good at Scale Studio. Building AI-native products and purpose-driven ventures from Milwaukee, WI.
        </div>

        {/* Bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            left: "80px",
            fontSize: "14px",
            color: "rgba(250,249,246,0.3)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          nicdemore.com
        </div>
      </div>
    ),
    { ...size }
  );
}
