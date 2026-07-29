"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";
import GridBackdrop from "@/components/system/GridBackdrop";
import FloatingOrb from "@/components/system/FloatingOrb";
import Monogram from "@/components/system/Monogram";

/**
 * HERO — capa. O nome é a peça; a figura passa na frente dele.
 *
 * O nome ocupa a largura inteira em verde neon chapado e sangra de leve
 * nas bordas: tipografia grande que respeita a margem parece tímida, a
 * que encosta na borda parece impressa. O painel de ferramentas à
 * esquerda é o equivalente, no meu ofício, ao toolbar do Photoshop da
 * referência — mesma função na composição: um objeto de interface
 * flutuando sobre a arte.
 */

/**
 * ENCAIXE DA FIGURA CENTRAL.
 *
 * Preencha para trazer a imagem de volta ao palco — ela entra na frente
 * do nome, exatamente como a estátua da referência:
 *
 *   const FIGURA = { src: "/minha-arte.png", alt: "…" };
 *
 * `recortar: true` liga o filtro de luminância abaixo, que descola o
 * sujeito de um fundo CLARO E UNIFORME sem editar o arquivo. Para PNG
 * ou WebP que já venha com fundo transparente, deixe desligado.
 */
const FIGURA: { src: string; alt: string; recortar?: boolean } | null = null;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export default function Hero() {
  return (
    <section
      id="topo"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pb-10 pt-28"
    >
      {/* ----------------------------------------------------------------
          Recorte por luminância: alpha = 6 × (0.88 − luminância).
          Um fundo branco (lum ≈ 0.93) resulta em alfa negativo → some.
          Tons médios (≈0.55–0.70) saturam em 1 → opacos. A faixa entre
          0.71 e 0.88 vira a borda antisserrilhada. Depois: dessatura e
          remapeia para o duotone verde da referência.
          Só entra no DOM quando a figura pede recorte.
          ---------------------------------------------------------------- */}
      {FIGURA?.recortar ? (
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <defs>
            <filter id="hero-cutout" colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        -1.794 -3.522 -0.684 0 5.28"
              />
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncR type="table" tableValues="0.02 0.42" />
                <feFuncG type="table" tableValues="0.10 1" />
                <feFuncB type="table" tableValues="0.07 0.60" />
              </feComponentTransfer>
            </filter>
          </defs>
        </svg>
      ) : null}

      <GridBackdrop fade="center" opacity={0.9} className="-z-20" />
      <FloatingOrb size={420} blur={80} opacity={0.45} duration={27} className="-left-40 top-8 -z-20" />
      <FloatingOrb size={340} blur={70} opacity={0.4} duration={32} delay={-7} className="-right-28 bottom-4 -z-20" />
      <FloatingOrb size={82} duration={15} delay={-4} className="left-[14%] bottom-[16%] -z-10 hidden lg:block" />
      <FloatingOrb size={58} duration={13} delay={-8} className="right-[16%] top-[20%] -z-10 hidden lg:block" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex w-[min(1280px,calc(100%-40px))] flex-1 flex-col"
      >
        {/* ---------- topo ---------- */}
        <motion.div
          variants={item}
          className="flex items-start justify-between gap-6 font-mono text-[0.66rem] uppercase tracking-[0.18em] sm:text-[0.7rem]"
        >
          <span className="flex items-center gap-2.5 text-ink">
            <Monogram size={22} className="shrink-0 text-neon-500" />
            <span className="leading-tight">
              Pedro Ribeiro
              <br />
              <span className="text-fog">Jundiaí · SP</span>
            </span>
          </span>
          <span className="pt-1 text-right leading-tight text-mist">
            Full stack
            <br />
            <span className="text-fog">Developer</span>
          </span>
        </motion.div>

        {/* ---------- palco: nome + figura ---------- */}
        <div className="relative flex flex-1 flex-col items-center justify-center">
          {/* halo por trás do nome */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[62%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[110px]"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in srgb, var(--color-neon-600) 42%, transparent), transparent)",
            }}
          />

          {/* ------------------------------------------------------------
              O NOME em SVG, e não em texto HTML dimensionado por vw.
              Com viewBox a caixa manda no tipo: o desenho escala junto
              com o container e nunca ultrapassa a margem, em nenhuma
              largura de tela. `textLength` fixa cada linha na largura que
              eu quero — 1000 para "Ribeiro" e 714 para "Pedro", que é a
              razão 5/7 entre as contagens de letra. É isso que faz as
              duas linhas terem o MESMO tracking e ainda assim formarem
              um bloco de proporção harmônica, em vez de eu adivinhar
              corpos diferentes no olho.
              ------------------------------------------------------------ */}
          <motion.svg
            variants={item}
            viewBox="0 0 1000 300"
            className="pointer-events-none relative z-10 w-full select-none"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              {/* userSpaceOnUse: um gradiente só para o bloco inteiro.
                  No padrão (objectBoundingBox) cada linha reiniciaria a
                  rampa e o desvanecimento perderia a continuidade. */}
              <linearGradient
                id="hero-nome"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="10"
                x2="0"
                y2="295"
              >
                <stop offset="0" stopColor="#E9F2EC" stopOpacity="0.86" />
                <stop offset="0.5" stopColor="#E9F2EC" stopOpacity="0.46" />
                <stop offset="1" stopColor="#E9F2EC" stopOpacity="0.12" />
              </linearGradient>
            </defs>
            {/* fontSize 185 e não 204: Syne é bem mais alargada que uma
                grotesca comum, e o textLength comprime o que passar da
                medida. Com o corpo calibrado perto da largura natural, a
                compressão fica residual e as junções curva/haste — que
                são justamente a assinatura da fonte — chegam intactas. */}
            <g className="font-poster" fill="url(#hero-nome)" fontWeight="800" textAnchor="middle">
              <text x="500" y="140" fontSize="185" textLength="714" lengthAdjust="spacingAndGlyphs">
                PEDRO
              </text>
              <text x="500" y="288" fontSize="185" textLength="1000" lengthAdjust="spacingAndGlyphs">
                RIBEIRO
              </text>
            </g>
          </motion.svg>

          {/* régua + período, alinhados à direita sob o nome */}
          <motion.div
            variants={item}
            className="mt-5 flex w-full items-center justify-end gap-4"
          >
            <span className="h-px w-24 bg-gradient-to-r from-transparent to-neon-500/45" />
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-mist sm:text-[0.72rem]">
              2024 — 2026
            </span>
          </motion.div>

          {/* A FIGURA — passa na frente do nome. Ver o encaixe FIGURA no topo. */}
          {FIGURA ? (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.45, ease: EASE }}
              className="absolute left-1/2 top-1/2 z-20 w-[min(460px,58vw)] -translate-x-1/2 -translate-y-[46%] lg:w-[min(520px,36vw)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={FIGURA.src}
                alt={FIGURA.alt}
                className="w-full"
                style={{
                  filter: FIGURA.recortar ? "url(#hero-cutout)" : undefined,
                  maskImage: "linear-gradient(to bottom, #000 82%, transparent 99%)",
                  WebkitMaskImage: "linear-gradient(to bottom, #000 82%, transparent 99%)",
                }}
              />
            </motion.div>
          ) : null}
        </div>

        {/* ---------- rodapé ---------- */}
        <motion.div
          variants={item}
          className="relative z-30 mt-8 grid gap-6 border-t border-ink/10 pt-6 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-12"
        >
          <h1 className="max-w-[30ch] font-display text-[clamp(1.15rem,2.1vw,1.6rem)] font-semibold leading-[1.3] tracking-[-0.02em] text-ink">
            Oi, eu sou o Pedro. Construo{" "}
            <span className="sys-gradient-text-bright">produtos web</span> de ponta a ponta.
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[0.7rem] text-fog lg:justify-end">
            {[
              { href: "https://github.com/pedroavv1914", label: "GitHub" },
              { href: "https://www.linkedin.com/in/pedro-ribeiro-a71300230/", label: "LinkedIn" },
              { href: "https://www.instagram.com/_pedroavv/", label: "Instagram" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="group relative text-mist transition-colors duration-300 hover:text-neon-300"
              >
                {l.label}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-neon-400 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"
                />
              </a>
            ))}

            <a
              href="#projetos"
              className="group inline-flex items-center gap-2.5 uppercase tracking-[0.16em] text-mist transition-colors duration-300 hover:text-neon-300"
            >
              Ver os projetos
              <span className="grid h-6 w-6 place-items-center rounded-full border border-ink/15 transition-[border-color,transform] duration-300 group-hover:translate-y-0.5 group-hover:border-neon-400/60">
                <motion.span
                  animate={{ y: [0, 2.5, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="text-[0.7rem] leading-none"
                >
                  ↓
                </motion.span>
              </span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
