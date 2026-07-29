import type { Metadata } from "next";
import { Archivo, Syne, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

// Display de impacto: Syne no corte mais pesado. Formas alargadas com
// junções incomuns entre haste e curva — é ela que assina o nome do hero
// e as marcas d'água das seções.
const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
});

// Mesma superfamília, em variável: para títulos de seção e subtítulos,
// onde 900 seria pesado demais. Assim display e headings combinam de raiz.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

// Corpo: neutra, alta legibilidade em texto claro sobre fundo escuro.
const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

// Mono: rótulos de seção, kickers, chips — o "universo do código".
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "700"],
});

const faviconSvg = `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="28" fill="#050807"/><path d="M40 92V36h26a18 18 0 0 1 0 36H52" stroke="#16E27B" stroke-width="11" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M66 72l24 20" stroke="#16E27B" stroke-width="11" fill="none" stroke-linecap="round"/></svg>`;

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
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${syne.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href={`data:image/svg+xml,${encodeURIComponent(faviconSvg)}`}
        />
      </head>
      {/* sys-grain: camada fixa de grão sobre o fundo escuro (::after) */}
      <body className="sys-grain">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
