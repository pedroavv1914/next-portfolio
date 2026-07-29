"use client";

import { MotionConfig } from "motion/react";

/**
 * reducedMotion="user" faz o Framer Motion desligar animações de transform
 * (x, y, scale, rotate) para quem tem prefers-reduced-motion: reduce,
 * mantendo só opacidade. Vale para toda a árvore, sem checagem manual.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
