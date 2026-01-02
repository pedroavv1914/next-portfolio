"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  // Cursor glow removido para evitar barra lateral

  // Constellation particles (lightweight, respects reduced motion)
  useEffect(() => {
    const canvas = canvasRef.current;
    const el = sectionRef.current;
    if (!canvas || !el) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const DPR = Math.min(2, window.devicePixelRatio || 1);
    const size = () => {
      const rect = el.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * DPR);
      canvas.height = Math.floor(rect.height * DPR);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };
    size();

    const styles = getComputedStyle(document.documentElement);
    const brand = styles.getPropertyValue('--brand').trim() || '#10b981';

    type P = { x:number; y:number; vx:number; vy:number; };
    const pts: P[] = [];
    const rect = () => el.getBoundingClientRect();
    const getCount = () => {
      const r = rect();
      const area = r.width * r.height;
      // scale with area; clamp for perf
      return Math.round(Math.min(200, Math.max(90, area / 16000)));
    };
    const seed = () => {
      pts.length = 0;
      const r = rect();
      const count = getCount();
      for (let i=0;i<count;i++) {
        pts.push({
          x: Math.random()*r.width*DPR,
          y: Math.random()*r.height*DPR,
          vx: (Math.random()-0.5)*0.15*DPR,
          vy: (Math.random()-0.5)*0.15*DPR,
        });
      }
    };
    seed();

    const step = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      // draw links
      const linkDist = 110*DPR;
      ctx.lineWidth = 0.8*DPR;
      for (let i=0;i<pts.length;i++){
        for (let j=i+1;j<pts.length;j++){
          const a = pts[i], b = pts[j];
          const dx = a.x-b.x, dy=a.y-b.y; const d = Math.hypot(dx,dy);
          if (d < linkDist){
            const alpha = 1 - d/linkDist;
            ctx.strokeStyle = `rgba(16,185,129,${0.16*alpha})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
          }
        }
      }
      // draw points
      for (const p of pts){
        ctx.fillStyle = brand;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.2*DPR, 0, Math.PI*2); ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x<0||p.x>canvas.width) p.vx*=-1;
        if (p.y<0||p.y>canvas.height) p.vy*=-1;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const onResize = () => { size(); seed(); };
    window.addEventListener('resize', onResize);

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  // Parallax on scroll: updates CSS var --p with clamped scroll delta
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        const delta = Math.max(-200, Math.min(200, r.top));
        el.style.setProperty('--p', `${delta}px`);
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

  // Metrics counters: animate values when stats list becomes visible
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const stats = el.querySelector<HTMLElement>('.v2-stats');
    if (!stats) return;
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const counters = stats.querySelectorAll<HTMLElement>('[data-to]');
        counters.forEach((node) => {
          const to = Number(node.dataset.to || '0');
          const suffix = node.dataset.suffix || '';
          const duration = 900;
          const start = performance.now();
          const step = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = p < 0.5 ? 2*p*p : -1 + (4 - 2*p) * p; // easeInOutQuad
            const val = Math.round(to * eased);
            node.textContent = `${val}${suffix}`;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(stats);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="hero hero-v2" id="inicio">
      <div className="hero-v2-bg" aria-hidden="true" />

      <canvas ref={canvasRef} className="constellation" aria-hidden="true" />
      <div className="interface">
        <div className="v2-wrap" data-reveal style={{ '--d': '0ms' } as React.CSSProperties}>
          <div className="v2-availability" data-reveal style={{ '--d': '20ms' } as React.CSSProperties}>
            <span className="dot" aria-hidden="true" />
            <span>Disponível para freelas</span>
          </div>
          <div className="v2-flag" data-reveal style={{ '--d': '50ms' } as React.CSSProperties}>
            <span className="flag-green" />
            <span className="flag-white" />
            <span className="flag-red" />
          </div>
          <h1 className="v2-title" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
            <span className="line">Pedro</span>
            <span className="line">Ribeiro</span>
          </h1>
          <p className="v2-sub" data-reveal style={{ '--d': '240ms' } as React.CSSProperties}>Full‑Stack Developer • React • Node • SQL</p>
          <p className="v2-desc" data-reveal style={{ '--d': '320ms' } as React.CSSProperties}>Crio experiências digitais rápidas, acessíveis e bem projetadas. Transformo ideias em produtos entregáveis, com foco em valor e qualidade.</p>
          <div className="v2-ctas" data-reveal style={{ '--d': '420ms' } as React.CSSProperties}>
            <a href="#portifolio" className="btn-primary v2-primary"><i className="bi bi-rocket-takeoff" /> Ver Projetos</a>
            <a href="#formulario" className="btn-secondary v2-secondary"><i className="bi bi-chat-dots" /> Iniciar Conversa</a>
            <a href="/cv.pdf" className="btn-tertiary v2-tertiary" download><i className="bi bi-file-earmark-arrow-down" /> Baixar CV</a>
          </div>
          {/* Contact shortcuts */}
          <div className="v2-contacts" data-reveal style={{ '--d': '480ms' } as React.CSSProperties}>
            <a href="#formulario" aria-label="WhatsApp"><i className="bi bi-whatsapp" /></a>
            <a href="mailto:pedroribeiro.contato1914@gmail.com" aria-label="Email"><i className="bi bi-envelope" /></a>
            <a href="https://www.linkedin.com/in/pedro-ribeiro-a71300230/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="bi bi-linkedin" /></a>
          </div>
          <ul className="v2-strip" aria-label="Tecnologias" data-reveal style={{ '--d': '520ms' } as React.CSSProperties}>
            <li>React</li>
            <li>Next.js</li>
            <li>Node</li>
            <li>TypeScript</li>
            <li>SQL</li>
            <li>Tailwind</li>
          </ul>
          {/* Client logos */}
          <div className="v2-logos" data-reveal style={{ '--d': '560ms' } as React.CSSProperties} aria-label="Clientes">
            <img src="/api-stratix.png" alt="Stratix" loading="lazy" />
            <img src="/api-shopsphere.png" alt="ShopSphere" loading="lazy" />
            <img src="/api-petshop.png" alt="Petshop" loading="lazy" />
          </div>
          <div className="v2-highlights" aria-label="Destaques" data-reveal style={{ '--d': '620ms' } as React.CSSProperties}>
            <span className="pill"><i className="bi bi-speedometer2" /> 90+ no Lighthouse</span>
            <span className="pill"><i className="bi bi-rocket" /> Entrega ágil</span>
            <span className="pill"><i className="bi bi-code-slash" /> Código limpo</span>
          </div>
        </div>
      </div>
    </section>
  );
}
