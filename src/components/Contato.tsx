"use client";

import React, { useState } from 'react';

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    if (!formData.assunto) newErrors.assunto = 'Por favor, selecione um assunto';
    if (!formData.mensagem.trim()) newErrors.mensagem = 'Mensagem é obrigatória';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: ''
      });
      // Reset success status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="formulario">

      <div className="contact-container">
        {/* Header Section */}
        <div className="v2-flag" aria-hidden="true">
          <span className="flag-green" />
          <span className="flag-white" />
        </div>
        
        <div className="contact-header">
          <div className="contact-badge">
            <span className="contact-badge-icon">💬</span>
            <span>Vamos Conversar</span>
          </div>
          <h2 className="contact-title">
            Transforme Sua <span className="contact-highlight">Ideia</span> em Realidade
          </h2>
          <p className="contact-subtitle">
            Pronto para criar algo incrível juntos? Entre em contato e vamos discutir seu próximo projeto.
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Info Cards */}
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="contact-card-content">
                <h3>Email</h3>
                <p>pedroribeiro1136@gmail.com</p>
                <span className="contact-card-label">Resposta em até 24h</span>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="contact-card-content">
                <h3>Telefone</h3>
                <p>+55 (11) 97424 - 4619</p>
                <span className="contact-card-label">WhatsApp disponível</span>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="contact-card-content">
                <h3>Localização</h3>
                <p>São Paulo, Brasil</p>
                <span className="contact-card-label">Atendimento remoto</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container">
            <div className="contact-form-header">
              <h3>Envie sua mensagem</h3>
              <p>Preencha o formulário abaixo e entrarei em contato o mais breve possível.</p>
            </div>

            <form className="contact-form" noValidate onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nome">Nome completo</label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    value={formData.nome}
                    onChange={handleChange}
                    className={errors.nome ? 'error' : ''}
                    placeholder="Seu nome completo"
                    required
                    aria-required="true"
                  />
                  {errors.nome && <span className="form-error" role="alert" aria-live="polite">{errors.nome}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="seu@email.com"
                    required
                    aria-required="true"
                  />
                  {errors.email && <span className="form-error" role="alert" aria-live="polite">{errors.email}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="telefone">Telefone</label>
                  <input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="assunto">Assunto</label>
                  <select 
                    id="assunto" 
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    className={errors.assunto ? 'error' : ''}
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="projeto">Novo Projeto</option>
                    <option value="consultoria">Consultoria</option>
                    <option value="manutencao">Manutenção</option>
                    <option value="outros">Outros</option>
                  </select>
                  {errors.assunto && <span className="form-error" role="alert" aria-live="polite">{errors.assunto}</span>}
                </div>
              </div>

              <div className="form-group form-group-full">
                <label htmlFor="mensagem">Mensagem</label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  className={errors.mensagem ? 'error' : ''}
                  placeholder="Conte-me sobre seu projeto ou como posso ajudá-lo..."
                  rows={6}
                  required
                  aria-required="true"
                ></textarea>
                {errors.mensagem && <span className="form-error" role="alert" aria-live="polite">{errors.mensagem}</span>}
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className={`contact-submit-btn ${isSubmitting ? 'loading' : ''} ${submitStatus === 'success' ? 'success' : ''}`}
                  disabled={isSubmitting || submitStatus === 'success'}
                >
                  <span className="btn-content">
                    {isSubmitting ? (
                      <span>Enviando...</span>
                    ) : submitStatus === 'success' ? (
                      <span>Mensagem Enviada!</span>
                    ) : (
                      <>
                        <svg className="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Enviar Mensagem</span>
                      </>
                    )}
                  </span>
                  <div className="btn-glow"></div>
                </button>
              </div>

              {submitStatus === 'error' && (
                <div style={{ color: '#ef4444', marginTop: '1rem', textAlign: 'center' }}>
                  Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
