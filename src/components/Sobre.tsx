export default function Sobre() {
  return (
    <section className="sobre" id="sobre">
      <div className="interface">
        <h2 className="titulo" data-kicker="Sobre">MUITO PRAZER, SOU <span>PEDRO RIBEIRO</span>.</h2>

        <div className="sobre-neo">
          <div className="sobre-neo__left" aria-hidden="false">
            <figure className="about-avatar" role="img" aria-label="Foto de Pedro Ribeiro">
              <div className="avatar-circle">
                <img src="/foto-profissoianal.jpg" alt="Pedro Ribeiro" loading="lazy" decoding="async" />
              </div>
              <figcaption className="avatar-caption">Full Stack • React • TS • Node</figcaption>
            </figure>
          </div>

          <div className="sobre-neo__right">
            <p className="about-lead">
              Desenvolvedor <strong>Full Stack</strong> focado em construir experiências digitais de alto impacto.
              Transformo ideias em produtos com <strong>código limpo</strong>, <strong>boas práticas</strong> e obsessão por detalhes.
            </p>

            <ul className="about-values" role="list">
              <li><i className="bi bi-lightning-charge" /> Entrego rápido sem abrir mão da qualidade.</li>
              <li><i className="bi bi-shield-check" /> Arquiteturas seguras, performáticas e escaláveis.</li>
              <li><i className="bi bi-stars" /> Microinterações e UX cuidadosa para surpreender.</li>
            </ul>

            <div className="about-metrics" aria-label="Métricas de confiança">
              <div className="metric">
                <span className="metric__num">2+</span>
                <span className="metric__label">anos de experiência</span>
              </div>
              <div className="metric">
                <span className="metric__num">15+</span>
                <span className="metric__label">projetos entregues</span>
              </div>
              <div className="metric">
                <span className="metric__num">100%</span>
                <span className="metric__label">foco em qualidade</span>
              </div>
            </div>

            <div className="about-actions">
              <a href="#portifolio" className="btn-primary">Ver projetos</a>
              <a href="#formulario" className="btn-secondary">Vamos conversar</a>
            </div>

            <div className="about-stack" aria-label="Stack principal">
              <span className="chip">React</span>
              <span className="chip">TypeScript</span>
              <span className="chip">Next.js</span>
              <span className="chip">Node.js</span>
              <span className="chip">SQL</span>
              <span className="chip">MongoDB</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
