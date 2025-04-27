import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

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
      <body>
        <Toaster position="bottom-right"/>
        {children}
      </body>
    </html>
  );
}
