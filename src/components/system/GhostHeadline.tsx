"use client";

import { useId, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * Tipografia gigante como elemento gráfico.
 *
 * Desenhada em SVG, e não em texto HTML com `font-size` em vw. Medir o
 * corpo em vw exige adivinhar a largura média dos glifos — e o erro
 * dessa conta muda a cada fonte e a cada palavra, então mais cedo ou
 * mais tarde a marca d'água estoura a lateral da tela. Aqui o viewBox
 * manda: `textLength` fixa a linha na largura do quadro, o quadro escala
 * com o container, e o texto NUNCA transborda — em nenhuma palavra, em
 * nenhuma fonte, em nenhuma largura de tela.
 *
 * O corpo é derivado do próprio comprimento da palavra, então palavras
 * curtas rendem letras maiores e todas ocupam a mesma largura.
 *
 * variant="ghost"    marca d'água translúcida atrás do conteúdo
 * variant="display"  título sólido com o gradiente verde
 */

/** Largura média de uma maiúscula de Syne, em fração do corpo. */
const AVANCO = 0.66;

export default function GhostHeadline({
  children,
  variant = "ghost",
  parallax = 60,
  className = "",
  ariaHidden = true,
}: {
  /** Texto puro: vira <text> dentro do SVG. */
  children: string;
  variant?: "ghost" | "display";
  /** Deslocamento total do parallax, em px. 0 desliga. */
  parallax?: number;
  className?: string;
  ariaHidden?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);

  const texto = children.toUpperCase();
  const corpo = 1000 / (texto.length * AVANCO);
  // Folga acima do cap para os acentos (Á de PRÁTICA, Ó de TRAJETÓRIA)
  // não serem decepados pelo topo do quadro.
  const altura = Math.round(corpo * 0.86);
  const base = Math.round(corpo * 0.78);

  const isGhost = variant === "ghost";
  // useId e não um slug do texto: duas marcas d'água com a mesma palavra
  // na mesma página colidiriam de id e compartilhariam o gradiente.
  const id = `ghost${useId().replace(/:/g, "")}`;

  return (
    <motion.div
      ref={ref}
      aria-hidden={ariaHidden || undefined}
      style={parallax ? { y } : undefined}
      className={`pointer-events-none select-none ${className}`}
    >
      <svg
        viewBox={`0 0 1000 ${altura}`}
        className="w-full"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={altura}>
            {isGhost ? (
              <>
                <stop offset="0" stopColor="#E9F2EC" stopOpacity="0.10" />
                <stop offset="1" stopColor="#E9F2EC" stopOpacity="0.015" />
              </>
            ) : (
              <>
                <stop offset="0" stopColor="#C2FFDD" stopOpacity="1" />
                <stop offset="0.42" stopColor="#16E27B" stopOpacity="1" />
                <stop offset="1" stopColor="#075C31" stopOpacity="1" />
              </>
            )}
          </linearGradient>
        </defs>
        <text
          x="500"
          y={base}
          className="font-poster"
          fontWeight="800"
          fontSize={corpo}
          textAnchor="middle"
          textLength="1000"
          lengthAdjust="spacingAndGlyphs"
          fill={`url(#${id})`}
        >
          {texto}
        </text>
      </svg>
    </motion.div>
  );
}
