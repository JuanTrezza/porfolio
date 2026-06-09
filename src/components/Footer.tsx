import { Linkedin, Github, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="main-footer"
      className="py-12 bg-[#0d0d15] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">

        {/* Left Side: Brand Credits */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-display font-extrabold text-[#c0c1ff] text-xs">
            JMT
          </div>
          <p id="footer-copyright" className="text-xs text-[#c7c4d7]/60 font-mono">
            © {currentYear} JMT. Buenos Aires, Argentina.
          </p>
        </div>

        {/* Right Side: Social links indicators */}
        <div id="footer-social-links" className="flex items-center gap-6">
          <a
            id="social-link-linkedin"
            href="https://www.linkedin.com/in/juanmorenotrezza"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[#c7c4d7] hover:text-[#c0c1ff] font-medium transition-colors"
          >
            <Linkedin size={14} />
            <span>LinkedIn</span>
          </a>
          <a
            id="social-link-github"
            href="https://github.com/JuanTrezza"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[#c7c4d7] hover:text-[#c0c1ff] font-medium transition-colors"
          >
            <Github size={14} />
            <span>GitHub</span>
          </a>
          <a
            id="social-link-email"
            href="mailto:jgmorenotrezza@gmail.com"
            className="flex items-center gap-1.5 text-xs text-[#c7c4d7] hover:text-[#c0c1ff] tracking-wide font-medium transition-colors"
          >
            <Mail size={14} />
            <span>Email</span>
          </a>
        </div>

      </div>
    </footer>
  );
}
