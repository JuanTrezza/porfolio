import React from 'react';
import { STACK_CATEGORIES } from '../data/portfolioData';
import { useTitleReveal } from '../hooks/useTitleReveal';
import { useStaggerReveal } from '../hooks/useStaggerReveal';

export const TechStack: React.FC = () => {
  const titleRef = useTitleReveal<HTMLHeadingElement>();
  // Contenido de cada columna, no la columna: su fondo tapa el gris de las líneas de la grilla
  const gridRef = useStaggerReveal<HTMLDivElement>({ selector: ':scope > * > *', distance: 24 });
  return (
    <section
      id="stack"
      className="w-full px-5 md:px-8 lg:px-12 py-16 md:py-20 border-b border-[#c4c7c7] bg-[#faf9f5]"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-[#c4c7c7] pb-3 gap-2">
        <div>
          <span className="font-mono-code text-[11px] text-[#712ae2] uppercase font-semibold">
            04 // TOOLKIT & CAPACIDADES
          </span>
          <h2 ref={titleRef} className="font-syne text-2xl md:text-3xl lg:text-4xl uppercase text-[#1b1c1a] tracking-tight font-bold">
            STACK TECNOLÓGICO
          </h2>
        </div>
        <span className="font-mono-code text-xs text-[#444748] uppercase">
          ECOSISTEMA DE DESARROLLO
        </span>
      </div>

      {/* 4 Swiss Grid Columns */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#c4c7c7] border border-[#c4c7c7]">
        {STACK_CATEGORIES.map((category) => (
          <div
            key={category.index}
            className="bg-[#faf9f5] p-5 md:p-6 flex flex-col justify-between hover:bg-[#f5f4ef] transition-colors"
          >
            <div>
              {/* Column Header */}
              <div className="flex items-center justify-between border-b border-[#c4c7c7] pb-2 mb-4">
                <span className="font-syne text-[15px] uppercase font-bold text-[#1b1c1a]">
                  {category.title}
                </span>
                <span className="font-mono-code text-xs text-[#712ae2] font-semibold">
                  [{category.index}]
                </span>
              </div>

              {/* Skills List */}
              <ul className="flex flex-col gap-1 font-mono-code text-xs text-[#1b1c1a]">
                {category.skills.map((skill, sIdx) => (
                  <li
                    key={skill}
                    className={`flex items-center justify-between py-1.5 ${
                      sIdx !== category.skills.length - 1 ? 'border-b border-[#c4c7c7]/40' : ''
                    }`}
                  >
                    <span>{skill}</span>
                    <span className="text-[#712ae2] text-[10px]">●</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subtitle Footer */}
            <div className="mt-6 pt-2 border-t border-[#c4c7c7] text-[10px] font-mono-code text-[#444748] uppercase tracking-wider">
              {category.subtitle}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
