"use client";
import { useEffect, useRef, useMemo } from "react";

export default function Especialidades() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-reveal]"));

    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      items.forEach((n) => n.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target as Element);
        }
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -10% 0px' });

    requestAnimationFrame(() => {
      const vh = window.innerHeight || 0;
      items.forEach((n) => {
        const r = n.getBoundingClientRect();
        if (r.top < vh * 0.95 && r.bottom > 0) {
          n.classList.add('is-in');
        } else {
          io.observe(n);
        }
      });
    });

    return () => io.disconnect();
  }, []);

  // Hover glow: track pointer within each tile and set CSS vars
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const tiles = Array.from(root.querySelectorAll<HTMLElement>('.tile'));
    const onMove = (e: PointerEvent) => {
      const t = e.currentTarget as HTMLElement;
      const rect = t.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      t.style.setProperty('--mx', mx + '%');
      t.style.setProperty('--my', my + '%');
    };
    tiles.forEach(t => {
      t.addEventListener('pointermove', onMove as any);
    });
    return () => {
      tiles.forEach(t => t.removeEventListener('pointermove', onMove as any));
    };
  }, []);

  // Data model inspired by the reference section
  type Level = "Forte" | "Bom";
  type Tile = { icon?: React.ReactNode; title: string; level: Level; chips: string[] };
  type Category = { id: string; title: string; meta: string; tiles: Tile[] };

  const categories: Category[] = useMemo(() => ([
    {
      id: "front",
      title: "Front-end",
      meta: "JavaScript, React, TypeScript, Next.js",
      tiles: [
        { title: "JavaScript", level: "Forte", chips: ["ES6+", "DOM", "APIs", "Fetch", "Async/Await", "Vite"] },
        { title: "React", level: "Forte", chips: ["Hooks", "SPA", "Styled Components", "Context API", "React Router", "React Query"] },
        { title: "TypeScript", level: "Forte", chips: ["Type Safety", "ESNext", "Full-stack", "Generics", "Utility Types", "Zod"] },
        { title: "Next.js", level: "Forte", chips: ["SSR", "SSG", "API Routes", "App Router", "Middleware", "Optimizações"] },
      ],
    },
    {
      id: "back",
      title: "Back-end",
      meta: "Node.js, Python",
      tiles: [
        { title: "Node.js", level: "Forte", chips: ["Express", "API REST", "Prisma", "JWT", "Fastify", "WebSockets"] },
        { title: "Python", level: "Bom", chips: ["Django", "Flask", "Automação", "Scripts", "Bots", "Pandas"] },
      ],
    },
    {
      id: "db",
      title: "Banco de Dados",
      meta: "SQL, MongoDB",
      tiles: [
        { title: "SQL", level: "Forte", chips: ["MySQL", "PostgreSQL", "SQLite", "Migrations", "Joins", "Indexes"] },
        { title: "MongoDB", level: "Bom", chips: ["NoSQL", "Aggregation", "Atlas", "Mongoose", "Schemas", "Indexes"] },
      ],
    },
    {
      id: "devops",
      title: "DevOps",
      meta: "Docker",
      tiles: [
        { title: "Docker", level: "Bom", chips: ["Docker Compose", "Images", "Volumes", "Multi-stage", "CI/CD", "Networking"] },
      ],
    },
    {
      id: "tools",
      title: "Ferramentas",
      meta: "Git & GitHub",
      tiles: [
        { title: "Git & GitHub", level: "Forte", chips: ["Branching", "Pull request", "Actions", "Rebase", "Conventional Commits", "Issues/Projects"] },
      ],
    },
  ]), []);

  const meterPercent = (lvl: Level) => (lvl === "Forte" ? 90 : 70);

  // Dedicated lightweight SVG icons per technology
  const techIcon = (name: string) => {
    const n = name.toLowerCase();
    const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8 } as const;
    if (n.includes('react')) {
      return (
        <svg {...common} strokeWidth={1.5}>
          <circle cx="12" cy="12" r="2.2" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
        </svg>
      );
    }
    if (n.includes('type') || n === 'ts' || n.includes('typescript')) {
      return (
        <svg {...common}>
          <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
          <path d="M7 12h5M9.5 12v6" />
          <path d="M15 14.5c.6-1 2-1.4 3-.8 1 .6 1.2 2 .1 2.7-.8.5-1.6.6-2.4 1.4" />
        </svg>
      );
    }
    if (n.includes('next')) {
      return (
        <svg {...common}>
          <path d="M4 6h16v12H4z" />
          <path d="M6 6l12 12" />
        </svg>
      );
    }
    if (n.includes('java') || n.includes('javascript')) {
      return (
        <svg {...common}>
          <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
          <path d="M8 16v-5m3 5v-3m3 3v-5" />
        </svg>
      );
    }
    if (n.includes('node')) {
      return (
        <svg {...common}>
          <polygon points="12,3 21,8 21,16 12,21 3,16 3,8" />
          <path d="M9 10v4a3 3 0 0 0 6 0v-4" />
        </svg>
      );
    }
    if (n.includes('python')) {
      return (
        <svg {...common}>
          <path d="M12 4h3a3 3 0 0 1 3 3v3H9a2 2 0 0 1-2-2V7a3 3 0 0 1 3-3h2z" />
          <circle cx="14.5" cy="6.5" r=".8" fill="currentColor" />
          <path d="M12 20h-3a3 3 0 0 1-3-3v-3h9a2 2 0 0 1 2 2v1a3 3 0 0 1-3 3h-2z" />
          <circle cx="9.5" cy="17.5" r=".8" fill="currentColor" />
        </svg>
      );
    }
    if (n === 'sql' || n.includes('mysql') || n.includes('postgres') || n.includes('sqlite')) {
      return (
        <svg {...common}>
          <ellipse cx="12" cy="6.5" rx="7" ry="2.5" />
          <path d="M5 6.5v9c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-9" />
        </svg>
      );
    }
    if (n.includes('mongo')) {
      return (
        <svg {...common}>
          <path d="M12 3c3 3 4.5 6.5 3.6 10.8-.7 3-2.4 4.9-3.6 6.2-1.2-1.3-2.9-3.2-3.6-6.2C5.5 9.5 9 5.5 12 3z" />
          <path d="M12 3v18" />
        </svg>
      );
    }
    if (n.includes('docker')) {
      return (
        <svg {...common}>
          <rect x="5" y="11" width="3" height="3" />
          <rect x="9" y="11" width="3" height="3" />
          <rect x="13" y="11" width="3" height="3" />
          <rect x="9" y="7" width="3" height="3" />
          <path d="M4 14h15a3 3 0 0 1-3 3H8a4 4 0 0 1-4-4" />
        </svg>
      );
    }
    if (n.includes('git')) {
      return (
        <svg {...common}>
          <path d="M6 7l6 6m-2 2l-6-6" />
          <circle cx="7" cy="6" r="2" fill="currentColor" />
          <circle cx="12" cy="11" r="2" fill="currentColor" />
          <circle cx="9" cy="13" r="2" fill="currentColor" />
        </svg>
      );
    }
    // Fallback generic square
    return (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2"/></svg>
    );
  };

  return (
    <section ref={sectionRef} className="skills-v2" id="especialidades">
      <div className="skills-bg" aria-hidden="true" />
      <div className="interface interface--full">
        <div className="skills-wrap">
          <div className="v2-flag" aria-hidden="true">
            <span className="flag-green" />
            <span className="flag-white" />
            <span className="flag-red" />
          </div>

          <h2 className="about-title" data-reveal style={{ ['--d' as any]: '80ms' }}>
            <span className="line">Minhas</span>
            <span className="line">Especialidades</span>
          </h2>

          <p className="skills-lead" data-reveal style={{ ['--d' as any]: '120ms' }}>
            Foco em entregar resultados com stack moderna, performance e boas práticas.
          </p>
          <div className="skill-accordion">
            {categories.map((cat, idx) => (
              <section key={cat.id} className="acc-panel" data-reveal style={{ ['--d' as any]: `${160 + idx*60}ms` }}>
                <div className="acc-head" aria-hidden="true" role="presentation">
                  <div className="acc-head-left">
                    <span className="acc-category">{cat.title}</span>
                    <span className="acc-meta">{cat.meta}</span>
                  </div>
                </div>
                <div id={`acc-${cat.id}`} className="acc-body is-open" role="region" aria-label={cat.title}>
                  <div className="tile-grid">
                    {cat.tiles.map((t) => (
                      <article className="tile" key={t.title}>
                        <header className="tile-head">
                          <div className="tile-icon" aria-hidden>
                            {techIcon(t.title)}
                          </div>
                          <div className="tile-titles">
                            <h4 className="tile-title">{t.title}</h4>
                          </div>
                          <span className={`tile-badge ${t.level === 'Forte' ? 'lvl-strong' : 'lvl-good'}`}>{t.level}</span>
                        </header>
                        <div className="tile-meter" aria-label={`Proficiência: ${t.level}`} role="img">
                          <span className="tile-meter-bar" style={{ width: meterPercent(t.level) + '%' }} />
                        </div>
                        <ul className="tile-chips" role="list">
                          {t.chips.map((c) => (<li key={c} className="chip" title={c}>{c}</li>))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
