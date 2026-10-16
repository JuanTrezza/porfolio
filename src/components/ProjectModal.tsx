import React, { useEffect } from 'react';
import { Project } from '../data/portfolioData';
import { ProjectPreview } from './ProjectPreview';
import { useLenisLock } from '../hooks/useLenisLock';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useLenisLock(project !== null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#faf9f5] border border-[#1b1c1a] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-[#c4c7c7] px-6 py-4 bg-[#f5f4ef]">
          <div className="flex items-center gap-2">
            <span className="font-mono-code text-xs text-[#712ae2] font-bold">
              [{project.year}]
            </span>
            <span className="font-mono-code text-xs text-[#444748] uppercase">
              {project.type}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-[#1b1c1a] hover:text-[#712ae2] transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div data-lenis-prevent className="p-6 md:p-8 overflow-y-auto flex flex-col gap-6">
          {/* Project Image Preview */}
          <div className="overflow-hidden border border-[#c4c7c7] aspect-[16/9] bg-[#efeeea]">
            <ProjectPreview
              project={project}
              alt={project.title}
              imgClassName="w-full h-full object-cover object-top"
              placeholder={
                <div className="w-full h-full flex items-center justify-center p-8 text-center">
                  <span className="font-syne text-2xl font-bold uppercase text-[#1b1c1a]">
                    {project.title}
                  </span>
                </div>
              }
            />
          </div>

          <div>
            <span className="font-mono-code text-[11px] text-[#712ae2] uppercase font-semibold">
              DETALLES DEL PROYECTO
            </span>
            <h3 className="font-syne text-2xl md:text-3xl font-extrabold uppercase text-[#1b1c1a] mt-1">
              {project.title}
            </h3>
            <p className="font-inter text-sm md:text-base leading-relaxed text-[#444748] mt-3">
              {project.description}
            </p>
          </div>

          {/* Technical Specs */}
          <div className="border-t border-[#c4c7c7] pt-4">
            <span className="font-mono-code text-xs uppercase text-[#444748] block mb-2 font-semibold">
              STACK TECNOLÓGICO EMPLEADO
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 border border-[#c4c7c7] bg-[#f5f4ef] font-mono-code text-xs text-[#1b1c1a]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="border-t border-[#c4c7c7] pt-6 flex flex-wrap items-center gap-4">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#1b1c1a] text-white font-mono-code text-xs uppercase tracking-wider hover:bg-[#712ae2] transition-colors inline-flex items-center gap-2"
              >
                <span>ABRIR SITIO WEB</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </a>
            )}

            {project.codeLink && (
              <a
                href={project.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-[#1b1c1a] font-mono-code text-xs uppercase tracking-wider text-[#1b1c1a] hover:bg-[#1b1c1a] hover:text-white transition-colors inline-flex items-center gap-1"
              >
                <span>VER REPOSITORIO</span>
                <span className="material-symbols-outlined text-[16px]">code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
