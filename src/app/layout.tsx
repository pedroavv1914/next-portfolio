import type { Metadata } from "next";
import "./globals.css";

const faviconSvg = `<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="22" fill="#070b09"/><circle cx="64" cy="64" r="48" fill="#7CFFB2"/><text x="50%" y="58%" text-anchor="middle" dominant-baseline="middle" font-size="48" font-family="Inter Tight, Arial, sans-serif" font-weight="700" fill="#04130b">PR</text></svg>`;

export const metadata: Metadata = {
  metadataBase: new URL("https://pedroribeiro.dev"),
  title: "Pedro Ribeiro — Engenheiro de Produto Digital",
  description:
    "Full-stack focado nos últimos 10%: arquitetura limpa, performance e micro-interações que deixam o usuário em paz.",
  openGraph: {
    title: "Pedro Ribeiro — Engenheiro de Produto Digital",
    description:
      "Performance, arquitetura limpa e produtos que as pessoas amam usar.",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/api-stratix.png",
        width: 1200,
        height: 630,
        alt: "Preview do portfólio de Pedro Ribeiro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pedro Ribeiro — Engenheiro de Produto Digital",
    description: "Performance, arquitetura limpa e produtos memoráveis.",
    images: ["/api-stratix.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href={`data:image/svg+xml,${encodeURIComponent(faviconSvg)}`}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
