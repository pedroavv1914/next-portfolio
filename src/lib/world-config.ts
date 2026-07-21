import type { WorldConfig } from "./scrub-engine";

// Vira `true` quando os clipes do voo de câmera estiverem gerados e encodados
// em public/world/vid — antes disso a página abre no hero estático.
export const WORLD_READY = false;

// Versão enxuta (orçamento de 110 créditos): 3 cenas, somente desktop, tier draft.
// A jornada completa de 6 cenas fica em scripts/world/prompts para quando houver créditos.
const v = (f: string) => `/world/vid/${f}`;
const s = (f: string) => `/world/${f}`;

export const worldConfig: WorldConfig = {
  diveScroll: 1.35,
  connScroll: 0.9,
  nav: false,
  hint: "role para entrar",
  sections: [
    {
      id: "jundiai",
      label: "Jundiaí",
      still: s("jundiai.webp"),
      clip: v("jundiai.mp4"),
      accent: "#1E6F46",
      scroll: 1.6,
      linger: 0.45,
      eyebrow: "Jundiaí · SP · Brasil",
      title: "Oi, eu sou o Pedro.",
      body: "Desenvolvedor full stack e estudante de Ciência da Computação. Este é o caminho que estou construindo — contado do começo.",
      tags: ["Full stack", "React · Node", "Disponível"],
    },
    {
      id: "aithos",
      label: "Aithos",
      still: s("aithos.webp"),
      clip: v("aithos.mp4"),
      accent: "#2F9E5F",
      scroll: 1.5,
      linger: 0.4,
      eyebrow: "Aithos Tech",
      title: "Aí eu virei cofundador.",
      body: "Depois da faculdade e de implantar software na Fagron Tech, cofundei a Aithos — soluções digitais para pequenos e médios negócios do Brasil.",
      tags: ["Cofundador", "Produtos sob medida"],
    },
    {
      id: "irlanda",
      label: "Irlanda",
      still: s("irlanda.webp"),
      clip: v("irlanda.mp4"),
      accent: "#143D28",
      scroll: 1.7,
      linger: 0.5,
      eyebrow: "Próxima parada",
      title: "Rumo à Irlanda.",
      body: "O plano de longo prazo é atravessar o Atlântico. Enquanto isso, tem muita coisa boa pra construir por aqui.",
      cta: {
        primary: { label: "Ver os projetos", href: "#projetos" },
        secondary: { label: "Falar comigo", href: "#contato" },
      },
    },
  ],
  connectors: [v("connA.mp4"), v("connB.mp4")],
};
