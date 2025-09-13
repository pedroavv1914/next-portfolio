"use client";
import { useEffect, useRef } from "react";

export default function Sobre() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-reveal]"));

    // Fallbacks: reduced-motion or missing IO => reveal immediately
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
    }, { threshold: 0.01, rootMargin: '0px 0px -10% 0px' });

    // Reveal any items already in viewport on mount
    const revealIfInView = () => {
      const vh = window.innerHeight || 0;
      items.forEach((n) => {
        const r = n.getBoundingClientRect();
        if (r.top < vh * 0.95 && r.bottom > 0) {
          n.classList.add('is-in');
        } else {
          io.observe(n);
        }
      });
    };
    // Delay to allow layout paint before measuring
    requestAnimationFrame(revealIfInView);

    return () => io.disconnect();
  }, []);

  // Parallax effect on scroll
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        const delta = Math.max(-150, Math.min(150, r.top));
        el.style.setProperty('--parallax', `${delta}px`);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <section ref={sectionRef} className="sobre-v2" id="sobre">

      <div className="interface">
        <div className="sobre-wrap">
          {/* Flag bars for visual continuity with Hero */}
          <div className="v2-flag" aria-hidden="true">
            <span className="flag-green" />
            <span className="flag-white" />
            <span className="flag-red" />
          </div>

          {/* Title with animated sweep akin to Hero */}
          <h2 className="about-title" data-reveal style={{ ['--d' as any]: '80ms' }}>
            <span className="line">Muito prazer, sou</span>
            <span className="line">Pedro Ribeiro</span>
          </h2>

          <div className="about-grid">
            {/* Left: Glass avatar card */}
            <aside className="about-card" data-reveal style={{ ['--d' as any]: '160ms' }}>
              <figure className="about-portrait" role="img" aria-label="Foto de Pedro Ribeiro">
                <div className="portrait-frame">
                  <img src="/foto-profissoianal.jpg" alt="Pedro Ribeiro" loading="lazy" decoding="async" />
                </div>
                <figcaption className="portrait-caption">Full Stack • React • TS • Node</figcaption>
              </figure>
            </aside>

            {/* Right: Copy, values, stack and actions */}
            <div className="about-copy" data-reveal style={{ ['--d' as any]: '220ms' }}>
              <p className="about-lead2">
                Desenvolvedor <strong>Full Stack</strong> focado em experiências de alto impacto.
                Transformo ideias em produtos com <strong>código limpo</strong>, <strong>performance</strong> e atenção obsessiva aos detalhes.
              </p>

              <ul className="about-values2" role="list">
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" fill="currentColor" /></svg>
                  Entrego rápido sem abrir mão da qualidade
                </li>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l7 4v6c0 5-3.5 9.7-7 10-3.5-.3-7-5-7-10V6l7-4zm0 6a3 3 0 100 6 3 3 0 000-6z" fill="currentColor" /></svg>
                  Arquiteturas seguras, performáticas e escaláveis
                </li>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" fill="currentColor" /></svg>
                  Microinterações e UX cuidadosa para surpreender
                </li>
              </ul>

              <div className="about-ctas">
                <a href="#portifolio" className="v2-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 8v-8h8v8h-8z" /></svg>
                  Ver projetos
                </a>
                <a href="#formulario" className="v2-secondary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2 4h20v14H7l-5 4V4zm4 4h12v2H6V8zm0 4h9v2H6v-2z" /></svg>
                  Vamos conversar
                </a>
              </div>

              {/* Social buttons */}
              <div className="about-socials" aria-label="Minhas redes" data-reveal style={{ ['--d' as any]: '260ms' }}>
                <a className="social-btn" href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.51 2.87 8.33 6.85 9.68.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06 .9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.09 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 7.3c.85 0 1.71.12 2.51.34 1.9-1.33 2.74-1.05 2.74-1.05.56 1.4.21 2.44.11 2.7.64.72 1.02 1.63 1.02 2.75 0 3.96-2.34 4.82-4.57 5.08.36.32.67.95.67 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.59.69.49A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" /></svg>
                </a>
                <a className="social-btn" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.77 2.65 4.77 6.1V24h-4v-7.1c0-1.7-.03-3.9-2.38-3.9-2.38 0-2.75 1.86-2.75 3.78V24h-4V8z" /></svg>
                </a>
                <a className="social-btn" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.9.26 2.36.43.6.23 1.03.5 1.48.95.45.45.72.88.95 1.48.17.46.37 1.16.43 2.36.08 1.3.08 1.7.08 4.9s0 3.6-.08 4.9c-.06 1.2-.26 1.9-.43 2.36a3.9 3.9 0 0 1-.95 1.48 3.9 3.9 0 0 1-1.48.95c-.46.17-1.16.37-2.36.43-1.3.08-1.7.08-4.9.08s-3.6 0-4.9-.08c-1.2-.06-1.9-.26-2.36-.43a3.9 3.9 0 0 1-1.48-.95 3.9 3.9 0 0 1-.95-1.48c-.17-.46-.37-1.16-.43-2.36C2.2 15.6 2.2 15.2 2.2 12s0-3.6.08-4.9c.06-1.2.26-1.9.43-2.36.23-.6.5-1.03.95-1.48.45-.45.88-.72 1.48-.95.46-.17 1.16-.37 2.36-.43C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.16 0-3.53 0-4.77.07-.98.05-1.5.21-1.85.35-.46.18-.8.39-1.15.74-.35.35-.56.69-.74 1.15-.14.35-.3.87-.35 1.85-.07 1.24-.07 1.6-.07 4.77s0 3.53.07 4.77c.05.98.21 1.5.35 1.85.18.46.39.8.74 1.15.35.35.69.56 1.15.74.35.14.87.3 1.85.35 1.24.07 1.6.07 4.77.07s3.53 0 4.77-.07c.98-.05 1.5-.21 1.85-.35.46-.18.8-.39 1.15-.74.35-.35.56-.69.74-1.15.14-.35.3-.87.35-1.85.07-1.24.07-1.6.07-4.77s0-3.53-.07-4.77c-.05-.98-.21-1.5-.35-1.85-.18-.46-.39-.8-.74-1.15a3 3 0 0 0-1.15-.74c-.35-.14-.87-.3-1.85-.35-1.24-.07-1.6-.07-4.77-.07Zm0 3.7a5.4 5.4 0 1 1 0 10.8 5.4 5.4 0 0 1 0-10.8Zm0 1.8a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2Zm5.6-3.1a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6Z" /></svg>
                </a>
                <a className="social-btn" href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.46 0 0.12 5.34 0.12 11.94c0 2.1.56 4.15 1.62 5.95L0 24l6.3-1.65a12.05 12.05 0 0 0 5.76 1.48h.01c6.6 0 11.94-5.34 11.94-11.94 0-3.19-1.24-6.19-3.49-8.41ZM12.07 21.2h-.01a9.25 9.25 0 0 1-4.72-1.29l-.34-.2-3.73.98.99-3.64-.22-.37a9.3 9.3 0 1 1 8.02 4.52Zm5.32-6.92c-.29-.14-1.71-.84-1.98-.94-.27-.1-.47-.14-.68.14-.2.29-.78.95-.96 1.14-.18.2-.36.22-.65.08-.29-.14-1.23-.45-2.34-1.43a8.77 8.77 0 0 1-1.63-2.02c-.17-.29-.02-.45.12-.59.12-.12.29-.31.43-.47.14-.16.18-.26.27-.43.09-.17.05-.33-.02-.47-.07-.14-.68-1.64-.93-2.25-.24-.58-.49-.5-.68-.51l-.58-.01c-.2 0-.5.07-.76.33-.26.26-1 1-1 2.43s1.02 2.82 1.16 3.01c.14.2 2 3.06 4.85 4.29.68.29 1.2.46 1.6.59.67.21 1.28.18 1.77.11.54-.08 1.71-.7 1.95-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.2-.55-.34Z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
