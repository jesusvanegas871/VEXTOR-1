import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

/**
 * IntermediateCTA Component
 *
 * Responsabilidad:
 * Llamado a la acción estratégico posicionado tras las secciones de soluciones y beneficios,
 * impulsando al usuario hacia el formulario de contacto comercial.
 */
const IntermediateCTA = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-v-dark transition-colors duration-300 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-v-dark-soft border border-v-dark-border rounded-3xl sm:rounded-[36px] p-8 sm:p-12 md:p-14 text-center shadow-2xl overflow-hidden"
          >
            {/* Subtle glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-3xl rounded-full pointer-events-none -z-0" />

            <div className="relative z-10 max-w-3xl mx-auto">

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                <CheckCircle2 size={16} />
                Lleve su flota al siguiente nivel
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-v-white mb-6 tracking-tight leading-tight">
                ¿Listo para tener mayor <span className="text-primary">control de su operación?</span>
              </h2>

              <p className="text-base sm:text-lg text-v-gray mb-8 leading-relaxed font-normal max-w-xl mx-auto">
                Agende una demostración técnica sin compromiso. Nuestro equipo configurará un entorno de prueba adaptado a la cantidad de vehículos de su empresa.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#contacto" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto text-base font-bold h-13 px-9 rounded-xl shadow-md group">
                    Solicitar una demostración
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </div>

              <div className="mt-10 pt-6 border-t border-v-dark-border/60 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-v-gray font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-primary w-4 h-4 shrink-0" />
                  <span>Asesoría personalizada sin costo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="text-primary w-4 h-4 shrink-0" />
                  <span>Demostración en vivo en 24 horas</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default IntermediateCTA;
