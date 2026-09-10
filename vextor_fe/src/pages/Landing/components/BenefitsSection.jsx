import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Zap,
  TrendingUp,
  Check
} from 'lucide-react';

/**
 * BenefitsSection Component
 *
 * Responsabilidad:
 * Presentar la propuesta de valor basada en beneficios empresariales tangibles:
 * "Más control. Menos imprevistos."
 */
const BenefitsSection = () => {
  const pillars = [
    {
      badge: "PILAR 1: CONTROL TOTAL",
      headline: "Tenga toda la información de su operación centralizada y disponible.",
      description: "Acceda 24/7 a hojas de vida de vehículos, licencias de conductores e itinerarios sin depender de carpetas físicas ni planillas dispersas.",
      icon: ShieldCheck,
      highlights: [
        "Repositorio digital 100% en la nube",
        "Trazabilidad completa de asignaciones",
        "Acceso multiusuario seguro para su equipo"
      ]
    },
    {
      badge: "PILAR 2: PREVENCIÓN OPERATIVA",
      headline: "Anticípese a mantenimientos, vencimientos y situaciones críticas.",
      description: "Reciba alertas tempranas antes de que venza un documento obligatorio o expire el ciclo de revisión en taller de sus unidades.",
      icon: Zap,
      highlights: [
        "Semaforización automática de documentos",
        "Alertas preventivas por kilometraje y fecha",
        "Reducción directa de varadas e inmovilizaciones"
      ]
    },
    {
      badge: "PILAR 3: MEJORES DECISIONES",
      headline: "Obtenga información organizada para tomar mejores decisiones sobre su flota.",
      description: "Analice datos reales sobre la utilización de sus vehículos y gastos operativos para optimizar la rentabilidad de su empresa.",
      icon: TrendingUp,
      highlights: [
        "Reportes consolidados e indicadores clave (KPIs)",
        "Evaluación de la utilización real de vehículos",
        "Claridad sobre costos operativos por unidad"
      ]
    }
  ];

  return (
    <section id="beneficios" className="py-20 lg:py-28 bg-v-dark relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* ENCABEZADO */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#124A2F] dark:text-[#A6C98F] font-semibold tracking-wider uppercase text-xs sm:text-sm mb-3"
          >
            Resultados Tangibles
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-v-white mb-5 leading-tight tracking-tight"
          >
            Más control. <span className="text-[#124A2F] dark:text-[#A6C98F]">Menos imprevistos.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-v-gray leading-relaxed font-normal"
          >
            VEXTOR está estructurado para transformar la complejidad diaria de su operación en orden, previsibilidad y eficiencia administrativa.
          </motion.p>
        </div>

        {/* GRID DE TRES PILARES (Cards de 12-16px radius = rounded-2xl) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-6 sm:p-8 rounded-2xl bg-v-dark-soft border border-v-dark-border hover:border-[#124A2F]/30 dark:hover:border-[#A6C98F]/30 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md group"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#124A2F]/10 dark:bg-[#A6C98F]/10 border border-[#124A2F]/20 dark:border-[#A6C98F]/20 text-[#124A2F] dark:text-[#A6C98F] text-[10px] font-bold uppercase tracking-wider mb-6">
                    {pillar.badge}
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-v-dark border border-v-dark-border text-[#124A2F] dark:text-[#A6C98F] flex items-center justify-center mb-6 group-hover:bg-[#124A2F] group-hover:text-white dark:group-hover:bg-[#124A2F] dark:group-hover:text-white transition-colors duration-300">
                    <Icon size={22} />
                  </div>

                  <h3 className="text-xl font-bold text-v-white mb-3 leading-snug">
                    {pillar.headline}
                  </h3>

                  <p className="text-v-gray text-xs sm:text-sm leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-v-dark-border space-y-2.5">
                  {pillar.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-v-white/90">
                      <Check className="text-[#124A2F] dark:text-[#A6C98F] w-4 h-4 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default BenefitsSection;
