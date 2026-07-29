/**
 * Grid técnico de fundo, com drift lento e contínuo (animação CSS em
 * .sys-grid). De propósito não é amarrado ao scroll: é respiração
 * ambiente, não reação ao usuário.
 *
 * A máscara radial faz as linhas se dissolverem antes de encostar nas
 * bordas — sem isso, o grid vira uma "folha de caderno" e compete com
 * o conteúdo em vez de servir de textura.
 */
export default function GridBackdrop({
  className = "",
  fade = "center",
  opacity = 1,
}: {
  className?: string;
  /** Onde o grid é mais visível. */
  fade?: "center" | "top" | "bottom";
  opacity?: number;
}) {
  const mask =
    fade === "top"
      ? "radial-gradient(120% 80% at 50% 0%, #000 15%, transparent 72%)"
      : fade === "bottom"
        ? "radial-gradient(120% 80% at 50% 100%, #000 15%, transparent 72%)"
        : "radial-gradient(85% 70% at 50% 45%, #000 10%, transparent 72%)";

  return (
    <div
      aria-hidden="true"
      className={`sys-grid pointer-events-none absolute inset-0 ${className}`}
      style={{
        opacity,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  );
}
