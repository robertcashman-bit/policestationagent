import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Custody Note – The custody note app for freelance police station reps";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
        >
          <rect
            x="4"
            y="8"
            width="56"
            height="48"
            rx="6"
            stroke="#60a5fa"
            strokeWidth="3"
          />
          <line
            x1="14"
            y1="22"
            x2="50"
            y2="22"
            stroke="#60a5fa"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="14"
            y1="32"
            x2="42"
            y2="32"
            stroke="#60a5fa"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="14"
            y1="42"
            x2="36"
            y2="42"
            stroke="#60a5fa"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="50" cy="46" r="10" fill="#2563eb" />
          <path
            d="M47 46l2.5 2.5L53 44"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div
          style={{
            marginTop: 32,
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          Custody Note
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 24,
            color: "#94a3b8",
            maxWidth: 700,
            textAlign: "center",
          }}
        >
          The custody note app for freelance police station reps and criminal
          solicitors
        </div>
        <div
          style={{
            marginTop: 32,
            display: "flex",
            gap: 24,
            fontSize: 18,
            color: "#60a5fa",
          }}
        >
          <span>LAA-compliant</span>
          <span>&bull;</span>
          <span>Offline-first</span>
          <span>&bull;</span>
          <span>Encrypted backups</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
