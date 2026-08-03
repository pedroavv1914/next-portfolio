import type { Variants } from "motion/react";

// Mesma curva já usada nas transições em CSS (botões, cards, header) para que
// entrada e hover tenham a mesma "personalidade" de movimento.
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DURATION = 0.6;

/** Entrada padrão: sobe 24px e aparece. Só transform + opacity. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE } },
};

/** Variante lateral, para blocos em grid de duas colunas. */
export const fadeSide = (from: "left" | "right"): Variants => ({
  hidden: { opacity: 0, x: from === "left" ? -28 : 28 },
  show: { opacity: 1, x: 0, transition: { duration: DURATION, ease: EASE } },
});

/**
 * Container que escalona os filhos. Não anima nada por conta própria —
 * só orquestra, então não gera trabalho de layout.
 */
export const stagger = (staggerChildren = 0.09, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Margem de disparo: o elemento precisa entrar 12% na tela antes de
 *  animar — disparo cedo demais faz o reveal acontecer fora da vista
 *  e a página parecer estática. */
export const VIEWPORT = { once: true, amount: 0.25, margin: "0px 0px -12% 0px" } as const;
