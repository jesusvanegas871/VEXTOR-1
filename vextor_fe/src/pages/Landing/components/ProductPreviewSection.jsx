import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck,
  Users,
  Route,
  Wrench,
  Bell,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  MapPin,
  Calendar
} from 'lucide-react';

/**
 * ProductPreviewSection Component
 *
 * Responsabilidad:
 * Sección de demostración visual e interactiva del producto VEXTOR.
 * Permite al cliente B2B visualizar el aspecto y flujo de trabajo real de su operación.
 */
const ProductPreviewSection = () => {
  const [activeTab, setActiveTab] = useState('vehicles');

  const tabs = [
    { id: 'vehicles', name: 'Vehículos', icon: Truck, badge: 'Flota' },
    { id: 'drivers', name: 'Conductores', icon: Users, badge: 'Personal' },
    { id: 'routes', name: 'Rutas', icon: Route, badge: 'Itinerarios' },
    { id: 'maintenance', name: 'Mantenimiento', icon: Wrench, badge: 'Taller' },
    { id: 'alerts', name: 'Alertas', icon: Bell, badge: 'En Vivo' },
    { id: 'reports', name: 'Reportes', icon: BarChart3, badge: 'KPIs' },
  ];

  return (
    <section id="producto" className="py-20 lg:py-28 bg-v-dark-soft/40 border-y border-v-dark-border/60 relative overflow-hidden transition-colors duration-300">
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-3xl rounded-full pointer-events-none -z-0" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* ENCABEZADO DE LA SECCIÓN */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4"
          >
            <ShieldCheck size={16} />
            Demostración de Plataforma
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-v-white mb-6 tracking-tight leading-tight"
          >
            Todo el control de su operación, <br className="hidden sm:inline" />
            en <span className="text-primary">una sola plataforma.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-v-gray leading-relaxed max-w-2xl mx-auto"
          >
            Visualice cómo VEXTOR integra sus módulos operativos en una interfaz intuitiva diseñada para agilizar la toma de decisiones.
          </motion.p>
        </div>

        {/* TAB SELECTOR / PESTAÑAS */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-v-dark-constant shadow-md shadow-primary/20 scale-[1.02]'
                    : 'bg-v-dark border border-v-dark-border text-v-gray hover:text-v-white hover:border-primary/40'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-v-dark-constant' : 'text-primary'} />
                <span>{tab.name}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    isActive ? 'bg-v-dark-constant/20 text-v-dark-constant' : 'bg-v-dark-soft text-v-gray'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* CONTAINER MOCKUP DEL DASHBOARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-v-dark border border-v-dark-border rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl relative overflow-hidden"
        >
          {/* TOP BAR SIMULATOR */}
          <div className="flex items-center justify-between pb-4 sm:pb-6 mb-6 border-b border-v-dark-border/80 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-xs font-mono text-v-gray pl-2 border-l border-v-dark-border">
                app.vextor.com / modulo-operativo
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Sistema Operativo VEXTOR activo
              </span>
            </div>
          </div>

          {/* TAB CONTENT PANEL */}
          <div className="min-h-[380px] sm:min-h-[420px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {/* VISTA VEHÍCULOS */}
              {activeTab === 'vehicles' && (
                <motion.div
                  key="vehicles"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-v-white">Hoja de Vida y Estado de Flota</h3>
                      <p className="text-xs sm:text-sm text-v-gray">Control técnico y documental de cada unidad de transporte especial.</p>
                    </div>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20 self-start sm:self-auto">
                      18 Vehículos Registrados
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Tarjeta 1 */}
                    <div className="p-4 rounded-xl bg-v-dark-soft border border-v-dark-border hover:border-primary/40 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-sm font-extrabold text-v-white bg-v-dark px-2.5 py-1 rounded border border-v-dark-border">
                          BUS-102 (WHL-452)
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          En Ruta
                        </span>
                      </div>
                      <p className="text-xs text-v-gray font-medium mb-3">Chevrolet NHR 2022 • Capacidad 24 pas</p>
                      <div className="space-y-1.5 text-xs text-v-gray">
                        <div className="flex justify-between">
                          <span>SOAT:</span>
                          <span className="text-emerald-400 font-semibold flex items-center gap-1"><CheckCircle2 size={12}/> Vigente (240 días)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tecno-mecánica:</span>
                          <span className="text-emerald-400 font-semibold flex items-center gap-1"><CheckCircle2 size={12}/> Vigente (180 días)</span>
                        </div>
                      </div>
                    </div>

                    {/* Tarjeta 2 */}
                    <div className="p-4 rounded-xl bg-v-dark-soft border border-v-dark-border hover:border-primary/40 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-sm font-extrabold text-v-white bg-v-dark px-2.5 py-1 rounded border border-v-dark-border">
                          VAN-205 (SXM-891)
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          Mantenimiento
                        </span>
                      </div>
                      <p className="text-xs text-v-gray font-medium mb-3">Mercedes Sprinter 2023 • Capacidad 19 pas</p>
                      <div className="space-y-1.5 text-xs text-v-gray">
                        <div className="flex justify-between">
                          <span>SOAT:</span>
                          <span className="text-emerald-400 font-semibold flex items-center gap-1"><CheckCircle2 size={12}/> Vigente</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Revisión Aceite:</span>
                          <span className="text-amber-400 font-semibold flex items-center gap-1"><Clock size={12}/> Taller programado</span>
                        </div>
                      </div>
                    </div>

                    {/* Tarjeta 3 */}
                    <div className="p-4 rounded-xl bg-v-dark-soft border border-v-dark-border hover:border-primary/40 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-sm font-extrabold text-v-white bg-v-dark px-2.5 py-1 rounded border border-v-dark-border">
                          MIC-304 (THK-109)
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Disponible
                        </span>
                      </div>
                      <p className="text-xs text-v-gray font-medium mb-3">Renault Master 2021 • Capacidad 16 pas</p>
                      <div className="space-y-1.5 text-xs text-v-gray">
                        <div className="flex justify-between">
                          <span>Póliza Contractual:</span>
                          <span className="text-emerald-400 font-semibold flex items-center gap-1"><CheckCircle2 size={12}/> Al día</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Siguiente Servicio:</span>
                          <span className="text-v-white font-medium">Ruta Empresarial 14:00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* VISTA CONDUCTORES */}
              {activeTab === 'drivers' && (
                <motion.div
                  key="drivers"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-v-white">Expediente de Conductores y Asignaciones</h3>
                      <p className="text-xs sm:text-sm text-v-gray">Asegure que su personal cuente con licencias vigentes y asignación clara.</p>
                    </div>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20 self-start sm:self-auto">
                      24 Conductores Activos
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-v-dark-soft border border-v-dark-border flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                          CR
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-v-white">Carlos Rodríguez</h4>
                          <p className="text-xs text-v-gray">Licencia C2 • Vence: Nov 2026</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                          Asignado: BUS-102
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-v-dark-soft border border-v-dark-border flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                          MG
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-v-white">Mario Gómez</h4>
                          <p className="text-xs text-v-gray">Licencia C3 • Vence: Ago 2025</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                          Asignado: VAN-205
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* VISTA RUTAS */}
              {activeTab === 'routes' && (
                <motion.div
                  key="routes"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-v-white">Programación e Itinerarios de Transporte</h3>
                      <p className="text-xs sm:text-sm text-v-gray">Control de origen, destino y tiempos de cumplimiento de cada trayecto.</p>
                    </div>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20 self-start sm:self-auto">
                      12 Rutas en Programación Hoy
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-v-dark-soft border border-v-dark-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-v-white">Ruta Empresarial Zona Franca - Suba</h4>
                          <p className="text-xs text-v-gray">Vehículo: BUS-102 • Conductor: Carlos Rodríguez</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-v-gray flex items-center gap-1"><Clock size={14}/> 06:00 AM - 07:30 AM</span>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">En Curso</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-v-dark-soft border border-v-dark-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-v-white">Ruta Escolar Col. San José - Chapinero</h4>
                          <p className="text-xs text-v-gray">Vehículo: MIC-304 • Conductor: Andrés Pérez</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-v-gray flex items-center gap-1"><Clock size={14}/> 02:15 PM - 03:45 PM</span>
                        <span className="px-2.5 py-1 rounded-full bg-v-dark text-v-gray font-bold border border-v-dark-border">Programada</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* VISTA MANTENIMIENTO */}
              {activeTab === 'maintenance' && (
                <motion.div
                  key="maintenance"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-v-white">Plan Preventivo y Control de Taller</h3>
                      <p className="text-xs sm:text-sm text-v-gray">Evite varadas imprevistas mediante mantenimiento preventivo automatizado.</p>
                    </div>
                    <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20 self-start sm:self-auto">
                      1 Servicio Programado Esta Semana
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-v-dark-soft border border-v-dark-border space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                          <Wrench size={14} /> Cambio de Aceite y Filtros
                        </span>
                        <span className="text-xs font-mono text-v-white font-bold">VAN-205</span>
                      </div>
                      <p className="text-sm font-bold text-v-white">Programado a los 45.000 KM (Actual: 44.820 KM)</p>
                      <p className="text-xs text-v-gray">Taller Autorizado VEXTOR • Estimado 2 horas de servicio</p>
                    </div>

                    <div className="p-4 rounded-xl bg-v-dark-soft border border-v-dark-border space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                          <CheckCircle2 size={14} /> Inspección de Frenos
                        </span>
                        <span className="text-xs font-mono text-v-white font-bold">BUS-102</span>
                      </div>
                      <p className="text-sm font-bold text-v-white">Completado exitosamente el 12 de Febrero</p>
                      <p className="text-xs text-v-gray">Próxima revisión preventiva: Mayo 2025</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* VISTA ALERTAS */}
              {activeTab === 'alerts' && (
                <motion.div
                  key="alerts"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-v-white">Centro de Alertas y Notificaciones Preventivas</h3>
                      <p className="text-xs sm:text-sm text-v-gray">Reciba avisos automáticos antes de que ocurran vencimientos o imprevistos.</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 self-start sm:self-auto">
                      Operación Sin Riesgos Documentales
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                      <AlertTriangle className="text-amber-400 shrink-0 mt-0.5" size={20} />
                      <div>
                        <h4 className="text-sm font-bold text-v-white">Aviso de Vencimiento SOAT Próximo (15 Días)</h4>
                        <p className="text-xs text-v-gray mt-0.5">El SOAT de la unidad CAM-104 vencerá en 15 días. Haga clic para renovar digitalmente.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 flex items-start gap-3">
                      <Bell className="text-primary shrink-0 mt-0.5" size={20} />
                      <div>
                        <h4 className="text-sm font-bold text-v-white">Notificación de Mantenimiento Preventivo</h4>
                        <p className="text-xs text-v-gray mt-0.5">La unidad VAN-205 está a 180 KM de cumplir el ciclo de revisión de pastillas de freno.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* VISTA REPORTES */}
              {activeTab === 'reports' && (
                <motion.div
                  key="reports"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-v-white">Indicadores Operativos y Toma de Decisiones</h3>
                      <p className="text-xs sm:text-sm text-v-gray">Información consolidada de disponibilidad de flota, eficiencia e itinerarios.</p>
                    </div>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20 self-start sm:self-auto">
                      Actualización en Tiempo Real
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-v-dark-soft border border-v-dark-border text-center">
                      <span className="text-xs text-v-gray font-medium">Disponibilidad de Flota</span>
                      <p className="text-2xl font-extrabold text-emerald-400 mt-1">94.4%</p>
                      <span className="text-[10px] text-v-gray">17 de 18 unidades operativas</span>
                    </div>

                    <div className="p-4 rounded-xl bg-v-dark-soft border border-v-dark-border text-center">
                      <span className="text-xs text-v-gray font-medium">Cumplimiento de Rutas</span>
                      <p className="text-2xl font-extrabold text-primary mt-1">98.2%</p>
                      <span className="text-[10px] text-v-gray">340 itinerarios este mes</span>
                    </div>

                    <div className="p-4 rounded-xl bg-v-dark-soft border border-v-dark-border text-center">
                      <span className="text-xs text-v-gray font-medium">Doc. al Día</span>
                      <p className="text-2xl font-extrabold text-v-white mt-1">100%</p>
                      <span className="text-[10px] text-v-gray">0 sanciones o faltas</span>
                    </div>

                    <div className="p-4 rounded-xl bg-v-dark-soft border border-v-dark-border text-center">
                      <span className="text-xs text-v-gray font-medium">Eficiencia Preventiva</span>
                      <p className="text-2xl font-extrabold text-emerald-400 mt-1">+35%</p>
                      <span className="text-[10px] text-v-gray">Reducción de costos correctivos</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* BARRA INFERIOR DE CONVERSIÓN */}
            <div className="mt-8 pt-6 border-t border-v-dark-border/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs sm:text-sm text-v-gray text-center sm:text-left font-medium">
                ¿Desea ver cómo funcionaría VEXTOR adaptado al número de vehículos de su empresa?
              </span>
              <a href="#contacto" className="shrink-0 w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-primary text-v-dark-constant font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl hover:bg-primary-hover transition-colors flex items-center justify-center gap-2">
                  <span>Solicitar prueba personalizada</span>
                  <ChevronRight size={16} />
                </button>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ProductPreviewSection;
