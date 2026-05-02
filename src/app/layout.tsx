import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import GlobalEffects from "@/components/GlobalEffects";
import "./globals.css";

const faviconSvg = `<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="22" fill="#0a0a0f"/><text x="50%" y="56%" text-anchor="middle" dominant-baseline="middle" font-size="64" font-family="Syne, Arial, sans-serif" font-weight="800" fill="#22c55e">PR</text></svg>`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pedro Ribeiro - Full-Stack Developer",
  description: "Portfólio de Pedro Ribeiro, desenvolvedor full-stack focado em performance, arquitetura limpa e produtos memoráveis.",
  openGraph: {
    title: "Pedro Ribeiro - Full-Stack Developer",
    description: "Performance, arquitetura limpa e produtos que as pessoas amam usar.",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/api-stratix.png",
        width: 1200,
        height: 630,
        alt: "Preview verde do portfólio de Pedro Ribeiro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pedro Ribeiro - Full-Stack Developer",
    description: "Performance, arquitetura limpa e produtos memoráveis.",
    images: ["/api-stratix.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
        <link rel="icon" type="image/svg+xml" href={`data:image/svg+xml,${encodeURIComponent(faviconSvg)}`} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GlobalEffects />
        {children}
      </body>
    </html>
  );
}
