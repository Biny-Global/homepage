import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MouseFollower from "@/components/MouseFollower";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "비니 | 클라우드, AI 플랫폼 개발",
  description: "비니(BINY)의 혁신적인 클라우드 및 AI 소프트웨어 제품으로 기업의 디지털 전환을 가속화하세요.",
  icons: {
    icon: "/assets/images/logo.png",
    apple: "/assets/images/logo.png",
    shortcut: "/assets/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MouseFollower />
        {children}
      </body>
    </html>
  );
}
