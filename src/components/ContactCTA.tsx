import React, { useEffect, useRef, useState } from 'react';
import { PORTFOLIO_INFO } from '../data/portfolioData';
import { useTitleReveal } from '../hooks/useTitleReveal';

const MAILTO = `mailto:${PORTFOLIO_INFO.email}`;

export const ContactCTA: React.FC = () => {
  const titleRef = useTitleReveal<HTMLHeadingElement>();
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const handleCopyEmail = async () => {
    try {
      // Sin Clipboard API (contexto no seguro, navegador viejo) o sin permiso: se abre el mail
      if (!navigator.clipboard) throw new Error('Clipboard API no disponible');
      await navigator.clipboard.writeText(PORTFOLIO_INFO.email);
    } catch {
      window.location.href = MAILTO;
      return;
    }
    setCopyStatus('copied');
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopyStatus('idle'), 2000);
  };

  return (
    <section id="contacto" className="w-full px-5 md:px-8 lg:px-12 py-16 md:py-24 bg-[#faf9f5] relative">
      <div className="max-w-5xl">
        <span className="font-mono-code text-xs text-[#712ae2] font-semibold uppercase tracking-wider block mb-3">
          06 // INICIAR CONVERSACIÓN
        </span>

        <h2 ref={titleRef} className="font-syne text-[min(38px,calc((100vw-40px)/12.8))] leading-[min(44px,calc((100vw-40px)/12.8*1.158))] sm:text-[min(56px,calc((100vw-40px)/12.8))] sm:leading-[min(60px,calc((100vw-40px)/12.8*1.071))] md:text-[min(72px,calc((100vw-64px)/12.8))] md:leading-[min(76px,calc((100vw-64px)/12.8*1.056))] lg:text-[min(84px,calc((100vw-96px)/12.8))] lg:leading-[min(90px,calc((100vw-96px)/12.8*1.071))] font-extrabold uppercase tracking-tight text-[#1b1c1a] mb-8">
          ¿Trabajamos{' '}
          <em className="font-playfair text-[min(44px,calc((100vw-40px)/12.8*1.158))] sm:text-[min(66px,calc((100vw-40px)/12.8*1.179))] md:text-[min(84px,calc((100vw-64px)/12.8*1.167))] lg:text-[min(98px,calc((100vw-96px)/12.8*1.167))] lowercase font-normal text-[#712ae2] not-italic">
            juntos
          </em>
          ?
        </h2>

        {/* Interactive Email Action Box */}
        <div className="p-5 md:p-8 border border-[#c4c7c7] bg-[#f5f4ef] mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="font-mono-code text-[11px] text-[#444748] uppercase block mb-1">
              CANAL DIRECTO
            </span>
            <a
              href={MAILTO}
              className="font-syne text-xl sm:text-2xl md:text-3xl font-bold text-[#1b1c1a] hover:text-[#712ae2] transition-colors break-all"
            >
              {PORTFOLIO_INFO.email}
            </a>
          </div>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="px-5 py-3 bg-[#1b1c1a] text-white font-mono-code text-xs uppercase hover:bg-[#712ae2] transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
            id="copy-btn"
          >
            <span>{copyStatus === 'copied' ? '¡COPIADO!' : 'COPIAR EMAIL'}</span>
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              {copyStatus === 'copied' ? 'check' : 'content_copy'}
            </span>
          </button>
          {/* Aviso para lectores de pantalla: la región existe desde el inicio para que el cambio se anuncie */}
          <span className="sr-only" aria-live="polite">
            {copyStatus === 'copied' ? '¡Copiado! Email copiado al portapapeles' : ''}
          </span>
        </div>

        {/* Action Buttons Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <a
            href={PORTFOLIO_INFO.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-[#712ae2] text-white font-mono-code text-xs uppercase font-semibold hover:bg-[#8a4cfc] transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span>VER / DESCARGAR CV</span>
            <span className="material-symbols-outlined text-[16px]">download</span>
          </a>

          <a
            href={PORTFOLIO_INFO.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 border border-[#c4c7c7] font-mono-code text-xs uppercase text-[#1b1c1a] hover:border-[#1b1c1a] hover:bg-[#efeeea] transition-colors inline-flex items-center gap-1"
          >
            GitHub ↗
          </a>

          <a
            href={PORTFOLIO_INFO.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 border border-[#c4c7c7] font-mono-code text-xs uppercase text-[#1b1c1a] hover:border-[#1b1c1a] hover:bg-[#efeeea] transition-colors inline-flex items-center gap-1"
          >
            LinkedIn ↗
          </a>

          <a
            href={PORTFOLIO_INFO.links.behance}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 border border-[#c4c7c7] font-mono-code text-xs uppercase text-[#1b1c1a] hover:border-[#1b1c1a] hover:bg-[#efeeea] transition-colors inline-flex items-center gap-1"
          >
            Behance ↗
          </a>
        </div>

        {/* SLA & Local Time Note */}
        <div className="border-t border-[#c4c7c7] pt-4 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono-code text-[#444748] uppercase gap-2">
          <span>Horario de respuesta habitual: menos de 24 horas</span>
          <span>Zona horaria ART (UTC-3) · Buenos Aires, Argentina</span>
        </div>
      </div>
    </section>
  );
};
