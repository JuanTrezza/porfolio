import { motion } from 'motion/react';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';
import { experienceData } from '../data';

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-24 px-6 md:px-12 bg-[#13131b] border-t border-white/5 relative"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section title & layout headers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#8083ff] font-bold">
              Historial
            </span>
            <h2 id="experience-title" className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight leading-tight">
              Experiencia Laboral
            </h2>
            <p id="experience-subtitle" className="text-[#c7c4d7] text-sm md:text-base">
              Trayectoria profesional y colaboraciones en proyectos del ecosistema digital.
            </p>
          </div>

          {/* LEFT Timeline block representation (8 Columns wide) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {experienceData.map((exp, index) => (
              <motion.div
                key={exp.id}
                id={`experience-timeline-card-${exp.id}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden bg-[#111118]/80 border border-white/5 hover:border-white/10 transition-colors group"
              >
                {/* Horizontal highlighting reflection line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8083ff]/20 to-transparent" />
                
                {/* Header detail */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#8083ff]/10 text-[#8083ff] flex items-center justify-center shrink-0 border border-[#8083ff]/10">
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-white text-[18px] tracking-tight">
                        {exp.company}
                      </h3>
                      <p className="text-[#c0c1ff] font-mono text-xs font-semibold">
                        {exp.role}
                      </p>
                    </div>
                  </div>

                  {/* Period badge flag */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16161f] border border-white/5 text-[11px] font-mono font-semibold text-[#c7c4d7]">
                    <Calendar size={12} className="text-[#8083ff]" />
                    {exp.period}
                  </span>
                </div>

                {/* Narrative description */}
                <div className="flex flex-col gap-5">
                  <p className="text-[#c7c4d7] text-sm sm:text-base leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Highlights Bullet section if populated */}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="flex flex-col gap-2.5">
                      <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">
                        Logros Clave
                      </h4>
                      <ul className="flex flex-col gap-2">
                        {exp.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#e4e1ed]/90 leading-relaxed">
                            <ChevronRight size={14} className="text-[#4edea3] mt-0.5 shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
