import type { Metadata } from "next";
import { Fraunces, Figtree } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT", "WONK"],
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
});

const faviconSvg = `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="24" fill="#F4EFE6"/><circle cx="64" cy="64" r="46" fill="#1E6F46"/><text x="50%" y="57%" text-anchor="middle" dominant-baseline="middle" font-size="44" font-family="Georgia, serif" font-weight="700" fill="#F4EFE6">PR</text></svg>`;

export const metadata: Metadata = {
  metadataBase: new URL("https://pedroribeiro.dev"),
  title: "Pedro Ribeiro — Desenvolvedor Full Stack",
  description:
    "Desenvolvedor full stack em Jundiaí, SP. Estudante de Ciência da Computação, cofundador da Aithos Tech. Este é meu diário de bordo: projetos, decisões técnicas e trajetória.",
  openGraph: {
    title: "Pedro Ribeiro — Desenvolvedor Full Stack",
    description:
      "Projetos, decisões técnicas e trajetória — de Jundiaí para o mundo.",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/projeto-babilon.png",
        width: 1200,
        height: 630,
        alt: "Portfólio de Pedro Ribeiro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pedro Ribeiro — Desenvolvedor Full Stack",
    description: "Projetos, decisões técnicas e trajetória.",
    images: ["/projeto-babilon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${figtree.variable}`}>
      <head>
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
