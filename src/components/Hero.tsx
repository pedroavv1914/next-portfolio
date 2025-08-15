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

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = (x / rect.width) * 2 - 1; // -1..1
    const dy = (y / rect.height) * 2 - 1;
    el.style.setProperty("--mx", String(x));
    el.style.setProperty("--my", String(y));
    el.style.setProperty("--dx", String(dx));
    el.style.setProperty("--dy", String(dy));
  };

  return (
    <section
      ref={sectionRef}
      className="hero neo-hero has-cursor-glow"
      id="inicio"
      onMouseMove={handleMouseMove}
    >
      <div className="hero-bg" aria-hidden="true">
        <span className="orb orb-1" />
        <span className="orb orb-2" />
        <span className="grid-overlay" />
        <span className="cursor-glow" />
      </div>

      <div className="interface">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-topline" data-reveal>
              <span className="hero-greeting">Olá, eu sou</span>
              <span className="availability-badge"><span className="dot" /> Disponível para projetos</span>
            </div>
            <div className="title-wrap" data-reveal>
              <div className="aurora" aria-hidden="true" />
              <h1 className="hero-title">
                Pedro <span className="grad">Ribeiro</span>
              </h1>
            </div>
            <p className="hero-subtitle" data-reveal>
              Desenvolvedor Full Stack focado em performance, qualidade e UX.
            </p>
            <p className="hero-description" data-reveal>
              Eu ajudo empresas e pessoas a materializarem ideias em produtos digitais de alto impacto. Código limpo, acessível e com atenção aos detalhes.
            </p>
            <div className="hero-ctas" data-reveal>
              <a href="#portifolio" className="btn-primary">
                <i className="bi bi-rocket-takeoff" /> Ver Projetos
              </a>
              <a href="#formulario" className="btn-secondary">
                <i className="bi bi-chat-dots" /> Iniciar Conversa
              </a>
            </div>
            <ul className="hero-stats" aria-label="Métricas" data-reveal>
              <li className="stat"><strong>3+</strong><span>Anos</span></li>
              <li className="stat"><strong>20+</strong><span>Projetos</span></li>
              <li className="stat"><strong>98%</strong><span>Satisfação</span></li>
            </ul>
            <ul className="hero-chips" aria-label="Destaques" data-reveal>
              <li className="chip"><i className="bi bi-award" /> +3 anos experiência</li>
              <li className="chip"><i className="bi bi-boxes" /> +20 projetos</li>
              <li className="chip"><i className="bi bi-stack" /> React • Node • SQL</li>
            </ul>

            <div className="hero-social inline" data-reveal>
              <a href="https://www.linkedin.com/in/pedro-ribeiro-a71300230/" target="_blank" className="social-icon" aria-label="LinkedIn"><i className="bi bi-linkedin" /></a>
              <a href="https://github.com/pedroavv1914" target="_blank" className="social-icon" aria-label="GitHub"><i className="bi bi-github" /></a>
              <a href="https://www.instagram.com/_pedroavv/" target="_blank" className="social-icon" aria-label="Instagram"><i className="bi bi-instagram" /></a>
            </div>
          </div>
          <div className="hero-showcase" data-reveal>
            <div className="device-card">
              <div className="device-status">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
              <div className="device-body">
                <div className="code-lines">
                  <span className="line" />
                  <span className="line w-2/3" />
                  <span className="line w-4/5" />
                  <span className="line w-1/2" />
                </div>
                <div className="preview-card">
                  <div className="pc-header">
                    <span className="pc-title" />
                    <span className="pc-dot" />
                  </div>
                  <div className="pc-body">
                    <span className="pc-line" />
                    <span className="pc-line w-3/5" />
                  </div>
                  <div className="pc-actions">
                    <span className="pc-btn" />
                    <span className="pc-btn ghost" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Role para baixo</span>
          <i className="bi bi-arrow-down" />
        </div>
      </div>
      <div id="particles-js" />
    </section>
  );
}
