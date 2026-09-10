import { motion } from 'framer-motion';
import {
  Bus,
  Cloud,
  Layout,
  Layers,
  ShieldAlert,
  LineChart,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

/**
 * WhyVextorSection Component
 *
 * Responsabilidad:
 * Comunicar la propuesta de valor diferenciadora de VEXTOR frente a soluciones genéricas.
 * ID: #por-que-vextor
 */
const differentiators = [
  {
    title: "Diseñado para transporte especial",
    desc: "A diferencia de softwares genéricos de rastreo GPS, VEXTOR entiende la normatividad, documentación obligatoria y gestión de itinerarios de empresas de transporte de pasajeros.",
    icon: Bus
  },
  {
    title: "Información 100% centralizada",
    desc: "Elimine los silos de datos. Vehículos, conductores, mantenimientos y rutas conviven en una plataforma unificada accesible desde cualquier lugar.",
    icon: Cloud
  },
  {
    title: "Interfaz amigable e intuitiva",
    desc: "Diseñada pensando en la usabilidad real. Su equipo administrativo y sus conductores comenzarán a operar en cuestión de minutos sin extensas capacitaciones.",
    icon: Layout
  },
  {
    title: "Gestión integral de la operación",
    desc: "Desde la ficha técnica del vehículo hasta la asignación del conductor y la alerta de mantenimiento en taller. Todo el ciclo operativo cubierto.",
    icon: Layers
  },
  {
    title: "Enfoque preventivo proactivo",
    desc: "Plataforma construida para prevenir problemas (inmovilizaciones, multas, varadas) en lugar de simplemente reaccionar ante las crisis.",
    icon: ShieldAlert
  },
  {
    title: "Información para mejores decisiones",
    desc: "Datos estructurados que le otorgan visibilidad real sobre la rentabilidad de cada unidad, costos de taller y eficiencia de su flota.",
    icon: LineChart
  }
];

const WhyVextorSection = () => {
  return (
    <section id="por-que-vextor" className="py-20 lg:py-28 bg-v-dark-soft/40 border-y border-v-dark-border/60 transition-colors duration-300 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* ENCABEZADO */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Sparkles size={16} />
            Diferenciación B2B
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-v-white mb-6 tracking-tight leading-tight"
          >
            ¿Por qué las empresas eligen <span className="text-primary">VEXTOR?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-v-gray leading-relaxed max-w-2xl mx-auto"
          >
            Descubra las razones por las que VEXTOR es el socio tecnológico ideal para elevar el estándar de control de su empresa de transporte especial.
          </motion.p>
        </div>

        {/* GRID DE DIFERENCIADORES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="p-6 sm:p-8 rounded-2xl bg-v-dark border border-v-dark-border hover:border-primary/40 transition-all duration-300 shadow-xs hover:shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-xl font-bold text-v-white mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-v-gray text-xs sm:text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-v-dark-border/80 flex items-center gap-2 text-xs font-bold text-primary">
                  <CheckCircle2 size={16} />
                  <span>Factor Diferenciador VEXTOR</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyVextorSection;
