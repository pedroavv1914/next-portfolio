/**
 * Marca pessoal — um "PR" reduzido a um traço só: a haste e o bojo do P,
 * com a perna do R saindo do mesmo ponto. Aparece três vezes no sistema:
 * no selo de abertura de cada seção, no wordmark do header e como
 * assinatura de fechamento no rodapé.
 */
export default function Monogram({
  size = 22,
  className,
  title,
}: {
  size?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M9 25V8h7.5a5.5 5.5 0 0 1 0 11H12"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16.5 19 23 25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
