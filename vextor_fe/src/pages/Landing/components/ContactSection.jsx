import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Headphones, ShieldCheck, User, Building, AtSign, FileText } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

/**
 * ContactSection Component
 *
 * Responsabilidad:
 * Sección de contacto comercial para la Landing Page de VEXTOR.
 * Integra un formulario directo enviado a través de FormSubmit.co.
 *
 * Funcionalidades:
 * * Anchor #contacto con scroll-mt-20 para navegación suave sin ser ocultado por la navbar fija.
 * * Layout responsive de dos columnas en desktop e información vertical en móvil.
 * * FormSubmit POST directo a ivancarrascocano@gmail.com sin endpoints backend propios.
 * * Configuración de campos especiales FormSubmit (_subject, _template, _captcha).
 * * Campos: Nombre (req), Empresa, Correo (req), Teléfono (req), Asunto (req), Mensaje (req).
 */
const ContactSection = () => {
  return (
    <section id="contacto" className="scroll-mt-20 py-20 lg:py-28 bg-v-dark transition-colors duration-300 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-primary/10 blur-3xl rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">

          {/* COLUMNA IZQUIERDA: INFORMACIÓN COMERCIAL Y DE CONTACTO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between h-full"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                <MessageSquare size={16} />
                Atención Personalizada
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-v-white mb-6 tracking-tight leading-tight">
                Hablemos de tu <span className="text-primary">operación</span>
              </h2>

              <p className="text-base text-v-gray mb-8 leading-relaxed">
                ¿Quieres conocer cómo VEXTOR puede ayudarte a optimizar la gestión, control e itinerarios de tu flota de transporte? Déjanos tus datos y nuestro equipo especialista se pondrá en contacto contigo a la brevedad.
              </p>

              {/* PUNTOS CLAVE DE VALOR */}
              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <Headphones size={18} />
                  </div>
                  <div>
                    <h4 className="text-v-white font-semibold text-sm">Asesoría Técnica y Comercial</h4>
                    <p className="text-v-gray text-xs leading-relaxed">Acompañamiento en la digitalización y dimensionamiento de tu flota.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h4 className="text-v-white font-semibold text-sm">Prueba Guiada de Plataforma</h4>
                    <p className="text-v-gray text-xs leading-relaxed">Demostración en vivo de las herramientas de monitoreo y control.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* DATOS DE CONTACTO DIRECTO */}
            <div className="pt-8 border-t border-v-dark-border/80 space-y-4">
              <div className="flex items-center gap-3 text-v-gray text-sm">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>contacto@vextor.com</span>
              </div>
              <div className="flex items-center gap-3 text-v-gray text-sm">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+57 (601) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-v-gray text-sm">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Bogotá, Colombia</span>
              </div>
            </div>
          </motion.div>

          {/* COLUMNA DERECHA: TARJETA CON FORMULARIO FORMSUBMIT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="bg-v-dark-soft border border-v-dark-border rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-v-white mb-2">Envíanos un mensaje</h3>
                <p className="text-sm text-v-gray">Completa los siguientes campos y nos comunicaremos en menos de 24 horas.</p>
              </div>

              <form
                action="https://formsubmit.co/ivancarrascocano@gmail.com"
                method="POST"
                className="space-y-5"
              >
                {/* Configuración especial FormSubmit */}
                <input type="hidden" name="_subject" value="Nuevo contacto desde VEXTOR" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />

                {/* FILA 1: Nombre y Empresa */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-sm font-medium text-v-gray flex items-center gap-1.5">
                      <User size={14} className="text-primary" />
                      Nombre <span className="text-primary">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      placeholder="Ej. Juan Pérez"
                      className="w-full h-11 px-3.5 py-2 rounded-xl border border-v-dark-border bg-v-dark text-sm text-v-white placeholder:text-v-gray/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-company" className="text-sm font-medium text-v-gray flex items-center gap-1.5">
                      <Building size={14} className="text-primary" />
                      Empresa
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      name="company"
                      placeholder="Ej. Transporte VEXTOR S.A.S."
                      className="w-full h-11 px-3.5 py-2 rounded-xl border border-v-dark-border bg-v-dark text-sm text-v-white placeholder:text-v-gray/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* FILA 2: Correo Electrónico y Teléfono */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-sm font-medium text-v-gray flex items-center gap-1.5">
                      <AtSign size={14} className="text-primary" />
                      Correo electrónico <span className="text-primary">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      placeholder="juan@empresa.com"
                      className="w-full h-11 px-3.5 py-2 rounded-xl border border-v-dark-border bg-v-dark text-sm text-v-white placeholder:text-v-gray/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-phone" className="text-sm font-medium text-v-gray flex items-center gap-1.5">
                      <Phone size={14} className="text-primary" />
                      Teléfono
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      placeholder="+57 300 123 4567"
                      className="w-full h-11 px-3.5 py-2 rounded-xl border border-v-dark-border bg-v-dark text-sm text-v-white placeholder:text-v-gray/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* FILA 3: Asunto */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="text-sm font-medium text-v-gray flex items-center gap-1.5">
                    <FileText size={14} className="text-primary" />
                    Asunto <span className="text-primary">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    required
                    placeholder="Ej. Solicitud de cotización para flota"
                    className="w-full h-11 px-3.5 py-2 rounded-xl border border-v-dark-border bg-v-dark text-sm text-v-white placeholder:text-v-gray/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>

                {/* FILA 4: Mensaje */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-sm font-medium text-v-gray flex items-center gap-1.5">
                    <MessageSquare size={14} className="text-primary" />
                    Mensaje <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Cuéntanos cuántos vehículos integran tu flota o qué necesidades operativas deseas solucionar..."
                    className="w-full px-3.5 py-3 rounded-xl border border-v-dark-border bg-v-dark text-sm text-v-white placeholder:text-v-gray/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
                  />
                </div>

                {/* BOTÓN DE ENVÍO */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full text-base font-bold h-12 rounded-xl shadow-md group justify-center"
                  >
                    <span>Enviar mensaje</span>
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
