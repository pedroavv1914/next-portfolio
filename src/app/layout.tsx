import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

// Display: Archivo variável COM o eixo de largura. Todo título do site
// usa o corte condensado (wdth 62–84) em peso 900 — sem o eixo, o
// navegador sintetiza o aperto e as letras saem deformadas.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
});

// Corpo: mono em tudo que não é título. É a voz de "diário de bordo
// de engenharia" do design — rótulos, parágrafos, metadados.
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "700"],
});

// Monograma "P" em barras retas com a perna diagonal em lima —
// o mesmo desenho do header e do footer (components/Monogram.tsx).
const faviconSvg = `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" fill="#0A0C0A"/><g transform="translate(23 9) scale(0.62)"><rect x="0" y="0" width="26" height="150" fill="#EDEFE6"/><rect x="26" y="0" width="84" height="26" fill="#EDEFE6"/><rect x="26" y="58" width="84" height="26" fill="#EDEFE6"/><rect x="84" y="0" width="26" height="84" fill="#EDEFE6"/><rect x="80" y="80" width="26" height="78" fill="#C3FF3E" transform="rotate(-22 80 80)"/></g></svg>`;

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
    <html lang="pt-BR" className={`${archivo.variable} ${jetbrains.variable}`}>
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href={`data:image/svg+xml,${encodeURIComponent(faviconSvg)}`}
        />
      </head>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
