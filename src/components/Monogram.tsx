/**
 * Monograma "P" — quatro barras retas de espessura idêntica formando a
 * haste e o olho da letra, e a perna diagonal em lima saindo do vértice.
 * Mesmo desenho do favicon (layout.tsx). SVG em vez de divs empilhadas:
 * escala por `size` sem truque de transform e sem estourar o hit-box.
 */
export default function Monogram({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={(size * 132) / 150}
      height={size}
      viewBox="-2 0 136 152"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="0" y="0" width="26" height="150" fill="#EDEFE6" />
      <rect x="26" y="0" width="84" height="26" fill="#EDEFE6" />
      <rect x="26" y="58" width="84" height="26" fill="#EDEFE6" />
      <rect x="84" y="0" width="26" height="84" fill="#EDEFE6" />
      <rect
        x="80"
        y="80"
        width="26"
        height="78"
        fill="#C3FF3E"
        transform="rotate(-22 80 80)"
      />
    </svg>
  );
}
