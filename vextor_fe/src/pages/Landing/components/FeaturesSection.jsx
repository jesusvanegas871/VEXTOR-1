import { motion } from 'framer-motion';
import {
  Truck,
  Users,
  Route,
  Wrench,
  Bell,
  BarChart3
} from 'lucide-react';

/**
 * FeaturesSection Component
 *
 * Responsabilidad:
 * Presentar las 6 soluciones/funciones principales de VEXTOR en tarjetas corporativas con 12-16px radius.
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
    benefit: "Monitoree y programe trayectos de origen a destino, asegurando el cumplimiento puntual de itinerarios.",
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
    <section id="funciones" className="py-20 lg:py-28 bg-v-dark-soft/40 border-y border-v-dark-border/70 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">

        {/* ENCABEZADO */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#124A2F] dark:text-[#A6C98F] font-bold tracking-wider uppercase text-xs sm:text-sm mb-3"
          >
            Funcionalidades de Plataforma
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-v-white mb-5 tracking-tight leading-[1.18]"
          >
            Módulos diseñados para <span className="text-[#124A2F] dark:text-[#A6C98F]">resolver su operación.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-v-gray leading-relaxed max-w-2xl mx-auto font-normal"
          >
            Herramientas estructuradas para generar valor, previsibilidad y eficiencia en el día a día de su empresa de transporte.
          </motion.p>
        </div>

        {/* GRID DE 6 FUNCIONALIDADES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {solutions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="p-6 sm:p-8 rounded-2xl bg-v-dark border border-v-dark-border hover:border-[#124A2F]/40 dark:hover:border-[#A6C98F]/40 hover:-translate-y-1 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-v-dark-soft border border-v-dark-border text-v-white flex items-center justify-center mb-6 group-hover:bg-[#124A2F] group-hover:text-white group-hover:border-[#124A2F] transition-colors duration-300 shadow-2xs">
                  <item.icon size={22} />
                </div>

                <h3 className="text-xl font-bold text-v-white mb-3 group-hover:text-[#124A2F] dark:group-hover:text-[#A6C98F] transition-colors">
                  {item.title}
                </h3>

                {/* PROBLEMA QUE RESUELVE */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-v-gray uppercase tracking-wider block mb-1">
                    ¿Qué problema resuelve?
                  </span>
                  <p className="text-v-gray text-xs leading-relaxed font-normal">
                    {item.problemSolved}
                  </p>
                </div>
              </div>

              {/* BENEFICIO DIRECTO */}
              <div className="pt-4 border-t border-v-dark-border">
                <span className="text-[10px] font-bold text-[#124A2F] dark:text-[#A6C98F] uppercase tracking-wider block mb-1">
                  Beneficio obtenido:
                </span>
                <p className="text-v-white text-xs font-semibold leading-relaxed">
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
