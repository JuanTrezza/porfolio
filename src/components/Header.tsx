import { useState, useEffect } from 'react';
import { Menu, X, ArrowDownToLine } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

export default function Header({ activeSection, onNavClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Inicio' },
    { id: 'about', label: 'Sobre mí' },
    { id: 'skills', label: 'Habilidades' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'certifications', label: 'Certificaciones' },
    { id: 'contact', label: 'Contacto' },
  ];

  return (
    <header
      id="main-nav-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#13131b]/95 backdrop-blur-md border-b border-white/5 shadow-lg'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo JMT */}
        <button
          id="btn-nav-logo"
          onClick={() => onNavClick('hero')}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c0c1ff] to-[#8083ff] flex items-center justify-center font-display font-extrabold text-[#1000a9] text-[18px] tracking-tight shadow-md shadow-[#8083ff]/10">
            JMT
          </div>
          <span className="font-display font-bold text-white tracking-wide text-sm hidden sm:inline">
            Juan <span className="text-[#c0c1ff]">Moreno</span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav id="desktop-navbar" className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              onClick={() => onNavClick(item.id)}
              className={`text-sm font-medium tracking-wide transition-colors relative py-1 focus:outline-none ${
                activeSection === item.id || (item.id === 'hero' && activeSection === '')
                  ? 'text-white'
                  : 'text-[#c7c4d7] hover:text-white'
              }`}
            >
              {item.label}
              {(activeSection === item.id || (item.id === 'hero' && activeSection === '')) && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c0c1ff] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Right Action: Download CV */}
        <div className="hidden lg:block">
          <a
            id="download-cv-btn-desktop"
            href="/porfolio/CV_Juan_Moreno_Trezza.pdf"
            download="CV_Juan_Moreno_Trezza.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#8083ff] hover:bg-[#c0c1ff] text-[#0d0096] hover:text-[#1000a9] font-medium text-xs tracking-wider uppercase transition-all duration-300 shadow-md shadow-[#8083ff]/20 hover:scale-[1.03]"
          >
            <ArrowDownToLine size={14} />
            Descargar CV
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="lg:hidden absolute top-full left-0 w-full bg-[#13131b] border-b border-white/10 shadow-2xl py-6 px-8 flex flex-col gap-6"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-mobile-${item.id}`}
                onClick={() => {
                  onNavClick(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left text-base font-semibold py-2 border-b border-white/5 transition-colors ${
                  activeSection === item.id || (item.id === 'hero' && activeSection === '')
                    ? 'text-[#c0c1ff]'
                    : 'text-[#c7c4d7]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <a
            id="download-cv-btn-mobile"
            href="/porfolio/CV_Juan_Moreno_Trezza.pdf"
            download="CV_Juan_Moreno_Trezza.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg bg-[#8083ff] text-[#0d0096] font-semibold text-sm transition-all shadow-md active:scale-95"
          >
            <ArrowDownToLine size={16} />
            Descargar CV
          </a>
        </div>
      )}
    </header>
  );
}
