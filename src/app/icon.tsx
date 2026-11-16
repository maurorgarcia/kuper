import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

// Favicon cuadrado: K blanca sobre círculo turquesa (recorte del logo original, sin redibujar).
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const k = await readFile(path.join(process.cwd(), "public/assets/kuper-k-white.png"));
  const src = `data:image/png;base64,${k.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#25807E", borderRadius: "50%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={40} height={25} alt="" />
      </div>
    ),
    size,
  );
}
