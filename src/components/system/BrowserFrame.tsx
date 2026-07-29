"use client";

/**
 * Moldura de navegador — irmã do PhoneFrame na mesma família de objetos.
 *
 * Serve às capturas de tela dos projetos: a barra com os três pontos e a
 * pílula de endereço dá contexto de "isto é um produto web rodando", que
 * uma imagem solta em cima de um card não entrega.
 *
 * A captura em si fica levemente dessaturada e volta ao normal no hover,
 * o mesmo vocabulário do retrato — assim as imagens do site inteiro se
 * comportam igual.
 */
export default function BrowserFrame({
  src,
  alt,
  label,
  aspect = "16/10.5",
  eager = false,
  className = "",
}: {
  src: string;
  alt: string;
  /** Texto da barra de endereço. */
  label: string;
  /** Proporção da captura — o projeto em destaque usa um corte mais largo. */
  aspect?: string;
  /** Desliga o lazy-load: só para a imagem que abre a seção. */
  eager?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`sys-glass group/frame rounded-glass overflow-hidden shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-ink/8 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-neon-500/60" />
        </span>
        <span className="ml-2 flex-1 truncate rounded-full bg-void/50 px-3 py-1 font-mono text-[0.6rem] tracking-tight text-fog">
          {label}
        </span>
      </div>

      {/* ------------------------------------------------------------
          A curva do hover NÃO é a EASE do sistema (0.22,1,0.36,1).
          Aquela é uma ease-out expo: 80% do movimento acontece no
          primeiro quarto do tempo. Para algo que ENTRA na tela ela é
          perfeita — parece que chegou com energia. Num hover de imagem
          grande, esse arranque lê como solavanco. Aqui vale uma curva
          simétrica, que acelera e desacelera, e um tempo mais longo.
          ------------------------------------------------------------ */}
      <div className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          style={{ aspectRatio: aspect }}
          className="w-full object-cover object-top grayscale-[38%] transition-[transform,filter] duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/frame:scale-[1.02] group-hover/frame:grayscale-0"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/frame:opacity-0"
          style={{
            background:
              "linear-gradient(200deg, transparent 48%, color-mix(in srgb, var(--color-neon-800) 38%, transparent))",
          }}
        />
      </div>
    </div>
  );
}
