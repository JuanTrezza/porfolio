import React from 'react';
import { PORTFOLIO_INFO } from '../data/portfolioData';
import { useTitleReveal } from '../hooks/useTitleReveal';
import { handleAnchorClick } from '../lib/scroll';

export const Hero: React.FC = () => {
  const titleRef = useTitleReveal<HTMLHeadingElement>({ trigger: 'load' });
  return (
    <section className="relative w-full border-b border-[#c4c7c7] px-5 md:px-8 lg:px-12 pt-12 md:pt-16 pb-8 md:pb-12 overflow-hidden bg-[#faf9f5]">
      {/* Top Metadata Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-[#c4c7c7] pb-4 mb-10 md:mb-14 gap-3 text-[11px] font-mono-code uppercase text-[#444748]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#712ae2] inline-block shrink-0"></span>
          <span>LOC: {PORTFOLIO_INFO.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#1b1c1a] font-semibold">[STATUS]</span>
          <span className="text-[#712ae2] font-semibold">{PORTFOLIO_INFO.status}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#1b1c1a] font-semibold">[ROLE]</span>
          <span className="text-[#1b1c1a]">{PORTFOLIO_INFO.role}</span>
        </div>
        <div className="flex items-center justify-start lg:justify-end gap-2">
          <span className="text-[#444748]">{PORTFOLIO_INFO.folioIndex}</span>
        </div>
      </div>

      {/* Monumental Typography */}
      <div className="max-w-6xl my-4 md:my-8">
        <h1 ref={titleRef} className="font-syne text-[min(40px,calc((100vw-40px)/11.8))] leading-[min(44px,calc((100vw-40px)/11.8*1.1))] sm:text-[min(58px,calc((100vw-40px)/11.8))] sm:leading-[min(62px,calc((100vw-40px)/11.8*1.069))] md:text-[min(72px,calc((100vw-64px)/11.8))] md:leading-[min(76px,calc((100vw-64px)/11.8*1.056))] lg:text-[min(84px,calc((100vw-96px)/11.8))] lg:leading-[min(88px,calc((100vw-96px)/11.8*1.048))] font-extrabold uppercase tracking-tight text-[#1b1c1a]">
          Diseño y desarrollo interfaces que{' '}
          <em className="font-playfair text-[min(46px,calc((100vw-40px)/11.8*1.15))] sm:text-[min(68px,calc((100vw-40px)/11.8*1.172))] md:text-[min(84px,calc((100vw-64px)/11.8*1.167))] lg:text-[min(98px,calc((100vw-96px)/11.8*1.167))] lowercase font-normal text-[#712ae2] not-italic tracking-normal inline-block transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            se sienten
          </em>
        </h1>

        <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <p className="font-inter text-base md:text-lg lg:text-[19px] leading-relaxed text-[#444748] max-w-2xl">
            {PORTFOLIO_INFO.heroSubtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="#trabajos"
              onClick={handleAnchorClick}
              className="px-5 py-3 bg-[#1b1c1a] text-white font-mono-code text-xs uppercase tracking-wider hover:bg-[#712ae2] transition-colors duration-150 inline-flex items-center gap-2 group"
            >
              <span>EXPLORAR TRABAJOS</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-y-0.5 transition-transform">
                arrow_downward
              </span>
            </a>
            <a
              href="#contacto"
              onClick={handleAnchorClick}
              className="px-5 py-3 border border-[#1b1c1a] text-[#1b1c1a] font-mono-code text-xs uppercase tracking-wider hover:bg-[#1b1c1a] hover:text-white transition-colors duration-150 inline-flex items-center gap-1"
            >
              CONTACTAR
            </a>
          </div>
        </div>
      </div>

      {/* Ticker Indicator Sub-strip */}
      <div className="mt-12 md:mt-16 pt-3 border-t border-[#c4c7c7] flex items-center justify-between text-[11px] font-mono-code text-[#444748] uppercase">
        <span className="tracking-widest hidden sm:inline-block">
          {PORTFOLIO_INFO.heroStrip}
        </span>
        <span className="tracking-widest sm:hidden">
          FRONTEND · REACT · MOTION
        </span>
        <a
          href="#trabajos"
          onClick={handleAnchorClick}
          className="flex items-center gap-2 hover:text-[#712ae2] transition-colors"
        >
          <span>SCROLL DOWN</span>
          <span className="animate-bounce material-symbols-outlined text-[14px]">
            south
          </span>
        </a>
      </div>
    </section>
  );
};
