export default function Portifolio() {
  return (
    <section className="portifolio" id="portifolio">
      <div className="interface">
        <h2 className="titulo">MEU <span>PORTIFÓLIO.</span></h2>

        <div className="filtros-projetos" role="tablist" aria-label="Filtros de projetos">
          <button className="filtro ativo" role="tab" aria-selected="true" data-filter="all">Todos</button>
          <button className="filtro" role="tab" aria-selected="false" data-filter="front">Front-end</button>
          <button className="filtro" role="tab" aria-selected="false" data-filter="back">Back-end</button>
          <button className="filtro" role="tab" aria-selected="false" data-filter="full">Full Stack</button>
        </div>

        <div className="grid-projetos" role="list">
          {/* Projeto 1 */}
          <article className="card-projeto" role="listitem" data-type="back">
            <figure className="card-media">
              <img src="/api-petshop.png" alt="API Petshop" loading="lazy" decoding="async" />
            </figure>
            <div className="card-content">
              <h3 className="card-title">API Petshop</h3>
              <p className="card-desc">API REST para gestão de petshop com autenticação e CRUD completo.</p>
              <div className="card-tags"><span className="chip">Node.js</span><span className="chip">Express</span><span className="chip">MongoDB</span></div>
              <div className="card-actions">
                <a href="https://github.com/pedroavv1914" target="_blank" className="btn-secondary"><i className="bi bi-github" /> Código</a>
              </div>
            </div>
          </article>

          {/* Projeto 2 */}
          <article className="card-projeto" role="listitem" data-type="back">
            <figure className="card-media">
              <img src="/api-shopsphere.png" alt="API ShopSphere" loading="lazy" decoding="async" />
            </figure>
            <div className="card-content">
              <h3 className="card-title">API ShopSphere</h3>
              <p className="card-desc">API de e-commerce com carrinho, pedidos e pagamentos.</p>
              <div className="card-tags"><span className="chip">Node.js</span><span className="chip">Prisma</span><span className="chip">PostgreSQL</span></div>
              <div className="card-actions">
                <a href="https://github.com/pedroavv1914" target="_blank" className="btn-secondary"><i className="bi bi-github" /> Código</a>
              </div>
            </div>
          </article>

          {/* Projeto 3 */}
          <article className="card-projeto" role="listitem" data-type="back">
            <figure className="card-media">
              <img src="/api-stratix.png" alt="API Stratix" loading="lazy" decoding="async" />
            </figure>
            <div className="card-content">
              <h3 className="card-title">API Stratix</h3>
              <p className="card-desc">Serviços de catálogo com autenticação JWT e documentação Swagger.</p>
              <div className="card-tags"><span className="chip">Node.js</span><span className="chip">Express</span><span className="chip">JWT</span></div>
              <div className="card-actions">
                <a href="https://github.com/pedroavv1914" target="_blank" className="btn-secondary"><i className="bi bi-github" /> Código</a>
              </div>
            </div>
          </article>

          {/* Projeto 4 */}
          <article className="card-projeto" role="listitem" data-type="front">
            <figure className="card-media">
              <img src="/githubfinder.png" alt="GitHub Finder" loading="lazy" decoding="async" />
            </figure>
            <div className="card-content">
              <h3 className="card-title">GitHub Finder</h3>
              <p className="card-desc">Busca perfis do GitHub com UI moderna e responsiva.</p>
              <div className="card-tags"><span className="chip">React</span><span className="chip">TypeScript</span></div>
              <div className="card-actions">
                <a href="https://github.com/pedroavv1914" target="_blank" className="btn-secondary"><i className="bi bi-github" /> Código</a>
              </div>
            </div>
          </article>

          {/* Projeto 5 */}
          <article className="card-projeto" role="listitem" data-type="front">
            <figure className="card-media">
              <img src="/palazzotravel.png" alt="Palazzo Travel" loading="lazy" decoding="async" />
            </figure>
            <div className="card-content">
              <h3 className="card-title">Palazzo Travel</h3>
              <p className="card-desc">Landing page de viagens com efeitos e animações sutis.</p>
              <div className="card-tags"><span className="chip">HTML</span><span className="chip">CSS</span><span className="chip">JS</span></div>
              <div className="card-actions">
                <a href="https://github.com/pedroavv1914" target="_blank" className="btn-secondary"><i className="bi bi-github" /> Código</a>
              </div>
            </div>
          </article>

          {/* Projeto 6 */}
          <article className="card-projeto" role="listitem" data-type="front">
            <figure className="card-media">
              <img src="/projetoloja.png" alt="Projeto Loja" loading="lazy" decoding="async" />
            </figure>
            <div className="card-content">
              <h3 className="card-title">Projeto Loja</h3>
              <p className="card-desc">Protótipo de loja virtual com páginas de produto e carrinho.</p>
              <div className="card-tags"><span className="chip">HTML</span><span className="chip">CSS</span><span className="chip">JS</span></div>
              <div className="card-actions">
                <a href="https://github.com/pedroavv1914" target="_blank" className="btn-secondary"><i className="bi bi-github" /> Código</a>
              </div>
            </div>
          </article>

          {/* Projeto 7 */}
          <article className="card-projeto" role="listitem" data-type="back">
            <figure className="card-media">
              <img src="/cadastrodeusuarios.png" alt="Cadastro de Usuários" loading="lazy" decoding="async" />
            </figure>
            <div className="card-content">
              <h3 className="card-title">Cadastro de Usuários</h3>
              <p className="card-desc">CRUD de usuários com validação e persistência.</p>
              <div className="card-tags"><span className="chip">Node.js</span><span className="chip">Express</span><span className="chip">SQLite</span></div>
              <div className="card-actions">
                <a href="https://github.com/pedroavv1914" target="_blank" className="btn-secondary"><i className="bi bi-github" /> Código</a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
