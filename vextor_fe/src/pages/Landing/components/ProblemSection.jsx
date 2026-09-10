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
    problem: "Información dispersa y desactualizada",
    consequence: "Registros en papel y planillas de Excel desincronizadas generan errores, pérdida de tiempo y falta de visibilidad en tiempo real.",
    solution: "VEXTOR unifica hojas de vida de vehículos, conductores e itinerarios en una única base de datos segura y accesible desde cualquier dispositivo.",
    icon: FileText
  },
  {
    problem: "Vencimientos de documentos desapercibidos",
    consequence: "SOAT, tecno-mecánicas o licencias vencidas derivan en inmovilizaciones, multas severas e interrupción de contratos.",
    solution: "Alertas automáticas y semaforización proactiva que notifican con días de anticipación antes de cada vencimiento.",
    icon: AlertTriangle
  },
  {
    problem: "Mantenimientos correctivos y varadas",
    consequence: "Reparaciones de emergencia no planificadas elevan sustancialmente los costos operativos y afectan la reputación con el cliente.",
    solution: "Programación preventiva automatizada por kilometraje y fecha para intervenir unidades antes de que fallen en carretera.",
    icon: Search
  },
  {
    problem: "Coordinación informal de rutas y viajes",
    consequence: "Despachos por chats o teléfono provocan confusión en el cumplimiento de horarios, asignaciones duplicadas y falta de trazabilidad.",
    solution: "Gestión digital de itinerarios con asignación explícita de vehículo, conductor, horario y monitoreo del estado de la ruta.",
    icon: MessageSquare
  },
  {
    problem: "Dificultad para evaluar la rentabilidad",
    consequence: "Imposibilidad de conocer con certeza el costo de mantenimiento por vehículo y el nivel real de utilización de la flota.",
    solution: "Módulo de reportes consolidados e indicadores clave (KPIs) para tomar decisiones estratégicas fundamentadas en datos reales.",
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
            Los Retos del Transporte Especial
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-v-white mb-6 leading-tight"
          >
            ¿Identifica estos problemas en su <span className="text-primary">operación diaria?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-v-gray leading-relaxed font-normal"
          >
            Gestionar una flota de transporte especial sin una herramienta especializada genera fricción administrativa y sobrecostos. Conozca el impacto directo y cómo VEXTOR lo resuelve.
          </motion.p>
        </div>

        {/* GRID DE PROBLEMA → CONSECUENCIA → SOLUCIÓN */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="p-6 sm:p-8 rounded-2xl bg-v-dark-soft border border-v-dark-border hover:border-primary/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-6">
                  <point.icon size={24} />
                </div>

                <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider block mb-1">
                  Problema común
                </span>
                <h3 className="text-xl font-bold text-v-white mb-3">
                  {point.problem}
                </h3>

                <div className="mb-6 p-3 rounded-xl bg-v-dark/60 border border-v-dark-border/60">
                  <span className="text-[10px] font-bold text-v-gray uppercase tracking-wider block mb-1">
                    Consecuencia operativa:
                  </span>
                  <p className="text-v-gray text-xs leading-relaxed">
                    {point.consequence}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-v-dark-border/80">
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider block mb-1">
                  Solución VEXTOR:
                </span>
                <p className="text-v-white text-xs font-medium leading-relaxed">
                  {point.solution}
                </p>
              </div>
            </motion.div>
          ))}

          {/* TARJETA DESTACADA SOLUCIÓN VEXTOR */}
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
                Transforme sus riesgos en control operacional.
              </h3>
              <p className="font-medium text-v-dark-constant/90 text-sm leading-relaxed">
                VEXTOR elimina la improvisación al integrar vehículos, conductores, rutas y talleres en un único entorno digital centralizado.
              </p>
            </div>

            <a href="#contacto" className="mt-8">
              <button className="w-full bg-v-dark-constant text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center hover:bg-v-dark-constant/90 transition-colors shadow-md">
                Solicitar Demostración
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
