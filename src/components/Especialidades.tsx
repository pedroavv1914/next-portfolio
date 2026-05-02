const deliveries = [
  {
    title: "Interfaces que parecem leves",
    icon: "bi-window-sidebar",
    description: "Telas responsivas, rápidas e com micro-interações que deixam o produto mais claro de usar.",
    result: "Do layout ao comportamento final",
    tags: ["React", "Next.js", "TypeScript", "Tailwind", "CSS"],
  },
  {
    title: "APIs que sustentam produto",
    icon: "bi-hdd-network",
    description: "Backends com regras bem separadas, autenticação, persistência e integração com front sem improviso.",
    result: "Fluxos seguros e previsíveis",
    tags: ["Node.js", "Express", "Prisma", "PostgreSQL", "JWT"],
  },
  {
    title: "Entrega pronta para evoluir",
    icon: "bi-cloud-check",
    description: "Deploy, versionamento e estrutura para manter o projeto saudável depois da primeira entrega.",
    result: "Menos retrabalho no crescimento",
    tags: ["Docker", "Vercel", "AWS", "Git", "CI/CD"],
  },
];

const tools = ["Git / GitHub", "VS Code", "Figma", "Docker", "Postman", "Jest"];

export default function Especialidades() {
  return (
    <section className="section-shell skills-section" id="especialidades">
      <div className="interface">
        <div className="reveal">
          <p className="section-kicker">{"// skills"}</p>
          <h2 className="section-title">O que eu entrego na prática</h2>
          <p className="section-lead">
            Tecnologia é meio. O foco é criar produto rápido, organizado e confortável de manter.
          </p>

          <div className="delivery-grid">
            {deliveries.map((delivery, index) => (
              <article className="delivery-card reveal-child" key={delivery.title}>
                <div className="delivery-topline">
                  <span className="delivery-number">{String(index + 1).padStart(2, "0")}</span>
                  <i className={`bi ${delivery.icon} delivery-icon`} aria-hidden="true" />
                </div>
                <h3>{delivery.title}</h3>
                <p>{delivery.description}</p>
                <strong>{delivery.result}</strong>
                <div className="skill-tags">
                  {delivery.tags.map((tag) => (
                    <span className="skill-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="tools-row" aria-label="Ferramentas">
            {tools.map((tool) => (
              <span className="tool-pill" key={tool}>{tool}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
