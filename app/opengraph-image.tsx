import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Printwear Ledgewood — Custom Screen Printing & Embroidery NJ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#080808",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* Background accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232,69,32,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "#E84520",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            padding: "0 80px",
            textAlign: "center",
          }}
        >
          {/* Brand name */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span
              style={{
                fontSize: "72px",
                fontWeight: 900,
                color: "#F0F0F0",
                letterSpacing: "-2px",
                lineHeight: 1,
                textTransform: "uppercase",
              }}
            >
              PRINTWEAR
            </span>
            <span
              style={{
                fontSize: "28px",
                fontWeight: 400,
                color: "#E84520",
                letterSpacing: "16px",
                textTransform: "uppercase",
              }}
            >
              LEDGEWOOD
            </span>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "80px",
              height: "2px",
              background: "#E84520",
              opacity: 0.6,
            }}
          />

          {/* Tagline */}
          <p
            style={{
              fontSize: "26px",
              color: "rgba(240,240,240,0.65)",
              margin: 0,
              lineHeight: 1.4,
              maxWidth: "800px",
            }}
          >
            Custom Screen Printing, Embroidery & Sublimation
          </p>

          {/* Location badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(232,69,32,0.12)",
              border: "1px solid rgba(232,69,32,0.3)",
              borderRadius: "100px",
              padding: "10px 24px",
              marginTop: "8px",
            }}
          >
            <span style={{ fontSize: "18px", color: "#E84520" }}>📍</span>
            <span
              style={{
                fontSize: "18px",
                color: "#E84520",
                fontWeight: 600,
                letterSpacing: "1px",
              }}
            >
              Ledgewood, NJ — Serving All of New Jersey
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            fontSize: "16px",
            color: "rgba(240,240,240,0.25)",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          printwearledgewood.com
        </div>
      </div>
    ),
    { ...size }
  );
}
