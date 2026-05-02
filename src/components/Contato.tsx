"use client";

import { useState } from "react";

const helpTopics = ["MVPs", "Landing pages", "Sistemas internos", "APIs", "E-commerce"];

export default function Contato() {
  const [formData, setFormData] = useState({ nome: "", email: "", mensagem: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!formData.nome.trim()) nextErrors.nome = "Nome é obrigatório";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = "Informe um email válido";
    if (!formData.mensagem.trim()) nextErrors.mensagem = "Mensagem é obrigatória";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("success");
    setFormData({ nome: "", email: "", mensagem: "" });
    window.setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section className="section-shell contact-section" id="formulario">
      <div className="interface">
        <div className="contact-grid reveal">
          <div className="reveal-child">
            <p className="section-kicker">{"// vamos trabalhar juntos"}</p>
            <h2 className="section-title">Transforme sua ideia em realidade</h2>
            <p className="section-lead">
              Conte o que você quer construir e eu respondo com próximos passos claros, sem enrolar.
            </p>

            <p className="response-time">
              <i className="bi bi-clock" aria-hidden="true" />
              Tempo médio de resposta: menos de 24h
            </p>

            <div className="help-topics" aria-label="Como posso ajudar">
              {helpTopics.map((topic) => (
                <span key={topic}>{topic}</span>
              ))}
            </div>

            <div className="contact-list">
              <a className="contact-item" href="mailto:pedroribeiro.contato1914@gmail.com">
                <i className="bi bi-envelope" aria-hidden="true" />
                <span>pedroribeiro.contato1914@gmail.com</span>
              </a>
              <a className="contact-item" href="https://www.linkedin.com/in/pedro-ribeiro-a71300230/" target="_blank" rel="noreferrer">
                <i className="bi bi-linkedin" aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
              <div className="contact-item">
                <i className="bi bi-geo-alt" aria-hidden="true" />
                <span>Jundiaí, SP - Brasil</span>
              </div>
            </div>

            <p className="status-line">
              <span className="pulse-dot" aria-hidden="true" />
              Aberto a projetos freelance e oportunidades
            </p>
          </div>

          <form className="contact-form reveal-child" noValidate onSubmit={handleSubmit}>
            <div className="contact-form-intro">
              <strong>Me mande o contexto</strong>
              <span>Ideia, prazo, objetivo ou só o problema que você quer resolver.</span>
            </div>
            <div className="form-field">
              <label htmlFor="nome">Nome</label>
              <input id="nome" name="nome" value={formData.nome} onChange={handleChange} placeholder="Seu nome" />
              {errors.nome && <span className="form-error">{errors.nome}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="mensagem">Mensagem</label>
              <textarea id="mensagem" name="mensagem" rows={5} value={formData.mensagem} onChange={handleChange} placeholder="Me conte sobre seu projeto" />
              {errors.mensagem && <span className="form-error">{errors.mensagem}</span>}
            </div>
            <button className="btn btn-primary" type="submit">Enviar mensagem &rarr;</button>
            {status === "success" && <span className="form-status">Mensagem validada. Obrigado pelo contato!</span>}
          </form>
        </div>
      </div>
    </section>
  );
}
