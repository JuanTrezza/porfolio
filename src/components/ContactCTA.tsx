import React, { useState } from 'react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

export const ContactCTA: React.FC = () => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_INFO.email);
    setCopyStatus('copied');
    setTimeout(() => {
      setCopyStatus('idle');
    }, 2500);
  };

  return (
    <section id="contacto" className="w-full px-5 md:px-8 lg:px-12 py-16 md:py-24 bg-[#faf9f5] relative">
      <div className="max-w-5xl">
        <span className="font-mono-code text-xs text-[#712ae2] font-semibold uppercase tracking-wider block mb-3">
          05 // INICIAR CONVERSACIÓN
        </span>

        <h2 className="font-syne text-[38px] leading-[44px] sm:text-[56px] sm:leading-[60px] md:text-[72px] md:leading-[76px] lg:text-[84px] lg:leading-[90px] font-extrabold uppercase tracking-tight text-[#1b1c1a] mb-8">
          ¿Trabajamos{' '}
          <em className="font-playfair text-[44px] sm:text-[66px] md:text-[84px] lg:text-[98px] lowercase font-normal text-[#712ae2] not-italic">
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
              href={`mailto:${PORTFOLIO_INFO.email}`}
              className="font-syne text-xl sm:text-2xl md:text-3xl font-bold text-[#1b1c1a] hover:text-[#712ae2] transition-colors break-all"
            >
              {PORTFOLIO_INFO.email}
            </a>
          </div>

          <button
            onClick={handleCopyEmail}
            className="px-5 py-3 bg-[#1b1c1a] text-white font-mono-code text-xs uppercase hover:bg-[#712ae2] transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
            id="copy-btn"
          >
            <span>{copyStatus === 'copied' ? '¡COPIADO!' : 'COPIAR EMAIL'}</span>
            <span className="material-symbols-outlined text-[16px]">
              {copyStatus === 'copied' ? 'check' : 'content_copy'}
            </span>
          </button>
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
