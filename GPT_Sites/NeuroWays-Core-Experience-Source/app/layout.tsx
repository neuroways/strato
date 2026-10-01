import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NeuroWays Core Experience",
  description: "Ein ruhiger interaktiver NeuroWays Experience-Prototyp.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
