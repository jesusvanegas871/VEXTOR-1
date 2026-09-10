import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, Truck, Users, Route, Wrench, Bell, BarChart3, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useTheme } from '../../../context/ThemeContext';

/**
 * HeroSection Component
 *
 * Responsabilidad:
 * Sección Hero comercial de la Landing Page pública de VEXTOR.
 *
 * Requisitos estritos:
 * * Titular exacto: "Gestione toda su flota desde una sola plataforma." con énfasis en verde VEXTOR en "sola plataforma."
 * * Vehículos obligatorios: Bus (dominante) y Camión (detrás superpuesto), junto al Mapa de fondo.
 * * Botón Principal CTA: "Comenzar Gratis" -> /register (Verde Oscuro VEXTOR, text white, radius 8-10px).
 * * Botón Secundario CTA: "Ver Demo" -> Modal interactivo de demo (Fondo blanco/off-white, borde sutil, texto verde oscuro VEXTOR).
 * * Elementos visuales integrados con la marca (rutas, puntos de conexión en mapa).
 */
const HeroSection = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const { theme } = useTheme();

  const mapBgImage = theme === 'dark'
    ? '/HeroMap/bogot_ciudad_dark.png'
    : '/HeroMap/bogot_ciudad_light.png';

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
    <section id="inicio" className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28 overflow-hidden bg-v-dark transition-colors duration-300 min-h-[580px] sm:min-h-[640px] flex items-center">
      {/* FONDO DE MAPA Y DETALLES DE CONEXIÓN DE MARCA */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src={mapBgImage}
          alt="Mapa urbano VEXTOR"
          className="w-full h-full object-cover object-center transition-opacity duration-500 opacity-75 dark:opacity-60"
        />

        {/* Overlay sutil de degradados de legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-v-dark via-v-dark/95 to-v-dark/50 dark:from-v-dark dark:via-v-dark/95 dark:to-v-dark/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-v-dark/90 via-transparent to-v-dark" />

        {/* Puntos y líneas sutiles de conexión inspirados en el isotipo de VEXTOR */}
        <div className="absolute inset-0 overflow-hidden opacity-30 dark:opacity-40">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="vextor-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#124A2F" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#A6C98F" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path d="M 400 150 Q 600 250 850 180 T 1200 350" fill="none" stroke="url(#vextor-line-grad)" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="600" cy="250" r="4" fill="#124A2F" className="animate-ping" />
            <circle cx="600" cy="250" r="4" fill="#A6C98F" />
            <circle cx="850" cy="180" r="4" fill="#124A2F" />
          </svg>
        </div>
      </div>

      {/* VEHÍCULOS SUPERPUESTOS (DESKTOP / TABLET) */}
      <div className="hidden sm:flex absolute inset-y-0 right-0 z-[5] w-7/12 lg:w-1/2 items-center justify-end pointer-events-none overflow-hidden pr-4 lg:pr-10">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="relative max-w-[420px] md:max-w-[500px] lg:max-w-[620px] xl:max-w-[680px]"
        >
          <img
            src="/Cars/vehiculos-hero.png"
            alt="Flota de vehículos VEXTOR"
            className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(18,74,47,0.15)] dark:drop-shadow-[0_16px_32px_rgba(0,0,0,0.6)]"
          />
        </motion.div>
      </div>

      {/* CONTENIDO DEL HERO EN PRIMER PLANO */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-xl lg:max-w-2xl">

          {/* BADGE DE SECTOR CORPORATIVO */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#124A2F]/10 dark:bg-[#A6C98F]/10 border border-[#124A2F]/20 dark:border-[#A6C98F]/20 text-[#124A2F] dark:text-[#A6C98F] text-xs font-semibold tracking-wide mb-5"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#124A2F] dark:bg-[#A6C98F] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#124A2F] dark:bg-[#A6C98F]"></span>
            </span>
            GESTIÓN INTELIGENTE DE FLOTAS Y MOVILIDAD
          </motion.div>

          {/* TITULAR PRINCIPAL */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-v-white leading-[1.15] tracking-tight mb-5"
          >
            Gestione toda su flota desde <span className="text-[#124A2F] dark:text-[#A6C98F]">una sola plataforma.</span>
          </motion.h1>

          {/* DESCRIPCIÓN COMERCIAL */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm sm:text-base lg:text-lg text-v-gray mb-8 max-w-lg leading-relaxed font-normal"
          >
            VEXTOR centraliza vehículos, conductores, itinerarios, mantenimientos preventivos y alertas en tiempo real en una solución SaaS corporativa intuitiva y confiable.
          </motion.p>

          {/* BOTONES DE ACCIÓN PRINCIPALES */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5"
          >
            <a href="/register" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full sm:w-auto text-sm sm:text-base font-semibold h-12 px-6 rounded-lg group">
                Comenzar Gratis
                <ChevronRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>

            <button onClick={() => setIsDemoModalOpen(true)} className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto text-sm sm:text-base font-semibold h-12 px-6 rounded-lg"
              >
                Ver Demo
              </Button>
            </button>
          </motion.div>

          {/* VEHÍCULOS SUPERPUESTOS EN MOBILE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="sm:hidden my-6 flex justify-center pointer-events-none"
          >
            <img
              src="/Cars/vehiculos-hero.png"
              alt="Flota VEXTOR"
              className="w-full max-w-[320px] h-auto object-contain drop-shadow-md"
            />
          </motion.div>

          {/* INDICADORES CLAVE REAFIERMANTE */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 pt-6 border-t border-v-dark-border flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-v-gray font-medium"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#124A2F] dark:text-[#A6C98F] shrink-0" />
              <span>Control operativo 100% digital</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#124A2F] dark:text-[#A6C98F] shrink-0" />
              <span>Alertas tempranas de documentos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#124A2F] dark:text-[#A6C98F] shrink-0" />
              <span>Plataforma corporativa segura</span>
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
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-3xl bg-v-dark-soft border border-v-dark-border rounded-2xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                aria-label="Cerrar modal"
                onClick={() => setIsDemoModalOpen(false)}
                className="absolute top-4 right-4 text-v-gray hover:text-v-white p-2 rounded-lg transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="mb-6">
                <span className="text-[#124A2F] dark:text-[#A6C98F] font-bold text-xs uppercase tracking-wider">Demostración Interactiva</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-v-white mt-1">
                  Plataforma Corporativa VEXTOR
                </h3>
                <p className="text-v-gray text-xs sm:text-sm mt-2">
                  Conozca los módulos principales que estructuran y profesionalizan la gestión de flotas.
                </p>
              </div>

              {/* Grid de Módulos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                {demoModules.map((module, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-v-dark border border-v-dark-border flex items-start gap-3 hover:border-[#124A2F]/40 dark:hover:border-[#A6C98F]/40 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-[#124A2F]/10 dark:bg-[#A6C98F]/10 text-[#124A2F] dark:text-[#A6C98F] shrink-0">
                      <module.icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-v-white flex items-center gap-1.5">
                        {module.title}
                        <CheckCircle2 size={14} className="text-[#124A2F] dark:text-[#A6C98F] shrink-0" />
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
                  ¿Desea probar la plataforma con su equipo?
                </span>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setIsDemoModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-v-gray hover:text-v-white transition-colors cursor-pointer"
                  >
                    Cerrar
                  </button>
                  <a href="/register" className="w-full sm:w-auto">
                    <Button variant="primary" size="sm" className="w-full font-semibold px-5 py-2">
                      Comenzar Gratis
                    </Button>
                  </a>
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
