import React, { useState } from 'react';
import { Project, PROJECTS_ARCHIVE } from '../data/portfolioData';
import { useTitleReveal } from '../hooks/useTitleReveal';

interface ProjectsArchiveProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsArchive: React.FC<ProjectsArchiveProps> = ({ onSelectProject }) => {
  const titleRef = useTitleReveal<HTMLHeadingElement>();
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'saas' | 'motion' | 'data'>('all');

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS_ARCHIVE
    : PROJECTS_ARCHIVE.filter((p) => p.category === activeFilter);

  // Compute minimum and maximum year dynamically from projects
  const years = PROJECTS_ARCHIVE.map((p) => p.year);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  return (
    <section
      id="archivo"
      className="w-full px-5 md:px-8 lg:px-12 py-16 md:py-20 border-b border-[#c4c7c7] bg-[#f5f4ef]"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 gap-3">
        <div className="flex items-baseline gap-3 flex-wrap">
          <h2 ref={titleRef} className="font-syne text-2xl md:text-3xl lg:text-4xl uppercase text-[#1b1c1a] tracking-tight font-bold">
            ARCHIVO DE PROYECTOS
          </h2>
          <span className="font-mono-code text-xs text-[#712ae2] font-semibold">
            [{minYear} — {maxYear}]
          </span>
        </div>

        {/* Real Count of Projects */}
        <span className="font-mono-code text-xs text-[#444748] px-3 py-1.5 border border-[#c4c7c7] bg-[#faf9f5] self-start md:self-auto font-medium">
          ({PROJECTS_ARCHIVE.length} PROYECTOS REGISTRADOS)
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveFilter('all')}
          className={`font-mono-code text-xs uppercase px-3 py-1.5 border transition-colors shrink-0 ${
            activeFilter === 'all'
              ? 'bg-[#1b1c1a] text-white border-[#1b1c1a]'
              : 'bg-[#faf9f5] text-[#444748] border-[#c4c7c7] hover:border-[#1b1c1a]'
          }`}
        >
          TODOS ({PROJECTS_ARCHIVE.length})
        </button>
        <button
          onClick={() => setActiveFilter('web')}
          className={`font-mono-code text-xs uppercase px-3 py-1.5 border transition-colors shrink-0 ${
            activeFilter === 'web'
              ? 'bg-[#1b1c1a] text-white border-[#1b1c1a]'
              : 'bg-[#faf9f5] text-[#444748] border-[#c4c7c7] hover:border-[#1b1c1a]'
          }`}
        >
          WEB & LANDINGS ({PROJECTS_ARCHIVE.filter((p) => p.category === 'web').length})
        </button>
        <button
          onClick={() => setActiveFilter('saas')}
          className={`font-mono-code text-xs uppercase px-3 py-1.5 border transition-colors shrink-0 ${
            activeFilter === 'saas'
              ? 'bg-[#1b1c1a] text-white border-[#1b1c1a]'
              : 'bg-[#faf9f5] text-[#444748] border-[#c4c7c7] hover:border-[#1b1c1a]'
          }`}
        >
          SAAS & APPS ({PROJECTS_ARCHIVE.filter((p) => p.category === 'saas').length})
        </button>
        <button
          onClick={() => setActiveFilter('motion')}
          className={`font-mono-code text-xs uppercase px-3 py-1.5 border transition-colors shrink-0 ${
            activeFilter === 'motion'
              ? 'bg-[#1b1c1a] text-white border-[#1b1c1a]'
              : 'bg-[#faf9f5] text-[#444748] border-[#c4c7c7] hover:border-[#1b1c1a]'
          }`}
        >
          MOTION & 3D ({PROJECTS_ARCHIVE.filter((p) => p.category === 'motion').length})
        </button>
        <button
          onClick={() => setActiveFilter('data')}
          className={`font-mono-code text-xs uppercase px-3 py-1.5 border transition-colors shrink-0 ${
            activeFilter === 'data'
              ? 'bg-[#1b1c1a] text-white border-[#1b1c1a]'
              : 'bg-[#faf9f5] text-[#444748] border-[#c4c7c7] hover:border-[#1b1c1a]'
          }`}
        >
          PYTHON & DATOS ({PROJECTS_ARCHIVE.filter((p) => p.category === 'data').length})
        </button>
      </div>

      {/* Tabular Layout */}
      <div className="w-full border-t border-[#c4c7c7]">
        {/* Table Header (Desktop) */}
        <div className="hidden md:grid grid-cols-12 py-3 border-b border-[#c4c7c7] font-mono-code text-[11px] uppercase text-[#444748]">
          <div className="col-span-1">AÑO</div>
          <div className="col-span-4">PROYECTO</div>
          <div className="col-span-3">TIPO</div>
          <div className="col-span-3">STACK TECNOLÓGICO</div>
          <div className="col-span-1 text-right">ENLACE</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-[#c4c7c7]">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="grid grid-cols-1 md:grid-cols-12 py-4 items-center hover:bg-[#e9e8e4] transition-colors px-2 group cursor-pointer"
              onClick={() => onSelectProject(project)}
            >
              {/* Year */}
              <div className="col-span-1 font-mono-code text-xs text-[#444748]">
                {project.year}
              </div>

              {/* Title */}
              <div className="col-span-4 font-syne text-lg md:text-xl text-[#1b1c1a] uppercase group-hover:text-[#712ae2] group-hover:translate-x-1 transition-all font-bold">
                {project.title}
              </div>

              {/* Type */}
              <div className="col-span-3 font-inter text-sm text-[#444748] mt-1 md:mt-0">
                <span className="md:hidden font-mono-code text-[11px] text-[#444748] mr-2">TIPO:</span>
                {project.type}
              </div>

              {/* Tech Stack */}
              <div className="col-span-3 font-mono-code text-[11px] text-[#444748] mt-1 md:mt-0">
                <span className="md:hidden text-[#444748] mr-2">STACK:</span>
                {project.tags.join(' · ')}
              </div>

              {/* Action Link */}
              <div className="col-span-1 text-left md:text-right mt-2 md:mt-0 font-mono-code text-sm">
                {(project.link ?? project.codeLink) && (
                <a
                  href={project.link ?? project.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`${project.link ? 'Ver sitio' : 'Ver código'} de ${project.title}`}
                  className="inline-flex items-center gap-1 px-2 py-1 text-[#1b1c1a] hover:text-[#712ae2] font-semibold hover:bg-white border border-transparent hover:border-[#c4c7c7] transition-all"
                >
                  <span className="md:hidden text-xs">{project.link ? 'VER SITIO' : 'VER CÓDIGO'}</span>
                  <span>↗</span>
                </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
