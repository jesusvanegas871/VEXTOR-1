import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Zap,
  TrendingUp,
  CheckCircle2,
  Lock,
  Clock,
  Layers,
  BarChart3,
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
      title: "CONTROL",
      headline: "Tenga toda la información de su operación centralizada y disponible.",
      description: "Acceda 24/7 a hojas de vida de vehículos, licencias de conductores e itinerarios sin depender de carpetas físicas ni planillas dispersas.",
      icon: ShieldCheck,
      highlights: [
        "Repository digital 100% en la nube",
        "Trazabilidad completa de asignaciones",
        "Acceso multiusuario seguro para su equipo"
      ]
    },
    {
      badge: "PILAR 2: PREVENCIÓN OPERATIVA",
      title: "PREVENCIÓN",
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
      title: "DECISIONES",
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
      {/* Background glow effect */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* ENCABEZADO */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-wider uppercase text-xs sm:text-sm mb-3"
          >
            Resultados Tangibles
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-v-white mb-6 leading-tight tracking-tight"
          >
            Más control. <span className="text-primary">Menos imprevistos.</span>
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

        {/* GRID DE TRES PILARES */}
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
                className="p-6 sm:p-8 rounded-3xl bg-v-dark-soft border border-v-dark-border hover:border-primary/40 transition-all duration-300 flex flex-col justify-between shadow-lg group"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider mb-6">
                    {pillar.badge}
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-v-dark border border-v-dark-border text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-v-dark-constant transition-colors duration-300">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-v-white mb-3 leading-snug">
                    {pillar.headline}
                  </h3>

                  <p className="text-v-gray text-xs sm:text-sm leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-v-dark-border/80 space-y-2.5">
                  {pillar.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-v-white/90">
                      <Check className="text-primary w-4 h-4 shrink-0 mt-0.5" />
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
