import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Headphones, ShieldCheck, User, Building, AtSign, FileText } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

/**
 * ContactSection Component
 *
 * Responsabilidad:
 * Formulario de contacto comercial para la Landing Page de VEXTOR.
 * Integra un formulario directo enviado a través de FormSubmit.co.
 *
 * ⚠️ INTEGRIDAD DEL FORMULARIO:
 * - Mantener POST directo a https://formsubmit.co/ivancarrascocano@gmail.com
 * - No alterar campos, action ni método.
 * - Estilo visual actualizado: inputs con 8-10px radius, bordes suaves y tipografía corporativa.
 */
const ContactSection = () => {
  return (
    <section id="contacto" className="scroll-mt-20 py-20 lg:py-28 bg-v-dark-soft/40 border-b border-v-dark-border transition-colors duration-300 relative overflow-hidden">
      {/* Background glow sutil */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#124A2F]/8 dark:bg-[#A6C98F]/8 blur-3xl rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start max-w-6xl mx-auto">

          {/* COLUMNA IZQUIERDA: INFORMACIÓN COMERCIAL */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col justify-between h-full"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#124A2F]/10 dark:bg-[#A6C98F]/10 border border-[#124A2F]/20 dark:border-[#A6C98F]/20 text-[#124A2F] dark:text-[#A6C98F] text-xs font-bold uppercase tracking-wider mb-5">
                <MessageSquare size={15} />
                Atención Personalizada
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-v-white mb-5 tracking-tight leading-[1.18]">
                ¿Quiere conocer cómo VEXTOR puede <span className="text-[#124A2F] dark:text-[#A6C98F]">ayudar a su empresa?</span>
              </h2>

              <p className="text-sm sm:text-base text-v-gray mb-8 leading-relaxed font-normal">
                Déjenos sus datos y un especialista coordinará una demostración técnica personalizada sin ningún compromiso.
              </p>

              {/* PUNTOS CLAVE DE VALOR */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#124A2F]/10 dark:bg-[#A6C98F]/10 border border-[#124A2F]/20 text-[#124A2F] dark:text-[#A6C98F] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Headphones size={16} />
                  </div>
                  <div>
                    <h4 className="text-v-white font-bold text-sm">Asesoría Especializada</h4>
                    <p className="text-v-gray text-xs leading-relaxed font-normal">Acompañamiento en la digitalización de su operación.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#124A2F]/10 dark:bg-[#A6C98F]/10 border border-[#124A2F]/20 text-[#124A2F] dark:text-[#A6C98F] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h4 className="text-v-white font-bold text-sm">Demostración en Vivo</h4>
                    <p className="text-v-gray text-xs leading-relaxed font-normal">Presentación guiada de los módulos de la plataforma.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* DATOS DE CONTACTO DIRECTO */}
            <div className="pt-6 border-t border-v-dark-border space-y-3">
              <div className="flex items-center gap-3 text-v-gray text-xs sm:text-sm font-medium">
                <Mail className="w-4 h-4 text-[#124A2F] dark:text-[#A6C98F] shrink-0" />
                <span>contacto@vextor.com</span>
              </div>
              <div className="flex items-center gap-3 text-v-gray text-xs sm:text-sm font-medium">
                <Phone className="w-4 h-4 text-[#124A2F] dark:text-[#A6C98F] shrink-0" />
                <span>+57 (601) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-v-gray text-xs sm:text-sm font-medium">
                <MapPin className="w-4 h-4 text-[#124A2F] dark:text-[#A6C98F] shrink-0" />
                <span>Bogotá, Colombia</span>
              </div>
            </div>
          </motion.div>

          {/* COLUMNA DERECHA: TARJETA CON FORMULARIO FORMSUBMIT */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="bg-v-dark border border-v-dark-border rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-v-white mb-1.5">Solicitar Demostración</h3>
                <p className="text-xs sm:text-sm text-v-gray font-normal">Complete el formulario y nos comunicaremos en menos de 24 horas.</p>
              </div>

              <form
                action="https://formsubmit.co/ivancarrascocano@gmail.com"
                method="POST"
                className="space-y-4"
              >
                {/* Configuración especial FormSubmit */}
                <input type="hidden" name="_subject" value="Solicitud de Demostración - VEXTOR" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />

                {/* FILA 1: Nombre y Empresa */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-semibold text-v-white flex items-center gap-1.5">
                      <User size={13} className="text-[#124A2F] dark:text-[#A6C98F]" />
                      Nombre completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      placeholder="Ej. Juan Pérez"
                      className="w-full h-10 px-3.5 py-2 rounded-lg border border-v-dark-border bg-v-dark-soft text-xs sm:text-sm text-v-white placeholder:text-v-gray/60 focus:outline-none focus:border-[#124A2F] dark:focus:border-[#A6C98F] focus:ring-1 focus:ring-[#124A2F] transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-company" className="text-xs font-semibold text-v-white flex items-center gap-1.5">
                      <Building size={13} className="text-[#124A2F] dark:text-[#A6C98F]" />
                      Empresa de transporte <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      name="company"
                      required
                      placeholder="Ej. Transporte Especial S.A.S."
                      className="w-full h-10 px-3.5 py-2 rounded-lg border border-v-dark-border bg-v-dark-soft text-xs sm:text-sm text-v-white placeholder:text-v-gray/60 focus:outline-none focus:border-[#124A2F] dark:focus:border-[#A6C98F] focus:ring-1 focus:ring-[#124A2F] transition-all"
                    />
                  </div>
                </div>

                {/* FILA 2: Correo y Teléfono */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-semibold text-v-white flex items-center gap-1.5">
                      <AtSign size={13} className="text-[#124A2F] dark:text-[#A6C98F]" />
                      Correo corporativo <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      placeholder="juan@empresa.com"
                      className="w-full h-10 px-3.5 py-2 rounded-lg border border-v-dark-border bg-v-dark-soft text-xs sm:text-sm text-v-white placeholder:text-v-gray/60 focus:outline-none focus:border-[#124A2F] dark:focus:border-[#A6C98F] focus:ring-1 focus:ring-[#124A2F] transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-phone" className="text-xs font-semibold text-v-white flex items-center gap-1.5">
                      <Phone size={13} className="text-[#124A2F] dark:text-[#A6C98F]" />
                      Teléfono / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      required
                      placeholder="+57 300 123 4567"
                      className="w-full h-10 px-3.5 py-2 rounded-lg border border-v-dark-border bg-v-dark-soft text-xs sm:text-sm text-v-white placeholder:text-v-gray/60 focus:outline-none focus:border-[#124A2F] dark:focus:border-[#A6C98F] focus:ring-1 focus:ring-[#124A2F] transition-all"
                    />
                  </div>
                </div>

                {/* FILA 3: Cantidad de Vehículos */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-fleet-size" className="text-xs font-semibold text-v-white flex items-center gap-1.5">
                    <FileText size={13} className="text-[#124A2F] dark:text-[#A6C98F]" />
                    Cantidad aproximada de vehículos <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="contact-fleet-size"
                    name="fleet_size"
                    required
                    defaultValue=""
                    className="w-full h-10 px-3.5 py-2 rounded-lg border border-v-dark-border bg-v-dark-soft text-xs sm:text-sm text-v-white focus:outline-none focus:border-[#124A2F] dark:focus:border-[#A6C98F] focus:ring-1 focus:ring-[#124A2F] transition-all"
                  >
                    <option value="" disabled>Seleccione el rango de su flota...</option>
                    <option value="1 a 5 vehiculos">1 a 5 vehículos</option>
                    <option value="6 a 20 vehiculos">6 a 20 vehículos</option>
                    <option value="21 a 50 vehiculos">21 a 50 vehículos</option>
                    <option value="Mas de 50 vehiculos">Más de 50 vehículos</option>
                  </select>
                </div>

                {/* FILA 4: Mensaje */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-semibold text-v-white flex items-center gap-1.5">
                    <MessageSquare size={13} className="text-[#124A2F] dark:text-[#A6C98F]" />
                    ¿Qué requerimiento desea resolver? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={3}
                    placeholder="Cuéntenos sobre su operación de transporte o los objetivos de su empresa..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-v-dark-border bg-v-dark-soft text-xs sm:text-sm text-v-white placeholder:text-v-gray/60 focus:outline-none focus:border-[#124A2F] dark:focus:border-[#A6C98F] focus:ring-1 focus:ring-[#124A2F] transition-all resize-none"
                  />
                </div>

                {/* BOTÓN DE ENVÍO */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full text-sm font-semibold h-11 rounded-lg justify-center shadow-xs cursor-pointer group"
                  >
                    <span>Enviar Solicitud</span>
                    <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
