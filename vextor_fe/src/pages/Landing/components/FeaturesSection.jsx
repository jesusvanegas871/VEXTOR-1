import { motion } from 'framer-motion';
import {
  Truck,
  Users,
  Route,
  Wrench,
  Bell,
  BarChart3,
  CheckCircle2,
  Zap,
  ShieldCheck,
  TrendingUp,
  FolderCheck,
  Clock
} from 'lucide-react';

/**
 * FeaturesSection Component
 *
 * Responsabilidad:
 * Presentar las 6 funcionalidades principales de VEXTOR y comunicar los beneficios operativos reales
 * para las empresas de transporte especial.
 *
 * Funcionalidades:
 * * id="funciones" para navegación interna.
 * * Tarjetas de funciones principales: Gestión de vehículos, Conductores, Rutas, Mantenimiento, Alertas y Reportes.
 * * id="beneficios" para resaltar valor operativo sin métricas ficticias.
 */
const mainFeatures = [
  {
    title: "Gestión de Vehículos",
    description: "Control centralizado de especificaciones, documentos obligatorios (SOAT, tecno-mecánica), seguros y estado operativo.",
    icon: Truck
  },
  {
    title: "Gestión de Conductores",
    description: "Expedientes digitales, control de licencias de conducción, asignaciones a unidades y seguimiento de actividad.",
    icon: Users
  },
  {
    title: "Gestión de Rutas",
    description: "Programación inteligente de itinerarios, asignación de origen-destino y monitoreo de cumplimiento operacional.",
    icon: Route
  },
  {
    title: "Mantenimiento Preventivo",
    description: "Programación de alertas automáticas por kilometraje o periodicidad para revisiones técnicas y preventivas.",
    icon: Wrench
  },
  {
    title: "Sistema de Alertas",
    description: "Notificaciones proactivas de vencimientos documentales, novedades de servicio y eventos críticos en carretera.",
    icon: Bell
  },
  {
    title: "Reportes Operativos",
    description: "Consolidación de datos reales en informes claros de utilización de la flota, historial y costos operativos.",
    icon: BarChart3
  }
];

const realBenefits = [
  {
    title: "Menos procesos manuales",
    desc: "Sustituya planillas de papel e hilos informales de chat por un flujo de trabajo digital automatizado.",
    icon: Zap
  },
  {
    title: "Mayor control de la flota",
    desc: "Visibilidad permanente sobre la disponibilidad, estado y asignaciones de cada vehículo de la empresa.",
    icon: ShieldCheck
  },
  {
    title: "Mejor seguimiento operativo",
    desc: "Conozca con precisión el avance de las rutas y el cumplimiento de los compromisos de transporte.",
    icon: TrendingUp
  },
  {
    title: "Mantenimiento organizado",
    desc: "Evite varadas imprevistas en ruta manteniendo al día el plan preventivo de cada unidad.",
    icon: Wrench
  },
  {
    title: "Información centralizada",
    desc: "Documentos, hojas de vida y registros organizados en un solo repositorio seguro accesible 24/7.",
    icon: FolderCheck
  },
  {
    title: "Mayor seguridad operacional",
    desc: "Garantice que únicamente conductores capacitados con licencias vigentes operen los vehículos.",
    icon: Clock
  }
];

const FeaturesSection = () => {
  return (
    <div className="bg-v-dark transition-colors duration-300">

      {/* SECCIÓN FUNCIONES (#funciones) */}
      <section id="funciones" className="py-20 lg:py-28 bg-v-dark-soft/50 border-y border-v-dark-border/60">
        <div className="container mx-auto px-4 sm:px-6">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold tracking-wider uppercase text-xs sm:text-sm mb-3"
            >
              Funcionalidades Clave
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-v-white mb-6 tracking-tight"
            >
              Todo lo que necesita para <span className="text-primary">gestionar su flota.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-v-gray leading-relaxed"
            >
              VEXTOR integra los seis pilares fundamentales que toda empresa de transporte requiere para operar con máxima eficiencia.
            </motion.p>
          </div>

          {/* GRID DE 6 FUNCIONES */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="p-6 sm:p-8 rounded-2xl bg-v-dark border border-v-dark-border hover:border-primary/40 transition-all duration-300 shadow-xs hover:shadow-md group"
              >
                <div className="w-12 h-12 rounded-xl bg-v-dark-soft border border-v-dark-border text-v-white flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-v-dark-constant group-hover:border-primary transition-colors duration-300">
                  <feature.icon size={24} />
                </div>

                <h3 className="text-xl font-bold text-v-white mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>

                <p className="text-v-gray text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* SECCIÓN BENEFICIOS (#beneficios) */}
      <section id="beneficios" className="py-20 lg:py-28 bg-v-dark relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">

          <div className="max-w-3xl mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold tracking-wider uppercase text-xs sm:text-sm mb-3"
            >
              Beneficios Reales
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-v-white mb-6 leading-tight tracking-tight"
            >
              Impacto directo en la <span className="text-primary">eficiencia de su transporte.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base sm:text-lg text-v-gray leading-relaxed font-normal"
            >
              Sin promesas exageradas ni métricas ficticias. VEXTOR genera orden operativo, previsibilidad y ahorro administrativo tangible desde el primer día.
            </motion.p>
          </div>

          {/* GRID DE BENEFICIOS REALES */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {realBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="p-6 sm:p-8 rounded-2xl bg-v-dark-soft border border-v-dark-border/80 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <benefit.icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-v-white">
                    {benefit.title}
                  </h3>
                </div>

                <p className="text-v-gray text-sm leading-relaxed">
                  {benefit.desc}
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-primary">
                  <CheckCircle2 size={16} />
                  Garantizado por VEXTOR
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default FeaturesSection;
