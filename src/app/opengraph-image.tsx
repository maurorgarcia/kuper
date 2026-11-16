import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

// Imagen para compartir en redes (1200×630): logo original en blanco sobre turquesa profundo.
export const alt = "KUPER Medicina Estética · Nueva Córdoba";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const logo = await readFile(path.join(process.cwd(), "public/assets/kuper-logo-white.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", padding: "0 96px", background: "#1B5F5D", color: "#fff", gap: 80 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={300} height={288} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 28, letterSpacing: 6, textTransform: "uppercase", color: "#9DD3CC" }}>Medicina estética · Nueva Córdoba</div>
          <div style={{ fontSize: 76, fontWeight: 300, lineHeight: 1.05, display: "flex", flexWrap: "wrap" }}>
            <span style={{ marginRight: 18 }}>Cuidarte, con</span>
            <span style={{ color: "#D3EBE4", fontWeight: 600 }}>criterio profesional.</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
