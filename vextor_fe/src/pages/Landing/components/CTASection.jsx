import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';

/**
 * CTASection Component
 *
 * Responsabilidad:
 * Llamada a la acción final (Call to Action) para la Landing Page.
 *
 * Funcionalidades:
 * * Titular con cierre de alto impacto ("Comience a gestionar su flota de forma inteligente.").
 * * Botón principal "Comenzar Gratis" con enlace a /register.
 * * Mención de beneficios sin fricción (Sin tarjetas de crédito, configuración rápida).
 */
const CTASection = () => {
  return (
    <section className="py-20 lg:py-28 bg-v-dark transition-colors duration-300 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-v-dark-soft border border-v-dark-border rounded-3xl sm:rounded-[36px] p-8 sm:p-12 md:p-16 text-center shadow-xl overflow-hidden"
          >
            {/* Subtle light orb in background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-3xl rounded-full pointer-events-none -z-0" />

            <div className="relative z-10 max-w-3xl mx-auto">

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                <CheckCircle2 size={16} />
                Transformación Digital VEXTOR
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-v-white mb-6 tracking-tight leading-tight">
                Comience a gestionar su flota de <span className="text-primary">forma inteligente.</span>
              </h2>

              <p className="text-base sm:text-lg text-v-gray mb-10 leading-relaxed font-normal max-w-xl mx-auto">
                Modernice su operación de transporte especial en minutos. Tome el control total de vehículos, conductores y rutas hoy mismo.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto text-base font-bold h-13 px-9 rounded-xl shadow-md group">
                    Comenzar Gratis
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/login" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-base font-semibold h-13 px-8 rounded-xl border-v-dark-border hover:border-primary/40">
                    Iniciar Sesión
                  </Button>
                </Link>
              </div>

              <div className="mt-12 pt-8 border-t border-v-dark-border/60 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-v-gray font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-primary w-4 h-4 shrink-0" />
                  <span>Sin tarjeta de crédito requerida</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="text-primary w-4 h-4 shrink-0" />
                  <span>Configuración ágil e inmediata</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;
