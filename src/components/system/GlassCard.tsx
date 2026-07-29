"use client";

import { useRef, type MouseEvent } from "react";

type Variant = "glass" | "phone";

/**
 * Módulo flutuante — o bloco de informação do sistema.
 *
 * variant="glass"  cartão translúcido genérico (skills, projetos, etapas)
 * variant="phone"  mesma matéria, proporção e cantos de tela de celular,
 *                  com a barra de status desenhada no topo. Usado onde o
 *                  módulo é um "objeto" na composição (marcos da timeline,
 *                  cartão de contato) e não um card de grid.
 *
 * O halo verde acompanha o cursor: uma variável CSS (--mx/--my) guarda a
 * posição do mouse e alimenta um radial-gradient. É atualizado direto no
 * style do nó, sem re-render do React — em hover isso importa.
 */
export default function GlassCard({
  children,
  variant = "glass",
  interactive = true,
  spotlight = true,
  as: Tag = "div",
  className = "",
  ...rest
}: {
  children: React.ReactNode;
  variant?: Variant;
  /** Levanta e acende no hover/focus. */
  interactive?: boolean;
  /** Halo que segue o cursor. */
  spotlight?: boolean;
  as?: React.ElementType;
  className?: string;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (!spotlight || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const radius = variant === "phone" ? "rounded-phone" : "rounded-glass";

  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      className={[
        "sys-glass group/glass relative isolate overflow-hidden",
        radius,
        interactive ? "sys-glass-hover" : "",
        className,
      ].join(" ")}
      {...rest}
    >
      {spotlight ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/glass:opacity-100"
          style={{
            background:
              "radial-gradient(220px circle at var(--mx, 50%) var(--my, 0%), color-mix(in srgb, var(--color-neon-400) 16%, transparent), transparent 70%)",
          }}
        />
      ) : null}

      {variant === "phone" ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-2.5 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-ink/12"
        />
      ) : null}

      {children}
    </Tag>
  );
}
