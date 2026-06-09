import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, FolderGit2, GraduationCap, Sparkles, ArrowRight, ArrowDownToLine } from 'lucide-react';

interface HeroProps {
  onNavClick: (sectionId: string) => void;
}

export default function Hero({ onNavClick }: HeroProps) {
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [subCharIndex, setSubCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    'Frontend Developer',
    'Interface Designer',
    'Diseñador UI/UX',
    'Data Enthusiast',
  ];

  // Dynamic typing loop mimicking a terminal/typing indicator
  useEffect(() => {
    const currentWord = roles[roleIndex];
    let typingSpeed = isDeleting ? 30 : 85;

    // Handle end of word typing
    if (!isDeleting && subCharIndex === currentWord.length) {
      typingSpeed = 1500; // Pause at the end of word
      setIsDeleting(true);
    } else if (isDeleting && subCharIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      typingSpeed = 200; // brief delay before typing next word
    }

    const timeout = setTimeout(() => {
      setTypedText(
        isDeleting
          ? currentWord.substring(0, subCharIndex - 1)
          : currentWord.substring(0, subCharIndex + 1)
      );
      setSubCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [roleIndex, subCharIndex, isDeleting]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-16 px-6 md:px-12 overflow-hidden bg-hero-radial"
    >
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#8083ff]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-[#4edea3]/5 blur-[120px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="max-w-5xl w-full text-center z-10 flex flex-col items-center gap-8">
        
        {/* Availability Badge */}
        <motion.div
          id="availability-badge"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#16161f] border border-[#4edea3]/30 shadow-md shadow-[#4edea3]/5 cursor-default"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3] pulse-glow" />
          <span className="text-[#4edea3] text-[11px] font-mono tracking-wider font-semibold uppercase">
            Disponible para trabajar
          </span>
        </motion.div>

        {/* Big Catchy Title */}
        <motion.h1
          id="hero-main-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-extrabold text-[44px] md:text-[68px] leading-[1.1] text-white tracking-tight max-w-4xl"
        >
          Hola, soy Juan
          <span className="block mt-2 font-semibold text-gradient">
            Desarrollo interfaces que importan.
          </span>
        </motion.h1>

        {/* Cursor/Type Specialist line */}
        <motion.div
          id="hero-typing-specialist"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-8 flex items-center justify-center font-mono text-[#c7c4d7] text-sm md:text-base tracking-wide gap-1.5"
        >
          <span>Especialista</span>
          <span className="text-[#8083ff] font-bold">|</span>
          <span className="font-semibold text-white bg-white/5 px-2.5 py-0.5 rounded border border-white/5">
            {typedText}
          </span>
          <span className="w-1.5 h-4.5 bg-[#8083ff] animate-pulse inline-block" />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          id="hero-action-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mt-4"
        >
          <button
            id="hero-btn-portfolio"
            onClick={() => onNavClick('projects')}
            className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-gradient-to-r from-[#8083ff] to-[#c0c1ff] hover:from-[#c0c1ff] hover:to-[#8083ff] text-[#1000a9] font-semibold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-[#8083ff]/15 hover:scale-[1.03] w-full sm:w-auto cursor-pointer"
          >
            Ver mis proyectos
            <ArrowRight size={16} />
          </button>
          <a
            id="hero-btn-cv"
            href="/porfolio/CV_Juan_Moreno_Trezza.pdf"
            download="CV_Juan_Moreno_Trezza.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border border-[#393841] hover:border-white text-white hover:bg-white/5 font-semibold text-sm tracking-wide transition-all duration-300 w-full sm:w-auto cursor-pointer"
          >
            Descargar CV
            <ArrowDownToLine size={16} />
          </a>
        </motion.div>

        {/* Stats Blocks (with staggered entrance) */}
        <motion.div
          id="hero-statistics-grid"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl mt-12 pt-12 border-t border-white/5"
        >
          {[
            { id: 'stat-exp', icon: <Briefcase size={16} />, value: '+2', label: 'Años Exp.' },
            { id: 'stat-proj', icon: <FolderGit2 size={16} />, value: '+15', label: 'Proyectos' },
            { id: 'stat-edu', icon: <GraduationCap size={16} />, value: 'ITLM/ISTEA', label: 'Formación' },
            { id: 'stat-ui', icon: <Sparkles size={16} />, value: 'UX/UI', label: 'Especialidad' },
          ].map((stat) => (
            <div
              key={stat.id}
              id={stat.id}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#111118]/80 border border-white/5 shadow-md hover:border-white/10 transition-colors"
            >
              <div className="text-[#8083ff] mb-1.5 bg-[#8083ff]/5 p-2 rounded-lg">
                {stat.icon}
              </div>
              <span className="font-display font-black text-white text-xl tracking-tight">
                {stat.value}
              </span>
              <span className="font-sans text-[#c7c4d7] text-xs font-semibold tracking-wider uppercase mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Simple Animated scroll dynamic downward arrow */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase tracking-widest font-mono text-[#c7c4d7] mb-1.5">scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-[#393841] flex justify-center p-1">
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-2 bg-[#8083ff] rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
