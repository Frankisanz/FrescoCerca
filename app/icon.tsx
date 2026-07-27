import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "18px",
          background: "#153a43",
          color: "#f6d56b",
          fontSize: 38,
          fontWeight: 800,
          letterSpacing: "-4px",
        }}
      >
        F°
      </div>
    ),
    size,
  );
}
