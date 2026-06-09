import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: 'Propuesta de proyecto',
    mensaje: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const freshErrors: { [key: string]: string } = {};
    if (!formData.nombre.trim()) freshErrors.nombre = 'El nombre es obligatorio.';
    if (!formData.email.trim()) {
      freshErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      freshErrors.email = 'Formato de correo electrónico no válido.';
    }
    if (!formData.mensaje.trim()) freshErrors.mensaje = 'El mensaje no puede estar vacío.';
    
    setErrors(freshErrors);
    return Object.keys(freshErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear specific error as user types
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate server side email proxy submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form variables
      setFormData({
        nombre: '',
        email: '',
        asunto: 'Propuesta de proyecto',
        mensaje: ''
      });
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-12 bg-[#0a0a0f] border-t border-white/5 relative overflow-hidden"
    >
      {/* Background decoration neon glowing glow */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#8083ff]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT COLUMN: Copy contact information details (5 Columns wide) */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-8">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#8083ff] font-bold">
                Contacto
              </span>
              <h2 id="contact-title" className="font-display font-extrabold text-3xl md:text-[40px] text-white tracking-tight leading-[1.2]">
                Hablemos de tu próximo proyecto.
              </h2>
              <p id="contact-subtitle" className="text-[#c7c4d7] text-sm sm:text-base leading-relaxed mt-2">
                ¿Tienes una idea en mente o quieres charlar sobre oportunidades de colaboración? Mi bandeja de entrada siempre está abierta. Te responderé a la brevedad.
              </p>
            </div>

            {/* Direct contact info badges */}
            <div id="contact-info-list" className="flex flex-col gap-4">
              
              {/* Box 1: Mail */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#111118]/80 border border-white/5 shadow-sm group hover:border-[#8083ff]/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-[#8083ff]/15 text-[#8083ff] flex items-center justify-center shrink-0 border border-[#8083ff]/10">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-[#c7c4d7]/70 font-bold uppercase tracking-wider">
                    Escríbeme a
                  </span>
                  <a
                    href="mailto:juan.moreno.trezza@gmail.com"
                    className="text-white hover:text-[#c0c1ff] text-xs sm:text-sm font-semibold tracking-wide transition-colors"
                  >
                    juan.moreno.trezza@gmail.com
                  </a>
                </div>
              </div>

              {/* Box 2: Location */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#111118]/80 border border-white/5 shadow-sm group hover:border-[#8083ff]/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-[#4edea3]/15 text-[#4edea3] flex items-center justify-center shrink-0 border border-[#4edea3]/10">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-[#c7c4d7]/70 font-bold uppercase tracking-wider">
                    Ubicación
                  </span>
                  <span className="text-white text-xs sm:text-sm font-semibold tracking-wide">
                    Buenos Aires, Argentina
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Interactive messaging form details (7 Columns wide) */}
          <div className="lg:col-span-7">
            <div id="contact-form-container" className="glass-panel rounded-2xl p-6 sm:p-10 border border-white/5 bg-[#111118]/80 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 sm:gap-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      
                      {/* Name input */}
                      <div className="flex flex-col gap-2">
                        <label className="font-display font-semibold text-xs text-white uppercase tracking-wider">
                          Nombre
                        </label>
                        <input
                          id="form-input-nombre"
                          type="text"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          placeholder="Tu nombre"
                          className={`px-4 py-3 rounded-lg bg-[#0d0d15] border ${
                            errors.nombre ? 'border-red-400' : 'border-white/10'
                          } focus:border-[#8083ff] focus:ring-1 focus:ring-[#8083ff] outline-none text-white text-sm transition-all`}
                        />
                        {errors.nombre && (
                          <span className="text-red-400 text-xs font-mono font-medium">{errors.nombre}</span>
                        )}
                      </div>

                      {/* Email input */}
                      <div className="flex flex-col gap-2">
                        <label className="font-display font-semibold text-xs text-white uppercase tracking-wider">
                          Email
                        </label>
                        <input
                          id="form-input-email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="tu@email.com"
                          className={`px-4 py-3 rounded-lg bg-[#0d0d15] border ${
                            errors.email ? 'border-red-400' : 'border-white/10'
                          } focus:border-[#8083ff] focus:ring-1 focus:ring-[#8083ff] outline-none text-white text-sm transition-all`}
                        />
                        {errors.email && (
                          <span className="text-red-400 text-xs font-mono font-medium">{errors.email}</span>
                        )}
                      </div>

                    </div>

                    {/* Subject Selector details */}
                    <div className="flex flex-col gap-2">
                      <label className="font-display font-semibold text-xs text-white uppercase tracking-wider">
                        Asunto
                      </label>
                      <select
                        id="form-input-asunto"
                        name="asunto"
                        value={formData.asunto}
                        onChange={handleChange}
                        className="px-4 py-3 rounded-lg bg-[#0d0d15] border border-white/10 focus:border-[#8083ff] focus:ring-1 focus:ring-[#8083ff] outline-none text-[#c7c4d7] text-sm transition-all appearance-none cursor-pointer"
                      >
                        <option value="Propuesta de proyecto">Propuesta de proyecto</option>
                        <option value="Oportunidad laboral">Oportunidad laboral</option>
                        <option value="Consulta general">Consulta general</option>
                        <option value="Solo pasar a saludar">Solo pasar a saludar</option>
                      </select>
                    </div>

                    {/* Message field textarea */}
                    <div className="flex flex-col gap-2">
                      <label className="font-display font-semibold text-xs text-white uppercase tracking-wider">
                        Mensaje
                      </label>
                      <textarea
                        id="form-input-mensaje"
                        name="mensaje"
                        rows={5}
                        value={formData.mensaje}
                        onChange={handleChange}
                        placeholder="Hola Juan, me gustaría hablar sobre..."
                        className={`px-4 py-3 rounded-lg bg-[#0d0d15] border ${
                          errors.mensaje ? 'border-red-400' : 'border-white/10'
                        } focus:border-[#8083ff] focus:ring-1 focus:ring-[#8083ff] outline-none text-white text-sm transition-all resize-none`}
                      />
                      {errors.mensaje && (
                        <span className="text-red-400 text-xs font-mono font-medium">{errors.mensaje}</span>
                      )}
                    </div>

                    {/* Submit action button */}
                    <button
                      id="contact-form-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-2 py-3.5 rounded-lg bg-gradient-to-r from-[#8083ff] to-[#c0c1ff] hover:from-[#c0c1ff] hover:to-[#8083ff] text-[#1000a9] font-bold text-sm tracking-wide uppercase transition-all duration-300 shadow-md shadow-[#8083ff]/10 disabled:opacity-55 active:scale-[0.98] cursor-pointer cursor-allowed mt-3"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Enviando mensaje...</span>
                        </>
                      ) : (
                        <>
                          <span>Enviar mensaje</span>
                          <Send size={16} />
                        </>
                      )}
                    </button>

                  </motion.form>
                ) : (
                  <motion.div
                    key="contact-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-12 gap-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#4edea3]/10 text-[#4edea3] flex items-center justify-center shadow-lg border border-[#4edea3]/20">
                      <CheckCircle2 size={36} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-display font-black text-white text-xl sm:text-2xl tracking-tight">
                        ¡Mensaje enviado con éxito!
                      </h3>
                      <p className="text-[#c7c4d7] text-sm max-w-sm">
                        Muchas gracias por escribirme, Juan recibirá tu propuesta y te responderá al correo indicado muy pronto.
                      </p>
                    </div>
                    <button
                      id="contact-success-reset-btn"
                      onClick={() => setIsSubmitted(false)}
                      className="mt-4 px-6 py-2 rounded-lg border border-white/10 hover:border-white hover:bg-white/5 text-white font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer"
                    >
                      Enviar otro correo
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
