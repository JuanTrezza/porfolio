import React, { useState, useEffect } from 'react';
import { PORTFOLIO_INFO } from '../data/portfolioData';
import { useLenisLock } from '../hooks/useLenisLock';
import { handleAnchorClick } from '../lib/scroll';

export const Navbar: React.FC = () => {
  const [buenosAiresTime, setBuenosAiresTime] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  useLenisLock(mobileMenuOpen);

  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat('es-AR', {
          timeZone: 'America/Argentina/Buenos_Aires',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        setBuenosAiresTime(formatter.format(new Date()));
      } catch {
        setBuenosAiresTime('20:09');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#faf9f5]/90 backdrop-blur-md border-b border-[#c4c7c7]">
      <div className="h-16 w-full px-5 md:px-8 lg:px-12 flex items-center justify-between gap-6">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="#"
            onClick={handleAnchorClick}
            className="font-syne text-[min(18px,calc((100vw-140px)/13.8))] leading-7 md:text-xl font-bold tracking-tight text-[#1b1c1a] uppercase hover:opacity-75 transition-opacity"
          >
            {PORTFOLIO_INFO.name}
          </a>
          <span className="hidden md:inline-block font-mono-code text-[11px] px-1.5 py-0.5 border border-[#c4c7c7] text-[#444748] uppercase tracking-wider">
            {PORTFOLIO_INFO.shortRole}
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <a
            href="#trabajos"
            onClick={handleAnchorClick}
            className="font-mono-code text-xs uppercase tracking-wider text-[#1b1c1a] font-semibold hover:text-[#712ae2] transition-colors"
          >
            TRABAJOS
          </a>
          <a
            href="#archivo"
            onClick={handleAnchorClick}
            className="font-mono-code text-xs uppercase tracking-wider text-[#444748] hover:text-[#1b1c1a] transition-colors"
          >
            ARCHIVO
          </a>
          <a
            href="#sobre-mi"
            onClick={handleAnchorClick}
            className="font-mono-code text-xs uppercase tracking-wider text-[#444748] hover:text-[#1b1c1a] transition-colors"
          >
            SOBRE MÍ
          </a>
          <a
            href="#stack"
            onClick={handleAnchorClick}
            className="font-mono-code text-xs uppercase tracking-wider text-[#444748] hover:text-[#1b1c1a] transition-colors"
          >
            STACK
          </a>
          <a
            href="#contacto"
            onClick={handleAnchorClick}
            className="font-mono-code text-xs uppercase tracking-wider text-[#444748] hover:text-[#1b1c1a] transition-colors"
          >
            CONTACTO
          </a>
        </nav>

        {/* Right Status & Indicator */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Status Badge */}
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-full border border-[#c4c7c7] bg-[#f5f4ef]">
            <span className="w-2 h-2 rounded-full bg-[#712ae2] animate-pulse"></span>
            <span className="font-mono-code text-[10px] md:text-[11px] text-[#1b1c1a] uppercase tracking-wider font-medium">
              {PORTFOLIO_INFO.status}
            </span>
          </div>

          {/* Live BA Time */}
          <div className="hidden 2xl:flex items-center px-2.5 py-1 border border-[#c4c7c7] font-mono-code text-[10px] text-[#444748] uppercase tracking-wider">
            BUENOS AIRES {buenosAiresTime || '20:09'} (UTC-3)
          </div>

          {/* User Monogram Avatar */}
          <a
            href="#sobre-mi"
            onClick={handleAnchorClick}
            aria-label="Perfil Sobre Mí"
            className="w-8 h-8 rounded-full bg-[#1b1c1a] text-white flex items-center justify-center font-mono-code text-xs font-semibold hover:bg-[#712ae2] transition-colors"
          >
            {PORTFOLIO_INFO.initials}
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#1b1c1a] hover:text-[#712ae2]"
            aria-label="Abrir menú"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#c4c7c7] bg-[#faf9f5] px-6 py-4 flex flex-col gap-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#c4c7c7]">
            <span className="w-2 h-2 rounded-full bg-[#712ae2] animate-pulse"></span>
            <span className="font-mono-code text-xs text-[#1b1c1a] uppercase tracking-wider">
              {PORTFOLIO_INFO.status}
            </span>
          </div>
          <a
            href="#trabajos"
            onClick={(e) => handleAnchorClick(e, () => setMobileMenuOpen(false))}
            className="font-mono-code text-xs uppercase tracking-wider text-[#1b1c1a] font-semibold py-1"
          >
            01 // TRABAJOS DESTACADOS
          </a>
          <a
            href="#archivo"
            onClick={(e) => handleAnchorClick(e, () => setMobileMenuOpen(false))}
            className="font-mono-code text-xs uppercase tracking-wider text-[#444748] py-1"
          >
            02 // ARCHIVO DE PROYECTOS
          </a>
          <a
            href="#sobre-mi"
            onClick={(e) => handleAnchorClick(e, () => setMobileMenuOpen(false))}
            className="font-mono-code text-xs uppercase tracking-wider text-[#444748] py-1"
          >
            03 // SOBRE MÍ
          </a>
          <a
            href="#stack"
            onClick={(e) => handleAnchorClick(e, () => setMobileMenuOpen(false))}
            className="font-mono-code text-xs uppercase tracking-wider text-[#444748] py-1"
          >
            04 // STACK TECNOLÓGICO
          </a>
          <a
            href="#contacto"
            onClick={(e) => handleAnchorClick(e, () => setMobileMenuOpen(false))}
            className="font-mono-code text-xs uppercase tracking-wider text-[#444748] py-1"
          >
            05 // CONTACTO
          </a>
        </div>
      )}
    </header>
  );
};
