import { motion } from 'motion/react';
import { Award, ShieldCheck } from 'lucide-react';
import { certificationsData } from '../data';

export default function Certifications() {
  const getLogoColors = (issuer: string) => {
    switch (issuer.toLowerCase()) {
      case 'google':
        return {
          bg: 'bg-[#4285F4]/10',
          text: 'text-[#4285F4]',
          border: 'border-[#4285F4]/20'
        };
      case 'ibm':
        return {
          bg: 'bg-[#052FAD]/10',
          text: 'text-[#052fAD]',
          border: 'border-[#052FAD]/20'
        };
      case 'red hat':
        return {
          bg: 'bg-[#CC0000]/10',
          text: 'text-[#CC0000]',
          border: 'border-[#CC0000]/20'
        };
      case 'santander':
        return {
          bg: 'bg-[#EC0000]/10',
          text: 'text-[#EC0000]',
          border: 'border-[#EC0000]/20'
        };
      case 'openjs':
        return {
          bg: 'bg-[#83CD29]/10',
          text: 'text-[#83CD29]',
          border: 'border-[#83CD29]/20'
        };
      default:
        return {
          bg: 'bg-white/5',
          text: 'text-white',
          border: 'border-white/10'
        };
    }
  };

  return (
    <section
      id="certifications"
      className="py-24 px-6 md:px-12 bg-[#0a0a0f] border-t border-white/5 relative"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3 mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#8083ff] font-bold">
            Acreditaciones
          </span>
          <h2 id="certs-title" className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight leading-tight">
            Certificaciones
          </h2>
          <p id="certs-subtitle" className="text-[#c7c4d7] text-sm md:text-base">
            Estudios complementarios y credenciales validadas que respaldan mi conocimiento formal.
          </p>
        </div>

        {/* Grid block with Certifications - 5 columns or inline grid */}
        <div id="certs-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {certificationsData.map((cert, index) => {
            const colors = getLogoColors(cert.issuer);
            return (
              <motion.div
                key={cert.id}
                id={`cert-card-${cert.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group glass-panel rounded-2xl p-6 border border-white/5 bg-[#111118]/80 hover:border-white/15 hover:bg-[#161622]/90 flex flex-col items-center text-center gap-5 relative overflow-hidden transition-all duration-300"
              >
                {/* Visual outline decoration */}
                <div className="absolute top-2.5 right-3.5 text-[#4edea3]/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ShieldCheck size={14} />
                </div>

                {/* Simulated Stamp/Logo Circle Badge */}
                <div className={`w-14 h-14 rounded-full ${colors.bg} ${colors.border} border flex items-center justify-center relative shadow-inner`}>
                  <Award className={`w-7 h-7 ${colors.text}`} />
                  {/* Subtle outer pulse dot */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#4edea3] border-2 border-[#111118] scale-0 group-hover:scale-100 transition-transform duration-300" />
                </div>

                {/* Copy blocks */}
                <div className="flex flex-col gap-1.5">
                  <span className="font-display font-black text-white text-[11px] uppercase tracking-wider">
                    {cert.issuer}
                  </span>
                  <h3 className="font-sans font-semibold text-white text-xs sm:text-[13px] leading-tight group-hover:text-[#c0c1ff] transition-colors">
                    {cert.title}
                  </h3>
                </div>

                {/* Stamp validation text footer */}
                <div className="mt-auto pt-2">
                  <span className="font-mono text-[9px] text-[#c7c4d7]/50 font-bold uppercase tracking-widest">
                    ID VERIFICADO
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
