import { motion } from 'framer-motion';
import {
  FileText,
  Search,
  MessageSquare,
  AlertTriangle,
  Clock,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * ProblemSection Component
 *
 * Responsabilidad:
 * Demostrar los problemas críticos de la gestión manual de flotas y posicionar a VEXTOR como la solución definitiva.
 *
 * Funcionalidades:
 * * Titular con agitación del problema ("¿Su operación depende de procesos manuales?").
 * * Tarjetas de puntos de dolor operativos (papel, Excel disperso, WhatsApp, faltas de mantenimiento).
 * * Tarjeta destacada de conversión directa a la solución VEXTOR.
 */
const painPoints = [
  {
    title: "Uso excesivo de papel",
    description: "Planillas y reportes físicos que se extravían, deterioran o son imposibles de auditar rápidamente.",
    icon: FileText
  },
  {
    title: "Información dispersa en Excel",
    description: "Múltiples archivos desactualizados que impiden consolidar indicadores de flota a tiempo.",
    icon: Search
  },
  {
    title: "Gestión informal por WhatsApp",
    description: "Despachos e imprevistos coordinados sin registro estructurado ni trazabilidad operativa.",
    icon: MessageSquare
  },
  {
    title: "Mantenimientos correctivos costosos",
    description: "Falta de alertas preventivas que causan varadas en carretera e interrupción del servicio.",
    icon: AlertTriangle
  },
  {
    title: "Pérdida de control del tiempo",
    description: "Incertidumbre constante sobre la ubicación exacta y el estado de conductores y vehículos.",
    icon: Clock
  }
];

const ProblemSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-v-dark transition-colors duration-300 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* ENCABEZADO DE SECCIÓN */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-wider uppercase text-xs sm:text-sm mb-3"
          >
            El Desafío Operativo
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-v-white mb-6 leading-tight"
          >
            ¿Su operación depende de <span className="text-primary">procesos manuales?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-v-gray leading-relaxed font-normal"
          >
            Las empresas de transporte más competitivas ya dejaron atrás el papel. Si aún gestiona su flota de forma manual, está perdiendo dinero y control.
          </motion.p>
        </div>

        {/* GRID DE PROBLEMAS VS SOLUCIÓN */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group p-6 sm:p-8 rounded-2xl bg-v-dark-soft border border-v-dark-border hover:border-primary/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <point.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-v-white mb-3 group-hover:text-primary transition-colors">
                  {point.title}
                </h3>
                <p className="text-v-gray text-sm leading-relaxed mb-6">
                  {point.description}
                </p>
              </div>

              <div className="pt-4 border-t border-v-dark-border/60 flex items-center text-xs font-bold text-v-gray/70 group-hover:text-primary transition-colors">
                Solución VEXTOR disponible <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}

          {/* TARJETA ESPECIAL SOLUCIÓN VEXTOR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="p-6 sm:p-8 rounded-2xl bg-primary text-v-dark-constant flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-v-dark-constant/10 flex items-center justify-center mb-6">
                <CheckCircle2 size={26} className="text-v-dark-constant" />
              </div>
              <h3 className="text-2xl font-extrabold mb-4 leading-snug">
                VEXTOR centraliza y digitaliza toda su flota.
              </h3>
              <p className="font-medium text-v-dark-constant/80 text-sm leading-relaxed">
                Elimine el desorden administrativo. Integre vehículos, conductores, rutas y mantenimientos en una sola plataforma profesional.
              </p>
            </div>

            <Link to="/register" className="mt-8">
              <button className="w-full bg-v-dark-constant text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center hover:bg-v-dark-constant/90 transition-colors shadow-md">
                Comenzar Transformación
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
