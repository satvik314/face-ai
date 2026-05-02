import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mirror — AI Skincare & Makeup Try-On",
  description:
    "Upload your photo and see how skincare and makeup products look on your skin, powered by Nano Banana Pro (Gemini 3 Pro Image).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream bg-grain antialiased">{children}</body>
    </html>
  );
}
