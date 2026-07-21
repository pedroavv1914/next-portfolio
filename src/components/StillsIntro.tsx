"use client";

import { useEffect, useRef } from "react";

type Scene = {
  id: string;
  img: string;
  alt: string;
  eyebrow: string;
  title: string;
  body: string;
  tags?: string[];
  cta?: boolean;
};

const scenes: Scene[] = [
  {
    id: "jundiai",
    img: "/world/jundiai.webp",
    alt: "Diorama em miniatura de um bairro de Jundiaí com uma casa e um home office iluminado",
    eyebrow: "Jundiaí · SP · Brasil",
    title: "Oi, eu sou o Pedro.",
    body: "Desenvolvedor full stack e estudante de Ciência da Computação. Este é o caminho que estou construindo — contado do começo.",
    tags: ["Full stack", "React · Node", "Disponível"],
  },
  {
    id: "aithos",
    img: "/world/aithos.webp",
    alt: "Diorama em miniatura de um estúdio de startup com dois fundadores trabalhando",
    eyebrow: "Aithos Tech",
    title: "Aí eu virei cofundador.",
    body: "Depois da faculdade e de implantar software na Fagron Tech, cofundei a Aithos — soluções digitais para pequenos e médios negócios do Brasil.",
    tags: ["Cofundador", "Produtos sob medida"],
  },
  {
    id: "irlanda",
    img: "/world/irlanda.webp",
    alt: "Diorama em miniatura de uma paisagem costeira irlandesa com farol e vilarejo",
    eyebrow: "Próxima parada",
    title: "Rumo à Irlanda.",
    body: "O plano de longo prazo é atravessar o Atlântico. Enquanto isso, tem muita coisa boa pra construir por aqui.",
    cta: true,
  },
];

const PER_SCENE_VH = 165;

// Abertura scrollytelling com os dioramas: o scroll mergulha em cada cena
// (zoom suave) e dissolve para a próxima através do fundo creme da página.
// Só transform/opacity — barato de renderizar, inclusive no celular.
export default function StillsIntro() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      root.classList.add("static");
      return;
    }

    const sceneEls = Array.from(root.querySelectorAll<HTMLElement>(".si-scene"));
    const imgEls = Array.from(root.querySelectorAll<HTMLElement>(".si-media"));
    const copyEls = Array.from(root.querySelectorAll<HTMLElement>(".si-copy"));
    const dotEls = Array.from(root.querySelectorAll<HTMLElement>(".si-dot"));
    const hintEl = root.querySelector<HTMLElement>(".si-hint");
    const N = sceneEls.length;

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight;
      const range = root.offsetHeight - vh;
      const p = clamp01(-rect.top / Math.max(range, 1)) * N;

      sceneEls.forEach((scene, i) => {
        const u = clamp01(p - i); // progresso dentro da cena i: 0..1
        const enter = i === 0 ? 1 : clamp01(u / 0.14);
        const exit = i === N - 1 ? 1 : clamp01((1 - u) / 0.14);
        const visible = Math.min(enter, exit);
        const active = p >= i - 0.5 && p < i + 0.5;

        scene.style.opacity = String(visible);
        scene.style.visibility = visible <= 0.001 ? "hidden" : "visible";
        scene.style.pointerEvents = active && visible > 0.5 ? "auto" : "none";

        const img = imgEls[i];
        if (img) {
          const scale = 1.03 + 0.15 * u;
          img.style.transform = `scale(${scale.toFixed(4)}) translateY(${(-2.4 * u).toFixed(2)}%)`;
        }
        const copy = copyEls[i];
        if (copy) {
          const inn = clamp01((u - 0.06) / 0.16);
          const out = i === N - 1 ? 1 : clamp01((0.94 - u) / 0.14);
          const o = Math.min(inn, out);
          copy.style.opacity = String(o);
          copy.style.transform = `translateY(${((1 - inn) * 26).toFixed(1)}px)`;
        }
      });

      const activeIdx = Math.min(N - 1, Math.floor(p + 0.5));
      dotEls.forEach((d, i) => d.classList.toggle("on", i === activeIdx));
      if (hintEl) hintEl.style.opacity = p < 0.12 ? "1" : "0";
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const jumpTo = (i: number) => {
    const root = rootRef.current;
    if (!root) return;
    const vh = window.innerHeight;
    const range = root.offsetHeight - vh;
    const top = root.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (range * (i + 0.5)) / scenes.length, behavior: "smooth" });
  };

  return (
    <section
      className="stills-intro"
      id="topo"
      ref={rootRef}
      style={{ height: `${scenes.length * PER_SCENE_VH}vh` }}
      aria-label="Abertura: minha trajetória em três cenas"
    >
      <div className="si-viewport">
        {scenes.map((s, i) => (
          <div className={`si-scene${i === 0 ? " first" : ""}`} key={s.id}>
            <div className="si-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.img} alt={s.alt} loading={i === 0 ? "eager" : "lazy"} />
            </div>
            <div className="si-copy">
              <span className="si-eyebrow">{s.eyebrow}</span>
              {i === 0 ? (
                <h1 className="si-title">{s.title}</h1>
              ) : (
                <h2 className="si-title">{s.title}</h2>
              )}
              <p className="si-body">{s.body}</p>
              {s.tags && (
                <div className="si-tags">
                  {s.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              )}
              {s.cta && (
                <div className="si-actions">
                  <a href="#projetos" className="btn btn-primary">
                    Ver os projetos <span className="arr">→</span>
                  </a>
                  <a href="#contato" className="btn btn-ghost">
                    Falar comigo
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="si-route" role="tablist" aria-label="Cenas">
          {scenes.map((s, i) => (
            <button
              key={s.id}
              className={`si-dot${i === 0 ? " on" : ""}`}
              aria-label={`Ir para a cena ${s.eyebrow}`}
              onClick={() => jumpTo(i)}
            />
          ))}
        </div>

        <div className="si-hint" aria-hidden="true">
          <span>role para descer</span>
          <i></i>
        </div>
      </div>
    </section>
  );
}
