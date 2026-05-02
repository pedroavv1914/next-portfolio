export default function Sobre() {
  return (
    <section className="section-shell" id="sobre">
      <div className="interface">
        <div className="about-grid reveal">
          <aside className="portrait-card reveal-child">
            <div className="portrait-frame">
              {/* PEDRO: o gradiente sobre a foto integra o retrato ao fundo dark sem alterar o arquivo original. */}
              <img src="/foto-prof.jpeg" alt="Pedro Ribeiro" loading="lazy" decoding="async" />
            </div>
            <div className="about-stats" aria-label="Números profissionais">
              <div>
                <strong>3+</strong>
                <span>anos</span>
              </div>
              <div>
                <strong>12+</strong>
                <span>projetos</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>dedicação</span>
              </div>
            </div>
          </aside>

          <div className="about-copy reveal-child">
            <p className="section-kicker">{"// sobre mim"}</p>
            <h2 className="section-title">Muito prazer, sou Pedro Ribeiro</h2>
            <p>
              Desenvolvedor <strong>Full Stack</strong> focado em experiências de alto impacto. Transformo ideias em
              produtos com <strong>código limpo</strong>, <strong>performance</strong> e atenção obsessiva aos detalhes.
            </p>
            <p>
              Gosto de construir interfaces rápidas, APIs bem estruturadas e fluxos que parecem simples porque a
              complexidade ficou bem resolvida por trás.
            </p>

            <ul className="difference-list">
              <li>Entrega rápida sem abrir mão da qualidade</li>
              <li>Arquitetura segura, performática e escalável</li>
              <li>Micro-interações e UX validadas para surpreender</li>
            </ul>

            <a href="#formulario" className="text-link">Vamos conversar &rarr;</a>
          </div>
        </div>
      </div>
    </section>
  );
}
