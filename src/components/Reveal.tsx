"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { EASE, DURATION, VIEWPORT } from "@/lib/motion";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 38 },
  down: { x: 0, y: -38 },
  left: { x: -44, y: 0 },
  right: { x: 44, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Entrada padrão do sistema: dispara quando entra na viewport
 * (whileInView usa IntersectionObserver por baixo) e só uma vez.
 *
 * Anima apenas opacity + transform. O MotionConfig reducedMotion="user"
 * do MotionProvider já derruba x/y automaticamente para quem pediu
 * menos movimento — sobra só o fade.
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = DURATION,
  className,
  ...rest
}: {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children" | "initial" | "whileInView" | "viewport">) {
  const { x, y } = OFFSET[direction];
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Versão container: não anima nada sozinha, só escalona os filhos.
 * Use com <RevealItem> dentro.
 */
export function RevealGroup({
  children,
  stagger = 0.09,
  delayChildren = 0,
  className,
  ...rest
}: {
  children: React.ReactNode;
  stagger?: number;
  delayChildren?: number;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children" | "variants">) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  direction = "up",
  className,
  ...rest
}: {
  children: React.ReactNode;
  direction?: Direction;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children" | "variants">) {
  const { x, y } = OFFSET[direction];
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, x, y },
        show: { opacity: 1, x: 0, y: 0, transition: { duration: DURATION, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Título que SOBE de dentro de uma máscara, linha por linha — o reveal
 * editorial dos h2 de seção. Cada linha vive num line box com overflow
 * hidden; o padding/margem negativa nas bordas evita decepar acento
 * (Á, Ó) e a perna do J quando a animação assenta.
 */
export function RevealLines({
  linhas,
  delay = 0,
  className,
}: {
  linhas: React.ReactNode[];
  delay?: number;
  className?: string;
}) {
  return (
    // O observer fica AQUI, no contêiner parado — nunca no span
    // animado: transladado 112% para dentro do overflow-hidden ele
    // está 100% recortado, o IntersectionObserver o vê com área zero
    // e o whileInView jamais dispararia. As linhas recebem o estado
    // por propagação de variants.
    <motion.span
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className={`block ${className ?? ""}`}
    >
      {linhas.map((linha, i) => (
        <span
          key={i}
          className="-mt-[0.12em] -mb-[0.08em] block overflow-hidden pt-[0.12em] pb-[0.08em]"
        >
          <motion.span
            className="block"
            variants={{
              hidden: { y: "112%" },
              show: {
                y: "0%",
                transition: {
                  duration: 0.85,
                  delay: delay + i * 0.11,
                  ease: EASE,
                },
              },
            }}
          >
            {linha}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
