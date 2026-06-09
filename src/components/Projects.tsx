import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  HeartPulse, 
  LayoutDashboard, 
  Globe, 
  GlassWater, 
  CalendarDays, 
  X, 
  ArrowUpRight, 
  TrendingUp, 
  Zap,
  Globe2,
  Code
} from 'lucide-react';
import { projectsData } from '../data';
import { Project } from '../types';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<'Todos' | 'React' | 'Angular' | 'JS Native'>('Todos');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter projects list
  const filteredProjects = activeFilter === 'Todos'
    ? projectsData
    : projectsData.filter((proj) => proj.category === activeFilter);

  // Map icon component dynamically
  const renderProjectIcon = (iconName: string, className = "w-12 h-12 text-[#8083ff]") => {
    switch (iconName) {
      case 'ShoppingBag':
        return <ShoppingBag className={className} />;
      case 'HeartPulse':
        return <HeartPulse className={className} />;
      case 'LayoutDashboard':
        return <LayoutDashboard className={className} />;
      case 'Globe':
        return <Globe className={className} />;
      case 'GlassWater':
        return <GlassWater className={className} />;
      case 'CalendarDays':
        return <CalendarDays className={className} />;
      default:
        return <ShoppingBag className={className} />;
    }
  };

  return (
    <section
      id="projects"
      className="py-24 px-6 md:px-12 bg-[#13131b] border-t border-white/5 relative"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block with tab filter alignments */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#8083ff] font-bold">
              Portafolio
            </span>
            <h2 id="projects-title" className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight leading-tight">
              Proyectos Seleccionados
            </h2>
            <p id="projects-subtitle" className="text-[#c7c4d7] text-sm md:text-base max-w-xl">
              Una muestra de mis trabajos más recientes y las tecnologías implementadas para resolver problemas de negocio reales.
            </p>
          </div>

          {/* Filter Navigation Tabs */}
          <div
            id="projects-tabs-row"
            className="flex items-center gap-2 p-1.5 rounded-xl bg-[#111118] border border-white/5 overflow-x-auto no-scrollbar self-start md:self-auto"
          >
            {(['Todos', 'React', 'Angular', 'JS Native'] as const).map((filter) => (
              <button
                key={filter}
                id={`filter-tab-${filter.replace(' ', '_')}`}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold tracking-wider transition-all cursor-pointer focus:outline-none whitespace-nowrap ${
                  activeFilter === filter
                    ? 'bg-[#8083ff] text-[#0d0096] shadow-md shadow-[#8083ff]/10'
                    : 'text-[#c7c4d7] hover:text-white hover:bg-white/5'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid Dynamic Animation Container */}
        <motion.div
          id="projects-gallery-grid"
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                id={`project-card-${project.id}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group glass-panel rounded-2xl flex flex-col overflow-hidden border border-white/5 bg-[#111118]/80 hover:border-white/10 shadow-lg cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Simulated Device Screen Mockup Representation */}
                <div className="h-48 w-full bg-[#1b1b26]/60 border-b border-white/5 flex items-center justify-center relative overflow-hidden group-hover:bg-[#1b1b26]/40 transition-colors">
                  <div className="absolute top-2.5 left-3.5 flex items-center gap-1.5 opacity-40">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="w-2 h-2 rounded-full bg-yellow-400" />
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  
                  {/* Glowing halo behind the central icon */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8083ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
                  
                  <div className="transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    {renderProjectIcon(project.icon, "w-14 h-14 text-[#8083ff] filter drop-shadow-[0_0_15px_rgba(128,131,255,0.2)]")}
                  </div>
                </div>

                {/* Card Info Details */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 gap-4">
                  {/* Tech Tags Block */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-white/5 text-[#c7c4d7] font-mono text-[9px] font-bold uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title & Desc */}
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display font-bold text-white text-[18px] tracking-tight group-hover:text-[#c0c1ff] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[#c7c4d7]/90 text-[13px] leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* CTA link trigger */}
                  <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between text-[#8083ff] group-hover:text-white transition-colors">
                    <span className="text-xs font-semibold tracking-wider font-display uppercase flex items-center gap-1">
                      Detalles del proyecto
                    </span>
                    <ArrowUpRight size={16} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>

              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Detailed Info Modal popup */}
        <AnimatePresence>
          {selectedProject && (
            <div
              id="project-detail-modal-overlay"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0f]/80 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                id="project-detail-modal"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl w-full bg-[#111118] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  id="modal-close-btn"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 text-[#c7c4d7] hover:text-white transition-all cursor-pointer"
                >
                  <X size={20} />
                </button>

                {/* Modal header with icon representation */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#8083ff]/10 flex items-center justify-center text-[#ffeaed]/90 border border-[#8083ff]/10">
                    {renderProjectIcon(selectedProject.icon, "w-8 h-8 text-[#8083ff]")}
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-[#8083ff]">
                      {selectedProject.category}
                    </span>
                    <h3 className="font-display font-black text-2xl text-white tracking-tight">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                {/* Subcontent block */}
                <div className="flex flex-col gap-6">
                  
                  {/* Detailed paragraph */}
                  <div className="flex flex-col gap-2">
                    <h4 className="font-display font-bold text-[14px] text-white uppercase tracking-wider">
                      Descripción General
                    </h4>
                    <p className="text-[#c7c4d7] text-sm leading-relaxed">
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  {/* Highlights statistics row (If available) */}
                  {selectedProject.metrics && (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#4edea3]/5 border border-[#4edea3]/10">
                      <TrendingUp size={18} className="text-[#4edea3] mt-0.5 shrink-0" />
                      <div className="flex flex-col gap-0.5">
                        <span className="font-display font-bold text-[#4edea3] text-xs uppercase tracking-wider">
                          Métricas Impacto
                        </span>
                        <p className="text-white text-sm font-medium">
                          {selectedProject.metrics}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Challenges Section */}
                  {selectedProject.challenges && (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#8083ff]/5 border border-[#8083ff]/10">
                      <Zap size={18} className="text-[#8083ff] mt-0.5 shrink-0" />
                      <div className="flex flex-col gap-0.5">
                        <span className="font-display font-bold text-[#8083ff] text-xs uppercase tracking-wider">
                          El Reto Técnico
                        </span>
                        <p className="text-white text-sm leading-relaxed">
                          {selectedProject.challenges}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Tech stack listing chips */}
                  <div className="flex flex-col gap-2.5">
                    <h4 className="font-display font-bold text-[14px] text-white uppercase tracking-wider">
                      Tecnologías Implementadas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techs.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-md bg-white/5 border border-white/5 text-xs text-white font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons footer */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/5">
                    {selectedProject.demoUrl && (
                      <a
                        id="modal-btn-demo"
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#8083ff] to-[#c0c1ff] text-[#1000a9] font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-[1.02]"
                      >
                        <Globe2 size={14} />
                        Ver Demo Online
                      </a>
                    )}
                    {selectedProject.repoUrl && (
                      <a
                        id="modal-btn-code"
                        href={selectedProject.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 rounded-lg border border-[#393841] hover:border-white text-white hover:bg-white/5 font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-[1.02]"
                      >
                        <Code size={14} />
                        Ver Código Fuente
                      </a>
                    )}
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
