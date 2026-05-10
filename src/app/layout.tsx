import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const faviconSvg = `<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="22" fill="#070b09"/><circle cx="64" cy="64" r="48" fill="#7CFFB2"/><text x="50%" y="58%" text-anchor="middle" dominant-baseline="middle" font-size="48" font-family="Inter Tight, Arial, sans-serif" font-weight="700" fill="#04130b">PR</text></svg>`;

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://pedroribeiro.dev";
const title = "Pedro Ribeiro - Desenvolvedor Full Stack";
const description =
  "Portfolio de Pedro Ribeiro, desenvolvedor full stack em Jundiai, SP, especializado em React, Next.js, Node.js, TypeScript, APIs e produtos digitais performaticos.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Pedro Ribeiro",
  },
  description,
  applicationName: "Pedro Ribeiro Portfolio",
  authors: [{ name: "Pedro Ribeiro", url: siteUrl }],
  creator: "Pedro Ribeiro",
  publisher: "Pedro Ribeiro",
  category: "portfolio",
  keywords: [
    "Pedro Ribeiro",
    "desenvolvedor full stack",
    "portfolio desenvolvedor",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Jundiai",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Pedro Ribeiro Portfolio",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/api-stratix.png",
        width: 1200,
        height: 630,
        alt: "Preview do portfolio de Pedro Ribeiro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/api-stratix.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href={`data:image/svg+xml,${encodeURIComponent(faviconSvg)}`}
        />
      </head>
      <body className={`${interTight.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
