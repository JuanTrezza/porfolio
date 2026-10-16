import React from 'react';
import { CERTIFICATIONS_LIST } from '../data/portfolioData';

export const Certifications: React.FC = () => {
  return (
    <section className="w-full px-5 md:px-8 lg:px-12 py-16 md:py-20 border-b border-[#c4c7c7] bg-[#f5f4ef]">
      <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 gap-2 border-b border-[#c4c7c7] pb-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-mono-code text-[11px] text-[#712ae2] font-semibold uppercase">
            04 // VALIDACIÓN
          </span>
          <h2 className="font-syne text-2xl md:text-3xl lg:text-4xl uppercase text-[#1b1c1a] tracking-tight font-bold">
            CERTIFICACIONES
          </h2>
        </div>
        <span className="font-mono-code text-xs text-[#444748] uppercase">
          ACADEMIAS & ESPECIALIZACIONES (2026)
        </span>
      </div>

      {/* Grid of Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CERTIFICATIONS_LIST.map((cert, index) => (
          <div
            key={index}
            className="p-5 bg-[#faf9f5] border border-[#c4c7c7] flex items-center justify-between hover:border-[#712ae2] transition-colors group"
          >
            <div>
              <h4 className="font-syne text-base md:text-lg uppercase font-bold text-[#1b1c1a] group-hover:text-[#712ae2] transition-colors">
                {cert.title}
              </h4>
              <span className="font-mono-code text-xs text-[#444748] mt-1 block">
                {cert.issuer}
              </span>
            </div>
            <div className="text-right shrink-0 ml-3">
              <span className="font-mono-code text-xs font-bold text-[#712ae2] bg-[#f5f4ef] px-2 py-1 border border-[#c4c7c7]">
                {cert.year}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
