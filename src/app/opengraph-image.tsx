import { ImageResponse } from "next/og";

export const alt = "Convite de casamento de Adriele e João Paulo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#fff9f1",
        color: "#121212",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        letterSpacing: "0.08em",
        textAlign: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          color: "#b08d57",
          fontSize: 30,
          letterSpacing: "0.35em",
          marginBottom: 48,
        }}
      >
        A & J
      </div>
      <div style={{ display: "flex", fontFamily: "serif", fontSize: 86 }}>
        Adriele & João Paulo
      </div>
      <div
        style={{
          color: "#b08d57",
          display: "flex",
          fontSize: 28,
          letterSpacing: "0.3em",
          marginTop: 48,
        }}
      >
        26 DE JUNHO DE 2026
      </div>
    </div>,
    size
  );
}
