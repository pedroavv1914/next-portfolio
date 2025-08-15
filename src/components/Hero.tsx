"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2 }
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="hero hero-v2" id="inicio">
      <div className="hero-v2-bg" aria-hidden="true" />
      <div className="interface">
        <div className="v2-wrap" data-reveal>
          <div className="v2-flag">
            <span className="flag-green" />
            <span className="flag-white" />
            <span className="flag-red" />
          </div>
          <h1 className="v2-title">
            <span className="line">Pedro</span>
            <span className="line">Ribeiro</span>
          </h1>
          <p className="v2-sub">Full‑Stack Developer • React • Node • SQL</p>
          <p className="v2-desc">Crio experiências digitais rápidas, acessíveis e bem projetadas. Transformo ideias em produtos entregáveis, com foco em valor e qualidade.</p>
          <div className="v2-ctas">
            <a href="#portifolio" className="btn-primary v2-primary"><i className="bi bi-rocket-takeoff" /> Ver Projetos</a>
            <a href="#formulario" className="btn-secondary v2-secondary"><i className="bi bi-chat-dots" /> Iniciar Conversa</a>
          </div>
          <ul className="v2-strip" aria-label="Tecnologias">
            <li>React</li>
            <li>Next.js</li>
            <li>Node</li>
            <li>TypeScript</li>
            <li>SQL</li>
            <li>Tailwind</li>
          </ul>
          <ul className="v2-stats" aria-label="Métricas">
            <li><strong>3+</strong><span>Anos</span></li>
            <li><strong>20+</strong><span>Projetos</span></li>
            <li><strong>98%</strong><span>Satisfação</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
