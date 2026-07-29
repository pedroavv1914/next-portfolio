"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { pointerX, pointerY, trackPointer } from "./pointer";

/**
 * Orb — forma orgânica de mármore escuro com rim light verde.
 *
 * No sistema ele não é enfeite solto: é cola visual. Fica atrás e entre
 * os módulos, ligando blocos que o grid separaria, e preenchendo o
 * espaço negativo da composição em colagem.
 *
 * Dois movimentos somados, em nós separados de propósito:
 *   externo — reage ao cursor (foge dele, cresce e acende por perto)
 *   interno — flutuação infinita em CSS puro (.sys-orb)
 * Se os dois vivessem no mesmo nó, a animação CSS venceria o transform
 * inline do Framer Motion e a reação ao mouse simplesmente sumiria.
 *
 * A reação usa proximidade, não hover: o orb é pointer-events:none e
 * está atrás do conteúdo, então nunca roubaria um clique.
 */

const SPRING = { stiffness: 55, damping: 16, mass: 0.9 };

export default function FloatingOrb({
  size = 220,
  blur = 0,
  duration = 18,
  delay = 0,
  opacity = 1,
  /** Raio de influência do cursor, em px. */
  influence = 360,
  /** Quanto o orb foge do cursor, em px. */
  push = 34,
  /** Desliga a reação ao mouse (orbs muito ao fundo). */
  reactive = true,
  /** Morph da silhueta. Padrão: ligado só nos orbs nítidos. */
  morph,
  className = "",
  style,
}: {
  size?: number;
  /** Desfoque em px — orbs de fundo distante usam 40–70. */
  blur?: number;
  /** Duração do ciclo de flutuação, em segundos. */
  duration?: number;
  delay?: number;
  opacity?: number;
  influence?: number;
  push?: number;
  reactive?: boolean;
  morph?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const ms = useMotionValue(1);
  const mg = useMotionValue(0);

  const x = useSpring(mx, SPRING);
  const y = useSpring(my, SPRING);
  const scale = useSpring(ms, SPRING);
  const glow = useSpring(mg, { stiffness: 90, damping: 20 });

  useEffect(() => {
    if (!reactive) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const stop = trackPointer();
    let raf = 0;

    const rest = () => {
      mx.set(0);
      my.set(0);
      ms.set(1);
      mg.set(0);
    };

    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;

      const cursorX = pointerX.get();
      const cursorY = pointerY.get();
      if (cursorX < -1000) return rest();

      const r = el.getBoundingClientRect();
      // Fora da viewport: nem mede esforço, nem fica preso deslocado.
      if (r.bottom < -240 || r.top > window.innerHeight + 240) return rest();

      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dist = Math.hypot(cursorX - cx, cursorY - cy);
      if (dist > influence) return rest();

      // 1 no centro do orb, 0 na borda do raio de influência.
      const force = 1 - dist / influence;
      const ux = (cx - cursorX) / (dist || 1);
      const uy = (cy - cursorY) / (dist || 1);

      mx.set(ux * push * force);
      my.set(uy * push * force);
      ms.set(1 + force * 0.16);
      mg.set(force);
    };

    // rAF gate: mousemove dispara dezenas de vezes por frame, o cálculo
    // (que lê layout) roda no máximo uma vez.
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const unX = pointerX.on("change", schedule);
    const unY = pointerY.on("change", schedule);
    window.addEventListener("scroll", schedule, { passive: true });

    return () => {
      unX();
      unY();
      window.removeEventListener("scroll", schedule);
      if (raf) cancelAnimationFrame(raf);
      stop();
    };
  }, [reactive, influence, push, mx, my, ms, mg]);

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      style={{ x, y, scale, width: size, height: size, ...style }}
      className={`pointer-events-none absolute ${className}`}
    >
      <div
        className={`sys-orb h-full w-full ${morph ?? blur === 0 ? "sys-orb-morph" : ""}`}
        style={
          {
            opacity,
            filter: blur ? `blur(${blur}px)` : undefined,
            // Cantos desiguais: nunca um círculo, sempre uma gota irregular.
            borderRadius: "52% 48% 41% 59% / 46% 55% 45% 54%",
            "--orb-dur": `${duration}s`,
            "--orb-delay": `${delay}s`,
          } as React.CSSProperties
        }
      >
        {/* ordem de pintura: mármore girando → brilhos verdes → rim pulsando */}
        <span className="sys-orb-swirl" />
        <span className="sys-orb-tint" />
        <span className="sys-orb-rim" />
      </div>
      {/* Halo que acende com a aproximação do cursor. */}
      <motion.div
        style={{
          opacity: glow,
          borderRadius: "52% 48% 41% 59% / 46% 55% 45% 54%",
          boxShadow:
            "0 0 70px 8px color-mix(in srgb, var(--color-neon-400) 45%, transparent)",
        }}
        className="pointer-events-none absolute inset-0"
      />
    </motion.div>
  );
}
