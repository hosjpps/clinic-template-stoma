import { ImageResponse } from "next/og";
import { clinic } from "@/content/clinic";

export const dynamic = "force-static";
export const alt = `Стоматология ${clinic.name} в ${clinic.address.district}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1E3A5F",
          color: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 96, fontWeight: 700, letterSpacing: "-0.02em" }}>
          {clinic.name}
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#D7E3EC", marginTop: 12 }}>
          {`Стоматология · ${clinic.address.district}`}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#7BA3C0", marginTop: 28 }}>
          {`★ ${clinic.rating.value} · ${clinic.rating.reviews} отзывов · ${clinic.phones[0].display}`}
        </div>
      </div>
    ),
    { ...size }
  );
}
