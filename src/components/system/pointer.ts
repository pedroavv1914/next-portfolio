"use client";

import { motionValue } from "motion/react";

/**
 * Posição do cursor em MotionValues de módulo — um único listener para o
 * site inteiro, em vez de um por orb. MotionValue não dispara re-render
 * do React quando muda, então mover o mouse não custa nada em reconciliação.
 *
 * -9999 significa "cursor fora da janela": os orbs voltam ao repouso.
 */
export const pointerX = motionValue(-9999);
export const pointerY = motionValue(-9999);

export const POINTER_AWAY = -9999;

let mounted = 0;

/** Liga o listener global. Idempotente: só o primeiro assinante registra. */
export function trackPointer(): () => void {
  mounted += 1;

  if (mounted === 1) {
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
  }

  return () => {
    mounted -= 1;
    if (mounted === 0) {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    }
  };
}

function onMove(e: PointerEvent) {
  pointerX.set(e.clientX);
  pointerY.set(e.clientY);
}

function onLeave() {
  pointerX.set(POINTER_AWAY);
  pointerY.set(POINTER_AWAY);
}
