import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "中部建設株式会社";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const logoPath = join(process.cwd(), "public/images/中部建設ロゴ.png");
  const logoData = await readFile(logoPath);
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <img
          src={logoBase64}
          alt="中部建設株式会社"
          style={{
            width: 500,
            height: "auto",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
