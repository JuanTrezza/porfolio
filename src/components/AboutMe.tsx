import React from 'react';
import { PORTFOLIO_INFO, EDUCATION_LIST, EXPERIENCE_DATA } from '../data/portfolioData';

export const AboutMe: React.FC = () => {
  return (
    <section
      id="sobre-mi"
      className="w-full px-5 md:px-8 lg:px-12 py-16 md:py-20 border-b border-[#c4c7c7] bg-[#faf9f5]"
    >
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-10">
        <span className="font-mono-code text-[11px] text-[#712ae2] font-semibold uppercase">
          02 // PERFIL Y TRAYECTORIA
        </span>
        <div className="h-px bg-[#c4c7c7] flex-1"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left Column: Portrait */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="border border-[#c4c7c7] p-2 bg-[#f5f4ef] relative group">
            {/* Aspect container 3:4 */}
            <div className="overflow-hidden aspect-[3/4] bg-[#e3e2df] relative flex flex-col items-center justify-center p-8 select-none border border-[#c4c7c7]/50">
              {/* Architectural Framing Marks */}
              <div className="absolute top-3 left-3 font-mono-code text-[10px] text-[#444748] tracking-widest">
                [ +34.6037 / -58.3816 ]
              </div>
              <div className="absolute top-3 right-3 font-mono-code text-[10px] text-[#444748] tracking-widest">
                ISO 400 · 1/250s
              </div>
              <div className="absolute bottom-3 left-3 font-mono-code text-[9px] text-[#444748]">
                FRAME 24A
              </div>
              <div className="absolute bottom-3 right-3 font-mono-code text-[9px] text-[#712ae2]">
                ● JMT
              </div>

              {/* Grid Crosshair & Lines */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-full h-px bg-[#1b1c1a]"></div>
                <div className="h-full w-px bg-[#1b1c1a] absolute"></div>
              </div>

              {/* Portrait */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border border-[#1b1c1a] overflow-hidden bg-[#faf9f5] shadow-sm mb-4 group-hover:border-[#712ae2] transition-colors">
                  {/* La foto trae su propio recorte circular: el scale oculta el borde oscuro */}
                  <img
                    src={PORTFOLIO_INFO.photoUrl}
                    alt="Juan Moreno Trezza"
                    className="w-full h-full object-cover scale-[1.12]"
                  />
                </div>
                <h4 className="font-syne text-base md:text-lg font-bold uppercase tracking-wider text-[#1b1c1a]">
                  JUAN MORENO TREZZA
                </h4>
                <p className="font-mono-code text-[11px] text-[#444748] uppercase tracking-widest mt-1">
                  {PORTFOLIO_INFO.role}
                </p>
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="flex items-center justify-between pt-2 mt-1 border-t border-[#c4c7c7] text-[10px] font-mono-code uppercase text-[#444748]">
              <span>BA_STUDIO_2026.RAW</span>
              <span className="text-[#1b1c1a]">35MM DIGITAL ARCHIVE</span>
            </div>
          </div>

          <div className="p-3 border border-[#c4c7c7] bg-[#faf9f5] text-[11px] font-mono-code flex items-center justify-between">
            <span className="text-[#444748]">{PORTFOLIO_INFO.name}</span>
            <span className="text-[#712ae2] font-semibold">{PORTFOLIO_INFO.role}</span>
          </div>
        </div>

        {/* Right Column: Editorial Bio, Academics & Roles */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Manifiesto */}
          <div>
            <span className="font-mono-code text-xs uppercase text-[#444748] mb-2 block tracking-wider font-semibold">
              MANIFIESTO
            </span>
            <p className="font-syne text-xl md:text-2xl font-medium leading-relaxed text-[#1b1c1a]">
              {PORTFOLIO_INFO.manifesto}
            </p>
          </div>

          {/* Formación Académica */}
          <div className="border-t border-[#c4c7c7] pt-6">
            <span className="font-mono-code text-xs uppercase text-[#712ae2] font-semibold block mb-4 tracking-wider">
              FORMACIÓN ACADÉMICA
            </span>

            <div className="flex flex-col gap-5">
              {/* Item 1: ISTEA */}
              <div className="border-l-2 border-[#1b1c1a] pl-4 py-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <h4 className="font-syne text-base md:text-[18px] uppercase text-[#1b1c1a] font-bold">
                    {EDUCATION_LIST[0].title}
                  </h4>
                  <span className="font-mono-code text-[11px] text-[#712ae2] font-semibold shrink-0">
                    {EDUCATION_LIST[0].period} · {EDUCATION_LIST[0].status.toUpperCase()}
                  </span>
                </div>
                <p className="font-inter text-sm text-[#444748] leading-relaxed">
                  <strong className="text-[#1b1c1a] font-medium">{EDUCATION_LIST[0].institution}</strong> ·{' '}
                  {EDUCATION_LIST[0].description}
                </p>
              </div>

              {/* Item 2: Leopoldo Marechal */}
              <div className="border-l-2 border-[#c4c7c7] pl-4 py-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <h4 className="font-syne text-base md:text-[18px] uppercase text-[#1b1c1a] font-bold">
                    {EDUCATION_LIST[1].title}
                  </h4>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono-code text-[11px] text-[#444748] uppercase">
                      {EDUCATION_LIST[1].period} · {EDUCATION_LIST[1].status}
                    </span>
                    {EDUCATION_LIST[1].grade && (
                      <span className="font-mono-code text-[10px] bg-[#efeeea] px-1.5 py-0.5 border border-[#c4c7c7] text-[#1b1c1a] font-semibold">
                        {EDUCATION_LIST[1].grade}
                      </span>
                    )}
                  </div>
                </div>
                <p className="font-inter text-sm text-[#444748] leading-relaxed">
                  <strong className="text-[#1b1c1a] font-medium">{EDUCATION_LIST[1].institution}</strong> ·{' '}
                  {EDUCATION_LIST[1].description}
                </p>
              </div>
            </div>
          </div>

          {/* Experiencia */}
          <div className="border-t border-[#c4c7c7] pt-6">
            <span className="font-mono-code text-xs uppercase text-[#712ae2] font-semibold block mb-4 tracking-wider">
              EXPERIENCIA
            </span>

            <div className="p-5 bg-[#f5f4ef] border border-[#c4c7c7]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h4 className="font-syne text-lg md:text-xl uppercase font-bold text-[#1b1c1a]">
                  {EXPERIENCE_DATA.company}
                </h4>
                <div className="flex items-center gap-2">
                  <span className="font-mono-code text-[10px] text-[#712ae2] bg-white px-2 py-0.5 border border-[#c4c7c7] font-semibold uppercase">
                    {EXPERIENCE_DATA.period}
                  </span>
                  <span className="font-mono-code text-[10px] text-[#444748] uppercase">
                    {EXPERIENCE_DATA.location}
                  </span>
                </div>
              </div>

              <p className="font-mono-code text-xs text-[#1b1c1a] font-semibold mb-2">
                {EXPERIENCE_DATA.role}
              </p>

              <p className="font-inter text-sm md:text-[15px] text-[#444748] leading-relaxed">
                "{EXPERIENCE_DATA.description}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
