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
  title: {
    default: "BINY | 혁신적인 클라우드 & AI 솔루션",
    template: "%s | BINY"
  },
  description: "BINY(비니)는 혁신적인 클라우드 및 AI 소프트웨어 솔루션을 제공합니다. 클라우드 플랫폼, AI 분석, 보안 솔루션, DevOps 도구로 기업의 디지털 전환을 가속화하세요.",
  keywords: [
    "BINY", "비니", "클라우드", "AI", "인공지능", "소프트웨어", "플랫폼", 
    "DevOps", "보안", "데이터 분석", "디지털 전환", "기업 솔루션",
    "Cloud Platform", "AI Analytics", "Security Suite", "Monitoring"
  ],
  authors: [{ name: "BINY Global", url: "https://biny.com" }],
  creator: "BINY Global",
  publisher: "BINY Global",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://biny.com'),
  
  // Open Graph (Facebook, KakaoTalk, etc.)
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://biny.com',
    title: 'BINY | 혁신적인 클라우드 & AI 솔루션',
    description: 'BINY(비니)는 혁신적인 클라우드 및 AI 소프트웨어 솔루션을 제공합니다. 클라우드 플랫폼, AI 분석, 보안 솔루션으로 기업의 디지털 전환을 가속화하세요.',
    siteName: 'BINY',
    images: [
      {
        url: '/assets/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BINY - 혁신적인 클라우드 & AI 솔루션',
      },
    ],
  },

  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    title: 'BINY | 혁신적인 클라우드 & AI 솔루션',
    description: 'BINY(비니)는 혁신적인 클라우드 및 AI 소프트웨어 솔루션을 제공합니다. 기업의 디지털 전환을 가속화하세요.',
    creator: '@biny_global',
    images: ['/assets/images/og-image.jpg'],
  },

  // 파비콘 및 아이콘
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#3b82f6' },
    ],
  },

  // 추가 메타데이터
  manifest: '/site.webmanifest',
  category: 'technology',
  classification: 'Business',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
