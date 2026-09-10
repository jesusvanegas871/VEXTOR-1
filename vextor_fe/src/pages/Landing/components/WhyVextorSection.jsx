import { motion } from 'framer-motion';
import {
  Bus,
  Cloud,
  Layout,
  Layers,
  ShieldAlert,
  LineChart,
  CheckCircle2
} from 'lucide-react';

/**
 * WhyVextorSection Component
 *
 * Responsabilidad:
 * Comunicar la propuesta de valor diferenciadora de VEXTOR.
 */
const differentiators = [
  {
    title: "Especializado en gestión de flotas",
    desc: "VEXTOR entiende la normatividad, documentación obligatoria y gestión de itinerarios requerida por las empresas de transporte.",
    icon: Bus
  },
  {
    title: "Información 100% centralizada",
    desc: "Elimine los silos de datos. Vehículos, conductores, mantenimientos y rutas conviven en una plataforma unificada en la nube.",
    icon: Cloud
  },
  {
    title: "Interfaz amigable e intuitiva",
    desc: "Diseñada pensando en la usabilidad real. Su equipo administrativo comenzará a operar en cuestión de minutos.",
    icon: Layout
  },
  {
    title: "Gestión integral de la operación",
    desc: "Desde la ficha técnica del vehículo hasta la asignación del conductor y la alerta de mantenimiento en taller.",
    icon: Layers
  },
  {
    title: "Enfoque preventivo proactivo",
    desc: "Plataforma construida para prevenir inmovilizaciones, multas y varadas en lugar de reaccionar ante las crisis.",
    icon: ShieldAlert
  },
  {
    title: "Información para tomar decisiones",
    desc: "Datos estructurados que le otorgan visibilidad real sobre la rentabilidad de cada unidad y costos de taller.",
    icon: LineChart
  }
];

const WhyVextorSection = () => {
  return (
    <section id="por-que-vextor" className="py-20 lg:py-28 bg-v-dark border-b border-v-dark-border transition-colors duration-300 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* ENCABEZADO */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#124A2F]/10 dark:bg-[#A6C98F]/10 border border-[#124A2F]/20 dark:border-[#A6C98F]/20 text-[#124A2F] dark:text-[#A6C98F] text-xs font-semibold uppercase tracking-wider mb-4"
          >
            Diferenciación B2B
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-v-white mb-5 tracking-tight leading-tight"
          >
            ¿Por qué las empresas eligen <span className="text-[#124A2F] dark:text-[#A6C98F]">VEXTOR?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-v-gray leading-relaxed max-w-2xl mx-auto font-normal"
          >
            Descubra las razones por las que VEXTOR es el socio tecnológico ideal para elevar el estándar de control de su empresa.
          </motion.p>
        </div>

        {/* GRID DE DIFERENCIADORES (Cards 12-16px radius = rounded-2xl) */}
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
                className="p-6 sm:p-8 rounded-2xl bg-v-dark-soft border border-v-dark-border hover:border-[#124A2F]/30 dark:hover:border-[#A6C98F]/30 transition-all duration-300 shadow-xs hover:shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#124A2F]/10 dark:bg-[#A6C98F]/10 text-[#124A2F] dark:text-[#A6C98F] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                    <Icon size={20} />
                  </div>

                  <h3 className="text-lg font-bold text-v-white mb-3 group-hover:text-[#124A2F] dark:group-hover:text-[#A6C98F] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-v-gray text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-v-dark-border flex items-center gap-2 text-xs font-semibold text-[#124A2F] dark:text-[#A6C98F]">
                  <CheckCircle2 size={15} />
                  <span>Diferenciador VEXTOR</span>
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
