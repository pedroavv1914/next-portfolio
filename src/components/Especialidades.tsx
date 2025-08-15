export default function Especialidades() {
  return (
    <section className="especialidades" id="especialidades">
      <div className="interface">
        <h2 className="titulo">MINHAS <span>ESPECIALIDADES.</span></h2>
        <div className="habilidades-paineis" role="list">
          {/* Front-end */}
          <section className="painel-categoria" data-category="front-end" role="region" aria-labelledby="painel-front-end-title">
            <button className="painel-header" id="painel-front-end-title" aria-expanded="true">
              <span className="painel-titulo"><i className="bi bi-braces" /> Front-end</span>
              <span className="painel-meta">JavaScript, React, TypeScript, Next.js</span>
              <i className="bi bi-chevron-down" aria-hidden="true" />
            </button>
            <div className="painel-body">
              <ul className="skill-list">
                <li className="skill-row">
                  <span className="skill-icon"><i className="bi bi-filetype-js" /></span>
                  <span className="skill-name">JavaScript</span>
                  <span className="level-badge level-strong" aria-label="Nível: Forte">Forte</span>
                  <ul className="skill-chips"><li>ES6+</li><li>DOM</li><li>APIs</li><li>Async/Await</li><li>Fetch</li></ul>
                </li>
                <li className="skill-row">
                  <span className="skill-icon"><i className="bi bi-filetype-jsx" /></span>
                  <span className="skill-name">React</span>
                  <span className="level-badge level-strong" aria-label="Nível: Forte">Forte</span>
                  <ul className="skill-chips"><li>Hooks</li><li>SPA</li><li>Styled Components</li></ul>
                </li>
                <li className="skill-row">
                  <span className="skill-icon"><i className="bi bi-filetype-tsx" /></span>
                  <span className="skill-name">TypeScript</span>
                  <span className="level-badge level-strong" aria-label="Nível: Forte">Forte</span>
                  <ul className="skill-chips"><li>Type Safety</li><li>ESNext</li><li>Full-stack</li></ul>
                </li>
                <li className="skill-row">
                  <span className="skill-icon"><i className="bi bi-window-stack" /></span>
                  <span className="skill-name">Next.js</span>
                  <span className="level-badge level-strong" aria-label="Nível: Forte">Forte</span>
                  <ul className="skill-chips"><li>SSR</li><li>SSG</li><li>API Routes</li></ul>
                </li>
              </ul>
            </div>
          </section>

          {/* Back-end */}
          <section className="painel-categoria" data-category="back-end" role="region" aria-labelledby="painel-back-end-title">
            <button className="painel-header" id="painel-back-end-title" aria-expanded="true">
              <span className="painel-titulo"><i className="bi bi-cpu" /> Back-end</span>
              <span className="painel-meta">Node.js, Python</span>
              <i className="bi bi-chevron-down" aria-hidden="true" />
            </button>
            <div className="painel-body">
              <ul className="skill-list">
                <li className="skill-row">
                  <span className="skill-icon"><i className="bi bi-filetype-js" /></span>
                  <span className="skill-name">Node.js</span>
                  <span className="level-badge level-strong" aria-label="Nível: Forte">Forte</span>
                  <ul className="skill-chips"><li>Express</li><li>API REST</li><li>Prisma</li></ul>
                </li>
                <li className="skill-row">
                  <span className="skill-icon"><i className="bi bi-filetype-py" /></span>
                  <span className="skill-name">Python</span>
                  <span className="level-badge level-good" aria-label="Nível: Bom">Bom</span>
                  <ul className="skill-chips"><li>Django</li><li>Flask</li><li>Automação</li></ul>
                </li>
              </ul>
            </div>
          </section>

          {/* Banco de Dados */}
          <section className="painel-categoria" data-category="database" role="region" aria-labelledby="painel-database-title">
            <button className="painel-header" id="painel-database-title" aria-expanded="true">
              <span className="painel-titulo"><i className="bi bi-database" /> Banco de Dados</span>
              <span className="painel-meta">SQL, MongoDB</span>
              <i className="bi bi-chevron-down" aria-hidden="true" />
            </button>
            <div className="painel-body">
              <ul className="skill-list">
                <li className="skill-row">
                  <span className="skill-icon"><i className="bi bi-database" /></span>
                  <span className="skill-name">SQL</span>
                  <span className="level-badge level-strong" aria-label="Nível: Forte">Forte</span>
                  <ul className="skill-chips"><li>MySQL</li><li>PostgreSQL</li><li>SQLite</li></ul>
                </li>
                <li className="skill-row">
                  <span className="skill-icon"><i className="bi bi-collection" /></span>
                  <span className="skill-name">MongoDB</span>
                  <span className="level-badge level-good" aria-label="Nível: Bom">Bom</span>
                  <ul className="skill-chips"><li>NoSQL</li><li>Aggregation</li><li>Atlas</li></ul>
                </li>
              </ul>
            </div>
          </section>

          {/* DevOps */}
          <section className="painel-categoria" data-category="devops" role="region" aria-labelledby="painel-devops-title">
            <button className="painel-header" id="painel-devops-title" aria-expanded="true">
              <span className="painel-titulo"><i className="bi bi-diagram-3" /> DevOps</span>
              <span className="painel-meta">Docker</span>
              <i className="bi bi-chevron-down" aria-hidden="true" />
            </button>
            <div className="painel-body">
              <ul className="skill-list">
                <li className="skill-row">
                  <span className="skill-icon"><i className="bi bi-box" /></span>
                  <span className="skill-name">Docker</span>
                  <span className="level-badge level-good" aria-label="Nível: Bom">Bom</span>
                  <ul className="skill-chips"><li>Docker Compose</li><li>Images</li><li>Volumes</li></ul>
                </li>
              </ul>
            </div>
          </section>

          {/* Ferramentas */}
          <section className="painel-categoria" data-category="tools" role="region" aria-labelledby="painel-tools-title">
            <button className="painel-header" id="painel-tools-title" aria-expanded="true">
              <span className="painel-titulo"><i className="bi bi-tools" /> Ferramentas</span>
              <span className="painel-meta">Git & GitHub</span>
              <i className="bi bi-chevron-down" aria-hidden="true" />
            </button>
            <div className="painel-body">
              <ul className="skill-list">
                <li className="skill-row">
                  <span className="skill-icon"><i className="bi bi-git" /></span>
                  <span className="skill-name">Git & GitHub</span>
                  <span className="level-badge level-strong" aria-label="Nível: Forte">Forte</span>
                  <ul className="skill-chips"><li>Branching</li><li>Pull Request</li><li>Actions</li></ul>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
