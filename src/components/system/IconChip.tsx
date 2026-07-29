"use client";

import TechIcon, { resolveTech, techColor } from "./TechIcon";

/**
 * Selo quadrado de ferramenta. Substitui a lista de tecnologias em texto:
 * a cor da marca fica no ícone e num halo discreto, que acende no hover.
 *
 * O nome continua acessível (aria-label + title) porque o ícone sozinho
 * não é legível para quem não conhece a marca — e leitor de tela precisa
 * do texto. Com showLabel, o nome aparece ao lado.
 */
export default function IconChip({
  name,
  showLabel = false,
  size = "md",
}: {
  name: string;
  showLabel?: boolean;
  size?: "sm" | "md";
}) {
  const color = techColor(name);
  const known = resolveTech(name) !== null;
  const box = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const icon = size === "sm" ? 16 : 20;

  // Sem glifo desenhado: cai para as iniciais, mantendo o mesmo selo.
  const fallback = name.slice(0, 2).toUpperCase();

  const seal = (
    <span
      className={[
        box,
        "grid shrink-0 place-items-center rounded-[11px] border border-ink/10 bg-abyss/70",
        "transition-[box-shadow,border-color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "group-hover/chip:-translate-y-0.5 group-hover/chip:border-[color:var(--chip)]/45",
        "group-hover/chip:shadow-[0_0_18px_-4px_var(--chip),inset_0_0_12px_-6px_var(--chip)]",
      ].join(" ")}
      style={{ color, "--chip": color } as React.CSSProperties}
    >
      {known ? (
        <TechIcon name={name} size={icon} />
      ) : (
        <span className="font-mono text-[0.62rem] font-bold">{fallback}</span>
      )}
    </span>
  );

  if (!showLabel) {
    return (
      <span
        className="group/chip inline-flex"
        style={{ "--chip": color } as React.CSSProperties}
        title={name}
        aria-label={name}
        role="img"
      >
        {seal}
      </span>
    );
  }

  return (
    <span
      className="group/chip inline-flex items-center gap-2.5 pr-3"
      style={{ "--chip": color } as React.CSSProperties}
    >
      {seal}
      <span className="font-mono text-[0.72rem] tracking-tight text-mist transition-colors duration-300 group-hover/chip:text-ink">
        {name}
      </span>
    </span>
  );
}

/** Fileira de selos com quebra de linha. */
export function ChipRow({
  items,
  showLabel = false,
  size = "md",
  className = "",
}: {
  items: string[];
  showLabel?: boolean;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {items.map((t) => (
        <IconChip key={t} name={t} showLabel={showLabel} size={size} />
      ))}
    </div>
  );
}
