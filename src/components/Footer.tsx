import React from 'react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#f5f4ef] border-t border-[#c4c7c7]">
      <div className="w-full px-5 md:px-8 lg:px-12 pt-14 md:pt-20 pb-10">
        {/* Giant Monogram / Wordmark */}
        <div className="w-full border-b border-[#c4c7c7] pb-8 md:pb-12 mb-8 md:mb-12">
          <h1 className="font-syne text-[80px] sm:text-[110px] md:text-[140px] lg:text-[180px] font-extrabold uppercase tracking-tighter text-[#1b1c1a] select-none leading-none overflow-hidden text-center lg:text-left">
            {PORTFOLIO_INFO.initials}
          </h1>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Col 1 */}
          <div className="flex flex-col gap-1.5">
            <span className="font-mono-code text-xs uppercase text-[#444748] font-semibold">
              LOCALIZACIÓN
            </span>
            <p className="font-mono-code text-[11px] text-[#1b1c1a]">
              {PORTFOLIO_INFO.locationShort}
            </p>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-1.5">
            <span className="font-mono-code text-xs uppercase text-[#444748] font-semibold">
              REDES & CONTACTO
            </span>
            <div className="flex flex-wrap gap-4 font-mono-code text-xs uppercase">
              <a
                href={PORTFOLIO_INFO.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1b1c1a] hover:text-[#712ae2] transition-colors"
              >
                GitHub ↗
              </a>
              <a
                href={PORTFOLIO_INFO.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1b1c1a] hover:text-[#712ae2] transition-colors"
              >
                LinkedIn ↗
              </a>
              <a
                href={PORTFOLIO_INFO.links.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1b1c1a] hover:text-[#712ae2] transition-colors"
              >
                Behance ↗
              </a>
              <a
                href={`mailto:${PORTFOLIO_INFO.email}`}
                className="text-[#1b1c1a] hover:text-[#712ae2] transition-colors"
              >
                Email ↗
              </a>
            </div>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col md:items-end justify-between gap-1.5">
            <span className="font-mono-code text-xs uppercase text-[#444748] font-semibold">
              ESTADO DEL SISTEMA
            </span>
            <p className="font-mono-code text-[11px] text-[#444748]">
              © 2026 JUAN MORENO TREZZA. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
