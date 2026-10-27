import React from 'react';
import { PROJECTS_ARCHIVE } from '../data/portfolioData';
import { useTitleReveal } from '../hooks/useTitleReveal';
import { useStaggerReveal } from '../hooks/useStaggerReveal';
import { useImageParallax } from '../hooks/useImageParallax';
import { ProjectPreview } from './ProjectPreview';

export const DesignProjects: React.FC = () => {
  const titleRef = useTitleReveal<HTMLHeadingElement>();
  // Igual que en destacados: se anima el contenido de cada card, no la card (su fondo forma la grilla)
  const gridRef = useStaggerReveal<HTMLDivElement>({ selector: ':scope > article > *', distance: 40 });
  const sectionRef = useImageParallax<HTMLElement>();
  const design = PROJECTS_ARCHIVE.filter((p) => p.category === 'diseño');

  return (
    <section
      ref={sectionRef}
      id="diseno"
      className="w-full px-5 md:px-8 lg:px-12 py-16 md:py-20 border-b border-[#c4c7c7] bg-[#faf9f5]"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-[#c4c7c7] pb-3 gap-2">
        <div>
          <span className="font-mono-code text-[11px] text-[#712ae2] uppercase font-semibold">
            02 // UX/UI & BRANDING
          </span>
          <h2 ref={titleRef} className="font-syne text-2xl md:text-3xl lg:text-4xl uppercase text-[#1b1c1a] tracking-tight font-bold">
            DISEÑO UI
          </h2>
        </div>
        <span className="font-mono-code text-xs text-[#444748] uppercase">
          {design.length} CASOS DE DISEÑO EN FIGMA
        </span>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#c4c7c7] border border-[#c4c7c7]">
        {design.map((project, index) => {
          // La imagen y el título llevan al caso completo: Behance si existe, si no Figma
          const caseLink = project.behanceLink ?? project.figmaLink;
          return (
            <article
              key={project.id}
              className="bg-[#faf9f5] p-5 md:p-8 flex flex-col justify-between group hover:bg-[#f5f4ef] transition-colors duration-200"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-start justify-between border-b border-[#c4c7c7] pb-2 mb-4">
                  <span className="font-mono-code text-xs text-[#712ae2] font-bold">
                    [0{index + 1}]
                  </span>
                  <span className="font-mono-code text-xs text-[#444748] uppercase">
                    {project.year} · {project.type}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="font-syne text-xl md:text-2xl uppercase tracking-tight text-[#1b1c1a] group-hover:text-[#712ae2] transition-colors font-bold">
                  <a href={caseLink} target="_blank" rel="noopener noreferrer">
                    {project.title}
                  </a>
                </h3>
                <p className="font-inter text-sm md:text-[15px] leading-relaxed text-[#444748] mt-2">
                  {project.description}
                </p>
              </div>

              {/* Media Preview Frame */}
              <a
                href={caseLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver ${project.title}`}
                className="block my-5 overflow-hidden border border-[#c4c7c7] relative aspect-[16/9] bg-[#efeeea]"
              >
                <div data-parallax className="absolute inset-0">
                  <ProjectPreview
                    project={project}
                    alt={`${project.title} — ${project.type}`}
                    imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    placeholder={
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#efeeea]">
                        <span className="font-syne text-2xl font-bold uppercase text-[#1b1c1a] tracking-tight">
                          {project.title}
                        </span>
                        <span className="font-mono-code text-xs text-[#712ae2] mt-1">
                          {project.type}
                        </span>
                      </div>
                    }
                  />
                </div>

                {/* Technical Specification Badge */}
                <div className="absolute bottom-3 left-3 bg-[#1b1c1a]/90 text-white font-mono-code text-[10px] md:text-[11px] px-2.5 py-1 uppercase tracking-wider backdrop-blur-sm">
                  {project.spec}
                </div>
              </a>

              <div>
                {/* Herramientas */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 border border-[#c4c7c7] font-mono-code text-[10px] md:text-[11px] uppercase text-[#1b1c1a] bg-[#faf9f5]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center justify-between gap-4 pt-2.5 border-t border-[#c4c7c7] font-mono-code text-xs uppercase">
                  {project.behanceLink && (
                    <a
                      href={project.behanceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-[#1b1c1a] hover:text-[#712ae2] transition-colors"
                    >
                      <span>VER EN BEHANCE</span>
                      <span>↗</span>
                    </a>
                  )}
                  {/* Sin Behance, Figma pasa a ser el link principal */}
                  {project.figmaLink && (
                    <a
                      href={project.figmaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        project.behanceLink
                          ? 'text-[#444748] hover:text-[#1b1c1a] transition-colors'
                          : 'inline-flex items-center gap-1 font-semibold text-[#1b1c1a] hover:text-[#712ae2] transition-colors'
                      }
                    >
                      VER EN FIGMA ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
