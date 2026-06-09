import { motion } from 'motion/react';
import { PenTool, Laptop, GraduationCap, Calendar, MapPin } from 'lucide-react';
import { educationData } from '../data';

export default function AboutMe() {
  return (
    <section
      id="about"
      className="py-24 px-6 md:px-12 bg-[#13131b] border-t border-white/5 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Profile Card (4 Columns wide in large screen) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 xl:col-span-4"
          >
            <div id="profile-card" className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col gap-6 relative overflow-hidden group">
              {/* Subtle top reflection */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8083ff]/40 to-transparent" />
              
              {/* JMT Logo / Avatar Container */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c0c1ff] to-[#8083ff] flex items-center justify-center font-display font-extrabold text-[#1000a9] text-2xl shadow-lg shadow-[#8083ff]/15">
                  JMT
                </div>
                <div>
                  <h3 id="profile-name" className="font-display font-bold text-white text-lg tracking-tight">
                    Juan Moreno Trezza
                  </h3>
                  <p id="profile-title" className="text-[#c0c1ff] font-mono text-xs font-semibold">
                    Frontend Developer Jr.
                  </p>
                </div>
              </div>

              {/* Badges/Skill tags */}
              <div id="profile-chips" className="flex flex-wrap gap-1.5 pt-2">
                {['React', 'Angular', 'Typescript', 'Tailwind'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[#e4e1ed] font-mono text-[10px] uppercase font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Education section inside the profile card */}
              <div id="profile-education" className="flex flex-col gap-4 pt-4 border-t border-white/5">
                <h4 className="text-xs uppercase tracking-wider font-mono text-[#c7c4d7] font-semibold flex items-center gap-1.5">
                  <GraduationCap size={14} className="text-[#8083ff]" />
                  Educación / Formación
                </h4>
                
                <div className="flex flex-col gap-4">
                  {educationData.map((edu) => (
                    <div key={edu.id} className="relative pl-4 border-l border-white/10 flex flex-col gap-0.5">
                      {/* Node point */}
                      <span className="absolute -left-1 top-2 w-2 h-2 rounded-full bg-[#8083ff]" />
                      
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display font-bold text-white text-xs sm:text-sm">
                          {edu.institution}
                        </span>
                        <span className="font-mono text-[10px] text-[#c0c1ff] font-semibold flex items-center gap-1">
                          <Calendar size={10} />
                          {edu.period}
                        </span>
                      </div>
                      
                      <span className="text-[#c7c4d7] text-xs font-medium">
                        {edu.degree}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meta details */}
              <div className="pt-4 border-t border-white/5 flex items-center gap-3 text-xs text-[#c7c4d7]">
                <div className="flex items-center gap-1">
                  <MapPin size={12} className="text-[#8083ff]" />
                  <span>Buenos Aires, Argentina</span>
                </div>
                <span className="text-white/10">|</span>
                <span>23 años</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Copy + Dual Cards (8 Columns wide in large screen) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8 lg:pt-4"
          >
            {/* Catchy headline */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#8083ff] font-bold">
                Sobre Mí
              </span>
              <h2 id="about-headline" className="font-display font-extrabold text-3xl md:text-4xl text-white tracking-tight leading-tight">
                Apasionado por la fusión entre diseño y código.
              </h2>
            </div>

            {/* Description Text */}
            <p id="about-description" className="text-[#c7c4d7] text-base md:text-lg leading-relaxed font-sans max-w-3xl">
              Desarrollador de 23 años radicado en Buenos Aires, enfocado en construir experiencias digitales fluidas y estéticamente impecables. Mi paso por <span className="text-white font-semibold">Leopoldo Marechal</span> me permite abordar proyectos con una visión integral, mientras que mi base en diseño UI/UX garantiza que cada elemento interactivo tenga un propósito visual. Actualmente me encuentro cursando la <span className="text-white font-semibold">Tecnicatura Superior en Ciencia de Datos e Inteligencia Artificial en ISTEA</span>.
            </p>

            {/* Dual Core Pillars Cards */}
            <div id="about-pillars" className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
              
              {/* Pile 1: UX/UI */}
              <div className="glass-panel rounded-xl p-6 flex flex-col gap-3 relative overflow-hidden group hover:border-[#8083ff]/30 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-[#4edea3]/5 text-[#4edea3] flex items-center justify-center border border-[#4edea3]/10">
                  <PenTool size={18} />
                </div>
                <h3 className="font-display font-bold text-white text-base">
                  Diseño UI/UX
                </h3>
                <p className="text-[#c7c4d7] text-sm leading-relaxed">
                  Prototipado en Figma y creación de sistemas de diseño escalables, optimizando la consistencia visual y la interacción.
                </p>
              </div>

              {/* Pile 2: Frontend */}
              <div className="glass-panel rounded-xl p-6 flex flex-col gap-3 relative overflow-hidden group hover:border-[#8083ff]/30 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-[#8083ff]/5 text-[#8083ff] flex items-center justify-center border border-[#8083ff]/10">
                  <Laptop size={18} />
                </div>
                <h3 className="font-display font-bold text-white text-base">
                  Frontend Dev
                </h3>
                <p className="text-[#c7c4d7] text-sm leading-relaxed">
                  Implementación técnica limpia con las mejores prácticas del mercado, logrando código modular, rápido y accesible.
                </p>
              </div>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
