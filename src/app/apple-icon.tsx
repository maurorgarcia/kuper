import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const k = await readFile(path.join(process.cwd(), "public/assets/kuper-k-white.png"));
  const src = `data:image/png;base64,${k.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#25807E" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={112} height={70} alt="" />
      </div>
    ),
    size,
  );
}
