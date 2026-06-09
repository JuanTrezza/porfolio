import { motion } from 'motion/react';
import { Layout, Server, Palette, Terminal } from 'lucide-react';
import { skillsData } from '../data';

export default function TechStack() {
  // Group skills by category
  const frontendSkills = skillsData.filter((s) => s.category === 'frontend');
  const backendSkills = skillsData.filter((s) => s.category === 'backend');
  const designSkills = skillsData.filter((s) => s.category === 'design');
  const dataSkills = skillsData.filter((s) => s.category === 'data');

  // Infinite sliding logos list
  const logoItems = [
    'React', 'Angular', 'Node.js', 'Express', 'Firebase', 'TypeScript', 
    'JavaScript', 'Python', 'Pandas', 'Figma', 'Tailwind CSS', 'Sass', 
    'MongoDB', 'REST APIs', 'SQL'
  ];

  const doubledLogos = [...logoItems, ...logoItems, ...logoItems];

  return (
    <section
      id="skills"
      className="py-24 px-6 md:px-12 bg-[#0a0a0f] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#8083ff]/3 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3 mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#8083ff] font-bold">
            Competencias
          </span>
          <h2 id="skills-title" className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight leading-tight">
            Stack Tecnológico
          </h2>
          <p id="skills-subtitle" className="text-[#c7c4d7] text-sm md:text-base">
            Herramientas y lenguajes que utilizo para dar vida a los productos digitales.
          </p>
        </div>

        {/* 4 Cards Bento Grid Layout */}
        <div id="skills-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Frontend */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel rounded-2xl p-6 flex flex-col gap-5 border border-white/5 bg-[#111118]/80 relative group hover:border-[#8083ff]/30 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8083ff]/10 text-[#8083ff] flex items-center justify-center">
                <Layout size={18} />
              </div>
              <h3 className="font-display font-bold text-white text-base">
                Frontend
              </h3>
            </div>
            
            <ul className="flex flex-col gap-4">
              {frontendSkills.map((skill) => (
                <li key={skill.name} className="flex flex-col gap-0.5 group/item">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8083ff]" />
                    <span className="font-display font-semibold text-white text-xs sm:text-sm group-hover/item:text-[#c0c1ff] transition-colors">
                      {skill.name}
                    </span>
                  </div>
                  {skill.description && (
                    <span className="text-[#c7c4d7] pl-3.5 text-[11px] leading-relaxed">
                      {skill.description}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Card 2: Backend */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel rounded-2xl p-6 flex flex-col gap-5 border border-white/5 bg-[#111118]/80 relative group hover:border-[#8083ff]/30 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#c0c1ff]/10 text-[#c0c1ff] flex items-center justify-center">
                <Server size={18} />
              </div>
              <h3 className="font-display font-bold text-white text-base">
                Backend & DB
              </h3>
            </div>

            <ul className="flex flex-col gap-4">
              {backendSkills.map((skill) => (
                <li key={skill.name} className="flex flex-col gap-0.5 group/item">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c0c1ff]" />
                    <span className="font-display font-semibold text-white text-xs sm:text-sm group-hover/item:text-[#d0bcff] transition-colors">
                      {skill.name}
                    </span>
                  </div>
                  {skill.description && (
                    <span className="text-[#c7c4d7] pl-3.5 text-[11px] leading-relaxed">
                      {skill.description}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Card 3: Design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel rounded-2xl p-6 flex flex-col gap-5 border border-white/5 bg-[#111118]/80 relative group hover:border-[#4edea3]/30 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#4edea3]/10 text-[#4edea3] flex items-center justify-center">
                <Palette size={18} />
              </div>
              <h3 className="font-display font-bold text-white text-base">
                Diseño & UX
              </h3>
            </div>

            <ul className="flex flex-col gap-4">
              {designSkills.map((skill) => (
                <li key={skill.name} className="flex flex-col gap-0.5 group/item">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]" />
                    <span className="font-display font-semibold text-white text-xs sm:text-sm group-hover/item:text-[#4edea3] transition-colors">
                      {skill.name}
                    </span>
                  </div>
                  {skill.description && (
                    <span className="text-[#c7c4d7] pl-3.5 text-[11px] leading-relaxed">
                      {skill.description}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Card 4: Data Science & AI */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-panel rounded-2xl p-6 flex flex-col gap-5 border border-white/5 bg-[#111118]/80 relative group hover:border-[#8083ff]/30 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#e4e1ed]/10 text-[#e4e1ed] flex items-center justify-center">
                <Terminal size={18} />
              </div>
              <h3 className="font-display font-bold text-white text-base">
                Datos & IA
              </h3>
            </div>

            <ul className="flex flex-col gap-4">
              {dataSkills.map((skill) => (
                <li key={skill.name} className="flex flex-col gap-0.5 group/item">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e4e1ed]" />
                    <span className="font-display font-semibold text-white text-xs sm:text-sm group-hover/item:text-[#8083ff] transition-colors">
                      {skill.name}
                    </span>
                  </div>
                  {skill.description && (
                    <span className="text-[#c7c4d7] pl-3.5 text-[11px] leading-relaxed">
                      {skill.description}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* Marquee sliding ribbon at the bottom of tech section */}
        <div id="tech-marquee-container" className="relative mt-20 pt-8 border-t border-white/5 overflow-hidden w-full">
          {/* Fade gradients over the edges */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
          
          <div className="flex w-max gap-8 animate-[marquee_50s_linear_infinite] whitespace-nowrap py-1">
            {doubledLogos.map((tech, index) => (
              <div
                key={`${tech}-${index}`}
                className="px-6 py-2 rounded-xl bg-[#13121a]/80 border border-white/5 font-mono text-xs text-[#c7c4d7]/70 hover:text-white hover:border-[#8083ff]/30 transition-all cursor-default"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Embedded inline keyframes styling to support custom marquee if not predefined */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33333333333%); }
        }
      `}</style>
    </section>
  );
}
