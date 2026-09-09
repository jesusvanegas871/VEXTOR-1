import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Play, X, Truck, Users, Route, Wrench, Bell, BarChart3, CheckCircle } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

/**
 * HeroSection Component
 *
 * Responsabilidad:
 * Sección principal comercial (Hero) de la Landing Page de VEXTOR.
 *
 * Funcionalidades:
 * * Badge "NUEVA ERA EN GESTIÓN DE FLOTAS" con indicador verde animado.
 * * Titular con propuesta de valor y destacado verde en "sola plataforma."
 * * Botones principales ("Comenzar Gratis" -> /register, "Ver Demo" -> Modal interactivo).
 * * Composición visual destacada de vehículos reales de transporte VEXTOR (Bus y Camión PNG).
 * * Modal explicativo para la Demo del producto.
 */
const HeroSection = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const demoModules = [
    {
      title: "Gestión de Vehículos",
      desc: "Control técnico, SOAT, tecno-mecánica, seguros y hoja de vida de cada unidad.",
      icon: Truck
    },
    {
      title: "Gestión de Conductores",
      desc: "Expedientes digitales, vigencia de licencias y asignación eficiente a vehículos.",
      icon: Users
    },
    {
      title: "Programación de Rutas",
      desc: "Monitoreo en mapa, seguimiento de estados y cumplimiento de itinerarios en tiempo real.",
      icon: Route
    },
    {
      title: "Mantenimiento Preventivo",
      desc: "Programación automatizada por kilometraje o fecha para evitar varadas en carretera.",
      icon: Wrench
    },
    {
      title: "Sistema de Alertas",
      desc: "Notificaciones inmediatas sobre vencimientos de documentos y desviaciones en ruta.",
      icon: Bell
    },
    {
      title: "Reportes Operativos",
      desc: "Indicadores clave de rendimiento (KPIs), costos operativos y utilización de flota.",
      icon: BarChart3
    }
  ];

  return (
    <section id="inicio" className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28 overflow-hidden bg-v-dark transition-colors duration-300">
      {/* Elementos sutiles de fondo */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[500px]">

          {/* COLUMNA IZQUIERDA (45% aproximadamente en desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 xl:col-span-5 z-10"
          >
            {/* BADGE DEL HERO */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-primary text-xs font-bold uppercase tracking-wider mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              NUEVA ERA EN GESTIÓN DE FLOTAS
            </motion.div>

            {/* TITULAR PRINCIPAL */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-v-white leading-[1.12] tracking-tight mb-6">
              Gestione toda su <br className="hidden sm:inline" />
              flota desde una <br className="hidden sm:inline" />
              <span className="text-primary">sola plataforma.</span>
            </h1>

            {/* DESCRIPCIÓN */}
            <p className="text-base sm:text-lg text-v-gray mb-8 max-w-xl leading-relaxed font-normal">
              Controle vehículos, conductores, rutas y mantenimientos con una solución moderna diseñada para empresas de transporte especial.
            </p>

            {/* BOTONES DE ACCIÓN */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link to="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-base font-bold h-13 px-8 rounded-xl shadow-md group">
                  Comenzar Gratis
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="lg"
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full sm:w-auto h-13 px-6 text-v-white hover:text-primary gap-3 rounded-xl border border-v-dark-border/60 hover:border-primary/30"
              >
                <div className="w-7 h-7 rounded-full bg-v-gray/20 flex items-center justify-center shrink-0">
                  <Play className="fill-current w-3.5 h-3.5 ml-0.5 text-v-white" />
                </div>
                <span className="font-semibold text-base">Ver Demo</span>
              </Button>
            </div>
          </motion.div>

          {/* COLUMNA DERECHA: COMPOSICIÓN VISUAL DE VEHÍCULOS (55% en desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center mt-6 lg:mt-0"
          >
            {/* Contenedor relativo sin fondos oscuros ni tarjetas para dejar que la transparencia PNG interactúe naturalmente */}
            <div className="relative w-full max-w-2xl flex items-center justify-center min-h-[320px] sm:min-h-[420px]">

              {/* CAMIÓN: Ligeramente detrás y desplazado hacia la derecha superior */}
              <motion.img
                initial={{ opacity: 0, x: 40, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                src="/Camion-removebg.png"
                alt="Camión de transporte VEXTOR"
                className="absolute top-0 right-2 sm:right-6 w-[55%] sm:w-[58%] object-contain filter drop-shadow-xl z-0 select-none pointer-events-none"
              />

              {/* BUS: Vehículo principal en primer plano, más grande y prominente */}
              <motion.img
                initial={{ opacity: 0, x: -30, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                src="/Bus-removebg.png"
                alt="Bus de transporte VEXTOR"
                className="relative top-8 sm:top-12 left-0 sm:-left-4 w-[72%] sm:w-[75%] object-contain filter drop-shadow-2xl z-10 select-none pointer-events-none"
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* MODAL DE DEMO VEXTOR */}
      <AnimatePresence>
        {isDemoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDemoModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-v-dark-soft border border-v-dark-border rounded-2xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                aria-label="Cerrar modal"
                onClick={() => setIsDemoModalOpen(false)}
                className="absolute top-5 right-5 text-v-gray hover:text-v-white p-2 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>

              <div className="mb-6">
                <span className="text-primary font-bold text-xs uppercase tracking-wider">Demo Interactiva de VEXTOR</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-v-white mt-1">
                  Plataforma Integral de Gestión de Flotas
                </h3>
                <p className="text-v-gray text-sm sm:text-base mt-2">
                  Explore los módulos clave que transformarán la eficiencia operativa de su empresa de transporte.
                </p>
              </div>

              {/* Grid de Módulos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                {demoModules.map((module, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-v-dark border border-v-dark-border/80 flex items-start gap-3 hover:border-primary/40 transition-colors"
                  >
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
                      <module.icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-v-white flex items-center gap-1.5">
                        {module.title}
                        <CheckCircle size={14} className="text-primary shrink-0" />
                      </h4>
                      <p className="text-xs text-v-gray mt-1 leading-relaxed">
                        {module.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons in Modal */}
              <div className="pt-4 border-t border-v-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-v-gray font-medium">
                  ¿Listo para comenzar a digitalizar su flota?
                </span>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setIsDemoModalOpen(false)}
                    className="px-4 py-2.5 text-xs font-semibold text-v-gray hover:text-v-white transition-colors"
                  >
                    Cerrar
                  </button>
                  <Link to="/register" className="w-full sm:w-auto">
                    <Button variant="primary" size="sm" className="w-full font-bold px-6 py-2.5">
                      Probar Plataforma Gratis
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
