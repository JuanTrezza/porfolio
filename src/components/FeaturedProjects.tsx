import React from 'react';
import { Project, PROJECTS_ARCHIVE } from '../data/portfolioData';
import { ProjectPreview } from './ProjectPreview';

interface FeaturedProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onSelectProject }) => {
  // Only the 6 featured projects from the real projects list
  const featured = PROJECTS_ARCHIVE.filter((p) => p.featured);
  const years = featured.map((p) => p.year);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const yearRange = minYear === maxYear ? `${maxYear}` : `${minYear} — ${maxYear}`;

  return (
    <section
      id="trabajos"
      className="w-full px-5 md:px-8 lg:px-12 py-16 md:py-20 border-b border-[#c4c7c7] bg-[#faf9f5]"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-[#c4c7c7] pb-3 gap-2">
        <div>
          <span className="font-mono-code text-[11px] text-[#712ae2] uppercase font-semibold">
            01 // SELECCIÓN CURADA
          </span>
          <h2 className="font-syne text-2xl md:text-3xl lg:text-4xl uppercase text-[#1b1c1a] tracking-tight font-bold">
            TRABAJOS DESTACADOS
          </h2>
        </div>
        <span className="font-mono-code text-xs text-[#444748] uppercase">
          {featured.length} PROYECTOS SELECCIONADOS ({yearRange})
        </span>
      </div>

      {/* 6 Projects in Swiss Editorial Grid (2 columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[#c4c7c7] border border-[#c4c7c7]">
        {featured.map((project, index) => {
          const indexStr = `[0${index + 1}]`;
          return (
            <article
              key={project.id}
              className="bg-[#faf9f5] p-5 md:p-8 flex flex-col justify-between group hover:bg-[#f5f4ef] transition-colors duration-200"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-start justify-between border-b border-[#c4c7c7] pb-2 mb-4">
                  <span className="font-mono-code text-xs text-[#712ae2] font-bold">
                    {indexStr}
                  </span>
                  <span className="font-mono-code text-xs text-[#444748] uppercase">
                    {project.year} · {project.type}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="font-syne text-xl md:text-2xl uppercase tracking-tight text-[#1b1c1a] group-hover:text-[#712ae2] transition-colors font-bold">
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>
                <p className="font-inter text-sm md:text-[15px] leading-relaxed text-[#444748] mt-2">
                  {project.description}
                </p>
              </div>

              {/* Media Preview Frame */}
              <div
                onClick={() => onSelectProject(project)}
                className="my-5 overflow-hidden border border-[#c4c7c7] relative aspect-[16/10] bg-[#efeeea] cursor-pointer"
              >
                <ProjectPreview
                  project={project}
                  alt={`${project.title} — ${project.type}`}
                  imgClassName="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
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

                {/* Technical Specification Badge */}
                <div className="absolute bottom-3 left-3 bg-[#1b1c1a]/90 text-white font-mono-code text-[10px] md:text-[11px] px-2.5 py-1 uppercase tracking-wider backdrop-blur-sm">
                  {project.spec}
                </div>
              </div>

              <div>
                {/* Tags */}
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
                <div className="flex items-center justify-between pt-2.5 border-t border-[#c4c7c7] font-mono-code text-xs uppercase">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-[#1b1c1a] hover:text-[#712ae2] transition-colors"
                    >
                      <span>VER SITIO</span>
                      <span>↗</span>
                    </a>
                  ) : (
                    <span />
                  )}

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="text-[#444748] hover:text-[#712ae2] transition-colors text-[11px]"
                    >
                      DETALLES
                    </button>
                    {project.codeLink && (
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#444748] hover:text-[#1b1c1a] transition-colors"
                      >
                        CÓDIGO ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
