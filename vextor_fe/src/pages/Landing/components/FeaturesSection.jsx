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
const solutions = [
  {
    title: "Gestión de Vehículos",
    problemSolved: "Desorden en fichas técnicas, pérdida de control de tarjetas de operación y pólizas vencidas.",
    benefit: "Centralice la información de su flota y tenga una visión clara del estado técnico, documental y disponibilidad de cada vehículo.",
    icon: Truck
  },
  {
    title: "Gestión de Conductores",
    problemSolved: "Riesgos por licencias vencidas, falta de control en antecedentes y asignaciones informales.",
    benefit: "Asegure expedientes digitales al día, controle categorías de licencia y garantice personal capacitado en cada servicio.",
    icon: Users
  },
  {
    title: "Programación de Rutas",
    problemSolved: "Despachos desorganizados, incumplimiento de horarios e itinerarios sin trazabilidad.",
    benefit: "Monitoree y programe trayectos de origen a destino, asegurando el cumplimiento puntual de contratos empresariales y escolares.",
    icon: Route
  },
  {
    title: "Mantenimiento Preventivo",
    problemSolved: "Reparaciones de emergencia no planificadas en carretera que elevan los costos mecánicos.",
    benefit: "Configure alertas por kilometraje o fecha para realizar revisiones en taller antes de que ocurran fallas mecánicas.",
    icon: Wrench
  },
  {
    title: "Sistema de Alertas",
    problemSolved: "Sanciones o inmovilizaciones por vencimientos documentales no detectados a tiempo.",
    benefit: "Reciba notificaciones automáticas y semaforizadas con días de anticipación sobre SOAT, RTM y pólizas.",
    icon: Bell
  },
  {
    title: "Reportes Operativos",
    problemSolved: "Falta de datos consolidados para evaluar la rentabilidad y utilización real de los vehículos.",
    benefit: "Obtenga indicadores claros de disponibilidad, desempeño de conductores e historial para tomar decisiones informadas.",
    icon: BarChart3
  }
];

const FeaturesSection = () => {
  return (
    <section id="funciones" className="py-20 lg:py-28 bg-v-dark-soft/50 border-y border-v-dark-border/60 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">

        {/* ENCABEZADO */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-wider uppercase text-xs sm:text-sm mb-3"
          >
            Soluciones Integrales
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-v-white mb-6 tracking-tight"
          >
            Módulos diseñados para <span className="text-primary">resolver su operación.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-v-gray leading-relaxed"
          >
            Más que una lista de características técnicas, VEXTOR proporciona herramientas estructuradas para generar valor y resultados tangibles en su empresa de transporte especial.
          </motion.p>
        </div>

        {/* GRID DE 6 SOLUCIONES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {solutions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="p-6 sm:p-8 rounded-2xl bg-v-dark border border-v-dark-border hover:border-primary/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-v-dark-soft border border-v-dark-border text-v-white flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-v-dark-constant group-hover:border-primary transition-colors duration-300">
                  <item.icon size={24} />
                </div>

                <h3 className="text-xl font-bold text-v-white mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                {/* PROBLEMA QUE RESUELVE */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-v-gray uppercase tracking-wider block mb-1">
                    ¿Qué problema resuelve?
                  </span>
                  <p className="text-v-gray text-xs leading-relaxed">
                    {item.problemSolved}
                  </p>
                </div>
              </div>

              {/* BENEFICIO DIRECTO */}
              <div className="pt-4 border-t border-v-dark-border/80">
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-1">
                  Beneficio obtenido:
                </span>
                <p className="text-v-white text-xs font-medium leading-relaxed">
                  {item.benefit}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
