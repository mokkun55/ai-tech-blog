import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechSum AI",
  description: "AIがあなたのために技術記事を要約します",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
