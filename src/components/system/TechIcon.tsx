/**
 * Glifos de tecnologia — SVG inline, todos desenhados no mesmo grid 24×24.
 *
 * Decisão: para marcas de logo complexo (Postgres, Docker, AWS) uso um
 * glifo geométrico ou monograma próprio na cor da marca, em vez de
 * reproduzir a identidade visual de terceiros. Além de evitar copiar
 * marca alheia, mantém o conjunto coeso: tudo tem o mesmo peso de traço
 * e o mesmo enquadramento, coisa que logos oficiais misturados nunca têm.
 *
 * Zero dependência: não vale instalar react-icons por 20 ícones.
 */

export type TechName =
  | "React"
  | "Next.js"
  | "TypeScript"
  | "Tailwind"
  | "Vite"
  | "Node.js"
  | "Express"
  | "PostgreSQL"
  | "Prisma"
  | "TypeORM"
  | "Supabase"
  | "Docker"
  | "Vercel"
  | "AWS"
  | "Git"
  | "JWT"
  | "Recharts"
  | "Styled-Components"
  | "CSS"
  | "API";

type Glyph = {
  /** Cor da marca, usada no ícone e no halo do chip. */
  color: string;
  node: React.ReactNode;
};

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Monograma: usado onde o logo real seria uma ilustração complexa. */
const mono = (text: string, size = 9) => (
  <text
    x="12"
    y="12"
    textAnchor="middle"
    dominantBaseline="central"
    fontSize={size}
    fontWeight="700"
    fontFamily="var(--font-mono)"
    fill="currentColor"
    stroke="none"
  >
    {text}
  </text>
);

const GLYPHS: Record<TechName, Glyph> = {
  React: {
    color: "#61DAFB",
    node: (
      <g {...S}>
        <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </g>
    ),
  },
  "Next.js": {
    color: "#E8E8E8",
    node: (
      <g {...S}>
        <circle cx="12" cy="12" r="9.5" />
        <path d="M9 16.5v-9l7.5 9v-9" />
      </g>
    ),
  },
  TypeScript: { color: "#3178C6", node: <g>{mono("TS")}</g> },
  Tailwind: {
    color: "#38BDF8",
    node: (
      <g {...S}>
        <path d="M2.5 11c1.2-3.3 3.2-5 6-5 4.2 0 4.5 3.5 6.7 4.2 1.5.5 2.8 0 3.8-1.4" />
        <path d="M2.5 17.5c1.2-3.3 3.2-5 6-5 4.2 0 4.5 3.5 6.7 4.2 1.5.5 2.8 0 3.8-1.4" />
      </g>
    ),
  },
  Vite: {
    color: "#FFC663",
    node: (
      <g {...S}>
        <path d="M3 5.5 12 21l9-15.5-9 2.2-9-2.2Z" />
        <path d="M12.6 7.5 11 13l2.4.5-1.8 4.5" />
      </g>
    ),
  },
  "Node.js": {
    color: "#5FA04E",
    node: (
      <g {...S}>
        <path d="M12 2.6 21 7.8v8.4L12 21.4 3 16.2V7.8L12 2.6Z" />
        <path d="M9.5 15c.3 1 1.2 1.5 2.6 1.5 1.6 0 2.4-.6 2.4-1.7 0-2.4-4.8-1-4.8-3.6 0-1 .9-1.7 2.4-1.7 1.3 0 2.1.4 2.4 1.3" />
      </g>
    ),
  },
  Express: { color: "#B8BEC7", node: <g>{mono("ex", 10)}</g> },
  PostgreSQL: {
    color: "#4A90C7",
    node: (
      <g {...S}>
        <path d="M4.5 9.5c0-4 3.2-6.5 7.5-6.5s7.5 2.5 7.5 6.5c0 5-2.4 11.5-4.6 11.5-1 0-1-1.3-1-3.2" />
        <path d="M9.6 21C7.4 21 5 14.5 5 9.5" />
        <path d="M9.4 8.6h.01M14.6 8.6h.01" strokeWidth="2" />
        <path d="M12 12.4c0 1.7.3 3.4.9 5" />
      </g>
    ),
  },
  Prisma: {
    color: "#A9B5C6",
    node: (
      <g {...S}>
        <path d="M13.2 2.6 20 16.4a1 1 0 0 1-.7 1.4l-11.6 3a1 1 0 0 1-1.2-1.3L11.4 2.8a1 1 0 0 1 1.8-.2Z" />
      </g>
    ),
  },
  TypeORM: { color: "#F5B942", node: <g>{mono("OR", 8)}</g> },
  Supabase: {
    color: "#3ECF8E",
    node: (
      <g {...S}>
        <path d="M12.8 2.2 4.2 12.6a.8.8 0 0 0 .6 1.3h6.4v8.1a.8.8 0 0 0 1.4.5l8.6-10.4a.8.8 0 0 0-.6-1.3h-6.4V2.7a.8.8 0 0 0-1.4-.5Z" />
      </g>
    ),
  },
  Docker: {
    color: "#2496ED",
    node: (
      <g {...S}>
        <rect x="3" y="11" width="3.2" height="3.2" rx="0.4" />
        <rect x="7" y="11" width="3.2" height="3.2" rx="0.4" />
        <rect x="11" y="11" width="3.2" height="3.2" rx="0.4" />
        <rect x="7" y="7.4" width="3.2" height="3.2" rx="0.4" />
        <rect x="11" y="7.4" width="3.2" height="3.2" rx="0.4" />
        <path d="M2.5 15.5c0 3 2 4.8 5.6 4.8 5 0 8.4-2.4 9.6-6.4 1.8.3 3.3-.3 3.8-1.6-1-.7-2.4-.8-3.6-.2" />
      </g>
    ),
  },
  Vercel: {
    color: "#E8E8E8",
    node: (
      <g {...S}>
        <path d="M12 4 21.5 20H2.5L12 4Z" />
      </g>
    ),
  },
  AWS: { color: "#FF9900", node: <g>{mono("aws", 7)}</g> },
  Git: {
    color: "#F05133",
    node: (
      <g {...S}>
        <circle cx="6" cy="6" r="2.6" />
        <circle cx="6" cy="18" r="2.6" />
        <circle cx="17" cy="9.5" r="2.6" />
        <path d="M6 8.6v6.8" />
        <path d="M14.6 11.2c-1.4 2.6-3.6 3.9-6.6 4" />
      </g>
    ),
  },
  JWT: {
    color: "#D63AFF",
    node: (
      <g {...S}>
        <rect x="4" y="10" width="16" height="10" rx="2.2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        <circle cx="12" cy="15" r="1.2" fill="currentColor" stroke="none" />
      </g>
    ),
  },
  Recharts: {
    color: "#8AD1C2",
    node: (
      <g {...S}>
        <path d="M3.5 20V4M3.5 20H21" />
        <path d="M7.5 20v-5M12 20v-9M16.5 20v-6" />
      </g>
    ),
  },
  "Styled-Components": {
    color: "#DB7093",
    node: (
      <g {...S}>
        <path d="M8 4h8l-1 5H9.5L9 12h5.5l-.8 5L12 20" />
      </g>
    ),
  },
  CSS: { color: "#8AA9FF", node: <g>{mono("{ }", 9)}</g> },
  API: {
    color: "#9AAAA1",
    node: (
      <g {...S}>
        <path d="M9 7 4.5 12 9 17M15 7l4.5 5-4.5 5" />
        <path d="M13.2 5.5 10.8 18.5" />
      </g>
    ),
  },
};

/** Nomes que aparecem no conteúdo com grafia diferente da chave. */
const ALIASES: Record<string, TechName> = {
  "API do GitHub": "API",
  "Git / CI": "Git",
  Postgres: "PostgreSQL",
  Node: "Node.js",
  Next: "Next.js",
};

export function resolveTech(name: string): TechName | null {
  if (name in GLYPHS) return name as TechName;
  return ALIASES[name] ?? null;
}

export function techColor(name: string): string {
  const key = resolveTech(name);
  return key ? GLYPHS[key].color : "#9AAAA1";
}

export default function TechIcon({
  name,
  size = 20,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const key = resolveTech(name);
  if (!key) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {GLYPHS[key].node}
    </svg>
  );
}
