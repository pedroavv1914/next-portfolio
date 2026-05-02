const specialties = [
  {
    title: "Frontend",
    icon: "bi-window-sidebar",
    tags: ["React", "Next.js", "TypeScript", "Tailwind", "CSS", "Styled Components"],
    depth: 90,
  },
  {
    title: "Backend",
    icon: "bi-hdd-network",
    tags: ["Node.js", "Express", "TypeScript", "Prisma", "PostgreSQL", "MongoDB"],
    depth: 70,
  },
  {
    title: "DevOps & Cloud",
    icon: "bi-cloud-check",
    tags: ["Docker", "AWS", "Vercel", "CI/CD", "Git", "Nginx"],
    depth: 50,
  },
];

const tools = ["Git / GitHub", "VS Code", "Figma", "Docker", "Postman", "Jest"];

export default function Especialidades() {
  return (
    <section className="section-shell skills-section" id="especialidades">
      <div className="interface">
        <div className="reveal">
          <p className="section-kicker">{"// skills"}</p>
          <h2 className="section-title">Especialidades com profundidade</h2>
          <p className="section-lead">
            Menos lista infinita de tecnologias, mais clareza sobre onde consigo gerar impacto real.
          </p>

          <div className="specialty-grid">
            {specialties.map((specialty) => (
              <article className="specialty-card reveal-child" key={specialty.title}>
                <i className={`bi ${specialty.icon} specialty-icon`} aria-hidden="true" />
                <h3>{specialty.title}</h3>
                <div className="skill-tags">
                  {specialty.tags.map((tag) => (
                    <span className="skill-tag" key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="depth" aria-label={`${specialty.depth}% de profundidade em ${specialty.title}`}>
                  <div className="depth-bar">
                    <span className="depth-fill" style={{ width: `${specialty.depth}%` }} />
                  </div>
                  <span>{specialty.depth}% profundidade</span>
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
