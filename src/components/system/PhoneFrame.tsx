"use client";

/**
 * Aparelho — não é "um card com cantos arredondados", é um telefone:
 * moldura metálica com brilho nas quinas, ilha dinâmica, botões de volume
 * e power em relevo, barra de status e o traço de home embaixo.
 *
 * A tela usa o vidro CLARO (.sys-glass-light): clareia o que está atrás
 * em vez de escurecer, que é o que diferencia vidro de acrílico fumê.
 *
 * O conteúdo vive dentro da tela, com a barra de status e o traço de home
 * reservando espaço — por isso o padding vertical assimétrico.
 */
export default function PhoneFrame({
  children,
  className = "",
  screenClassName = "",
}: {
  children: React.ReactNode;
  className?: string;
  screenClassName?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* botões laterais, em relevo na moldura */}
      <span
        aria-hidden="true"
        className="absolute -left-[3px] top-[18%] h-9 w-[3px] rounded-l-sm bg-gradient-to-b from-ink/25 to-ink/10"
      />
      <span
        aria-hidden="true"
        className="absolute -left-[3px] top-[27%] h-14 w-[3px] rounded-l-sm bg-gradient-to-b from-ink/25 to-ink/10"
      />
      <span
        aria-hidden="true"
        className="absolute -right-[3px] top-[23%] h-16 w-[3px] rounded-r-sm bg-gradient-to-b from-ink/25 to-ink/10"
      />

      {/* moldura */}
      <div
        className="relative rounded-[44px] p-[10px] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]"
        style={{
          background:
            "linear-gradient(150deg, color-mix(in srgb, var(--color-ink) 26%, transparent), color-mix(in srgb, var(--color-ink) 6%, transparent) 34%, transparent 62%, color-mix(in srgb, var(--color-ink) 14%, transparent))",
        }}
      >
        {/* tela */}
        <div
          className={`sys-glass-light relative flex h-full flex-col overflow-hidden rounded-[35px] ring-1 ring-ink/10 ${screenClassName}`}
        >
          {/* ilha dinâmica */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-3 z-20 flex h-[26px] w-[86px] -translate-x-1/2 items-center justify-end rounded-full bg-void/90 pr-2.5"
          >
            <span className="h-2 w-2 rounded-full bg-neon-500/25 ring-1 ring-neon-500/40" />
          </span>

          {/* barra de status */}
          <div
            aria-hidden="true"
            className="relative z-10 flex items-center justify-between px-6 pt-[13px] font-mono text-[0.62rem] tracking-tight text-mist"
          >
            <span>9:41</span>
            <span className="flex items-center gap-1">
              {/* sinal */}
              <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
                <rect x="0" y="7" width="2.4" height="3" rx="0.6" opacity="0.9" />
                <rect x="3.7" y="5" width="2.4" height="5" rx="0.6" opacity="0.9" />
                <rect x="7.4" y="2.6" width="2.4" height="7.4" rx="0.6" opacity="0.9" />
                <rect x="11.1" y="0" width="2.4" height="10" rx="0.6" opacity="0.4" />
              </svg>
              {/* bateria */}
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                <rect
                  x="0.5"
                  y="0.5"
                  width="16"
                  height="9"
                  rx="2.6"
                  stroke="currentColor"
                  strokeOpacity="0.45"
                />
                <rect x="2" y="2" width="10.5" height="6" rx="1.4" className="fill-neon-400" />
                <path
                  d="M18 3.4v3.2c.9-.3 1.4-.8 1.4-1.6S18.9 3.7 18 3.4Z"
                  fill="currentColor"
                  fillOpacity="0.45"
                />
              </svg>
            </span>
          </div>

          {/* conteúdo */}
          <div className="relative z-10 flex flex-1 flex-col">{children}</div>

          {/* traço de home */}
          <span
            aria-hidden="true"
            className="relative z-10 mx-auto mb-2.5 mt-4 h-1 w-28 shrink-0 rounded-full bg-ink/22"
          />

          {/* reflexo diagonal de vidro */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              background:
                "linear-gradient(118deg, color-mix(in srgb, var(--color-ink) 9%, transparent) 0%, transparent 26%, transparent 74%, color-mix(in srgb, var(--color-ink) 5%, transparent) 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
