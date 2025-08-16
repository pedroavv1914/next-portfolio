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
        { title: "JavaScript", level: "Forte", chips: ["ES6+", "DOM", "APIs", "+2"] },
        { title: "React", level: "Forte", chips: ["Hooks", "SPA", "Styled Components"] },
        { title: "TypeScript", level: "Forte", chips: ["Type Safety", "ESNext", "Full-stack"] },
        { title: "Next.js", level: "Forte", chips: ["SSR", "SSG", "API Routes"] },
      ],
    },
    {
      id: "back",
      title: "Back-end",
      meta: "Node.js, Python",
      tiles: [
        { title: "Node.js", level: "Forte", chips: ["Express", "API REST", "Prisma"] },
        { title: "Python", level: "Bom", chips: ["Django", "Flask", "Automação"] },
      ],
    },
    {
      id: "db",
      title: "Banco de Dados",
      meta: "SQL, MongoDB",
      tiles: [
        { title: "SQL", level: "Forte", chips: ["MySQL", "PostgreSQL", "SQLite"] },
        { title: "MongoDB", level: "Bom", chips: ["NoSQL", "Aggregation", "Atlas"] },
      ],
    },
    {
      id: "devops",
      title: "DevOps",
      meta: "Docker",
      tiles: [
        { title: "Docker", level: "Bom", chips: ["Docker Compose", "Images", "Volumes"] },
      ],
    },
    {
      id: "tools",
      title: "Ferramentas",
      meta: "Git & GitHub",
      tiles: [
        { title: "Git & GitHub", level: "Forte", chips: ["Branching", "Pull request", "Actions"] },
      ],
    },
  ]), []);

  return (
    <section ref={sectionRef} className="skills-v2" id="especialidades">
      <div className="skills-bg" aria-hidden="true" />
      <div className="interface">
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
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2"/></svg>
                          </div>
                          <div className="tile-titles">
                            <h4 className="tile-title">{t.title}</h4>
                          </div>
                          <span className={`tile-badge ${t.level === 'Forte' ? 'lvl-strong' : 'lvl-good'}`}>{t.level}</span>
                        </header>
                        <ul className="tile-chips" role="list">
                          {t.chips.map((c) => (<li key={c} className="chip">{c}</li>))}
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
