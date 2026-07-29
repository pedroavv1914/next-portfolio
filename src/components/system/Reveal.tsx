"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { EASE, DURATION, VIEWPORT } from "@/lib/motion";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: -32, y: 0 },
  right: { x: 32, y: 0 },
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
