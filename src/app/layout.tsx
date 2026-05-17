import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luna — Exclusive Content",
  description: "Exclusive content and custom requests for subscribers",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="noise antialiased">{children}</body>
    </html>
  );
}
