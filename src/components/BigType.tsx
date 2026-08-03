/**
 * Tipografia colossal do design — o nome do hero e o chamado do contato.
 *
 * Desenhada em SVG, nunca em `font-size` com vw: medir corpo em vw exige
 * adivinhar a largura média dos glifos, e o erro muda a cada palavra —
 * mais cedo ou mais tarde o texto estoura a lateral (regra aprendida na
 * versão anterior do site). Aqui o viewBox manda: a linha mais longa é
 * presa na largura do quadro com `textLength`, as demais herdam o mesmo
 * corpo e ancoram à esquerda, e o conjunto escala com o container sem
 * jamais transbordar.
 *
 * `outline: true` desenha a linha só com o contorno lima — o contraponto
 * gráfico que o design usa para a segunda palavra.
 */

type Linha = { texto: string; outline?: boolean };

export default function BigType({
  linhas,
  avanco = 0.44,
  className = "",
  ariaHidden = true,
}: {
  linhas: Linha[];
  /**
   * Avanço médio de uma maiúscula (fração do corpo) NA PALAVRA usada —
   * medido no navegador para Archivo wdth 62/900, não chutado: é ele
   * que decide o quanto o textLength precisa (ou não) deformar os
   * glifos. PEDRO ≈ 0.47, RIBEIRO ≈ 0.41, frases com espaço ≈ 0.44.
   */
  avanco?: number;
  className?: string;
  ariaHidden?: boolean;
}) {
  const maisLonga = Math.max(...linhas.map((l) => l.texto.length));
  const corpo = 1000 / (maisLonga * avanco);
  // Caixa alta sem descendentes: o quadro abraça só as versais,
  // com folga mínima em cima e embaixo.
  const passo = corpo * 0.82;
  const altura = Math.round(corpo * 0.78 + (linhas.length - 1) * passo);
  const traco = Math.max(1.4, corpo * 0.007);

  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className={`pointer-events-none select-none ${className}`}
    >
      <svg
        viewBox={`0 0 1000 ${altura}`}
        className="block w-full"
        aria-hidden="true"
        focusable="false"
      >
        {linhas.map((linha, i) => {
          const cheia = linha.texto.length === maisLonga;
          return (
            <text
              key={`${linha.texto}-${i}`}
              x="0"
              y={Math.round(corpo * 0.72 + i * passo)}
              fontSize={corpo}
              // Sem letter-spacing negativo: ele encolhe a largura
              // natural e obriga o textLength a compensar ABRINDO
              // espaço entre os glifos — o oposto do aperto que o
              // design pede. O ajuste fino de largura fica todo no
              // `avanco`, calibrado levemente para baixo, para que a
              // sobra vire compressão (mais condensado), nunca fresta.
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontVariationSettings: "'wdth' 62",
              }}
              // Só a linha mais longa é forçada na largura exata do quadro;
              // as outras seguem o avanço natural e terminam antes.
              textLength={cheia ? 1000 : undefined}
              lengthAdjust={cheia ? "spacingAndGlyphs" : undefined}
              fill={linha.outline ? "none" : "#EDEFE6"}
              stroke={linha.outline ? "#C3FF3E" : "none"}
              strokeWidth={linha.outline ? traco : undefined}
            >
              {linha.texto}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
