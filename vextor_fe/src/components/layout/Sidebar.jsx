import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Truck,
  Users,
  MapPin,
  Wrench,
  BarChart3,
  Settings,
  ChevronLeft,
  Menu,
  X,
  LogOut,
  Radio
} from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { showConfirm } from '../../utils/sweetalert';

/**
 * Sidebar Component
 *
 * Responsabilidad:
 * Navegación lateral principal de la plataforma SaaS B2B VEXTOR.
 * Muestra marca con alto protagonismo, agrupaciones operativas B2B,
 * estados activos con indicadores de pulso y perfil de usuario.
 */
const adminMenuGroups = [
  {
    titleKey: 'sidebar.groupOperation',
    titleDefault: 'MONITOREO Y OPERACIÓN',
    items: [
      { path: '/dashboard', labelKey: 'sidebar.dashboard', labelDefault: 'Dashboard', icon: LayoutDashboard },
      { path: '/routes', labelKey: 'sidebar.routes', labelDefault: 'Rutas y Rastreo', icon: MapPin },
    ]
  },
  {
    titleKey: 'sidebar.groupFleet',
    titleDefault: 'GESTIÓN DE FLOTA',
    items: [
      { path: '/vehicles', labelKey: 'sidebar.vehicles', labelDefault: 'Vehículos', icon: Truck },
      { path: '/drivers', labelKey: 'sidebar.drivers', labelDefault: 'Conductores', icon: Users },
      { path: '/maintenance', labelKey: 'sidebar.maintenance', labelDefault: 'Mantenimiento', icon: Wrench },
    ]
  },
  {
    titleKey: 'sidebar.groupAnalytics',
    titleDefault: 'ANALÍTICA Y SISTEMA',
    items: [
      { path: '/reports', labelKey: 'sidebar.reports', labelDefault: 'Reportes', icon: BarChart3 },
      { path: '/settings', labelKey: 'sidebar.settings', labelDefault: 'Configuración', icon: Settings },
    ]
  }
];

const driverMenuGroups = [
  {
    titleKey: 'sidebar.groupOperation',
    titleDefault: 'OPERACIÓN CONDUCTOR',
    items: [
      { path: '/driver/my-routes', labelText: 'Mis Rutas Asignadas', icon: MapPin },
      { path: '/settings', labelText: 'Configuración de Cuenta', icon: Settings },
    ]
  }
];

const Sidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const { user, logout } = useAuth();
  const isConductor = user?.role === 'rol-conductor' || user?.role === 'Conductor';
  const menuGroups = isConductor ? driverMenuGroups : adminMenuGroups;
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = width < 1024;

  const sidebarVariants = {
    expanded: { width: 270, x: 0 },
    collapsed: { width: 80, x: 0 },
    mobileOpen: { width: 285, x: 0 },
    mobileClosed: { x: -340 }
  };

  const currentVariant = isMobile
    ? (isMobileOpen ? 'mobileOpen' : 'mobileClosed')
    : (isCollapsed ? 'collapsed' : 'expanded');

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        initial={false}
        animate={currentVariant}
        variants={sidebarVariants}
        transition={{ type: 'tween', duration: 0.25, ease: 'easeInOut' }}
        className={cn(
          "fixed top-0 left-0 z-50 h-screen bg-v-dark-soft border-r border-v-dark-border max-w-[85vw] lg:max-w-none shadow-2xl flex flex-col justify-between",
          isMobile ? "w-72" : (isCollapsed ? "w-20" : "w-68")
        )}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header & Branding */}
          <div className="h-22 flex flex-col justify-center px-4 border-b border-v-dark-border/80 shrink-0 relative bg-v-dark/30">
            <div className="flex items-center justify-between">
              <div className={cn("flex items-center gap-2 overflow-hidden transition-all duration-300", isCollapsed && !isMobile ? "w-10" : "w-auto")}>
                <Logo
                  variant={isCollapsed && !isMobile ? "iso" : "full"}
                  size={isCollapsed && !isMobile ? "sm" : "md"}
                />
              </div>

              <button
                onClick={() => isMobileOpen ? setIsMobileOpen(false) : setIsCollapsed(!isCollapsed)}
                className="p-2 rounded-xl hover:bg-v-dark-border/60 text-v-gray hover:text-v-white transition-colors cursor-pointer shrink-0"
                title={isCollapsed ? "Expandir navegación" : "Colapsar navegación"}
              >
                {isMobileOpen ? <X size={20} /> : (isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />)}
              </button>
            </div>

            {/* Sub-label under logo for high-end SaaS feel */}
            {(!isCollapsed || isMobile) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-1.5 flex items-center justify-between"
              >
                <Badge variant="primary" size="xs" pulse className="normal-case font-mono text-[9px]">
                  Flota Operativa
                </Badge>
                <span className="text-[10px] text-v-gray font-mono font-medium">v2.4 Enterprise</span>
              </motion.div>
            )}
          </div>

          {/* Navigation Items Grouped */}
          <nav className="flex-1 py-4 px-3 space-y-6 overflow-y-auto custom-scrollbar">
            {menuGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1.5">
                {(!isCollapsed || isMobile) && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-3 text-[10px] font-black text-v-gray/80 uppercase tracking-widest font-mono"
                  >
                    {t(group.titleKey, group.titleDefault)}
                  </motion.p>
                )}

                {group.items.map((item) => {
                  const label = item.labelText || t(item.labelKey, item.labelDefault);
                  const isActive = location.pathname === item.path;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => isMobile && setIsMobileOpen(false)}
                      className={({ isActive: linkActive }) => cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative text-sm font-semibold",
                        linkActive
                          ? "bg-primary/10 text-primary shadow-[0_0_15px_rgba(16,185,129,0.1)] border border-primary/20"
                          : "text-v-gray hover:text-v-white hover:bg-v-dark-border/50 border border-transparent",
                        isCollapsed && !isMobile ? "justify-center px-0" : ""
                      )}
                      title={isCollapsed && !isMobile ? label : undefined}
                    >
                      <item.icon
                        size={20}
                        className={cn(
                          "shrink-0 transition-transform duration-200",
                          isActive ? "text-primary scale-110" : "group-hover:scale-110 group-hover:text-v-white"
                        )}
                      />

                      {(!isCollapsed || isMobile) && (
                        <span className="truncate whitespace-nowrap tracking-wide">
                          {label}
                        </span>
                      )}

                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-r-full"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                    </NavLink>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* User & Session Footer */}
          <div className="p-3.5 border-t border-v-dark-border bg-v-dark/40 shrink-0">
            {(!isCollapsed || isMobile) ? (
              <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-v-dark-soft border border-v-dark-border/80">
                <div className="flex items-center gap-2.5 min-w-0">
                  {user?.photo ? (
                    <img src={user.photo} alt={user.name} className="h-9 w-9 rounded-lg object-cover border border-primary/20 shrink-0" />
                  ) : (
                    <div className="h-9 w-9 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                      {user?.avatar || 'AD'}
                    </div>
                  )}
                  <div className="min-w-0 text-left">
                    <p className="text-xs font-bold text-v-white truncate leading-tight">{user?.name || 'Administrador'}</p>
                    <p className="text-[10px] text-v-gray truncate mt-0.5 font-medium">{user?.email || 'admin@vextor.com'}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    showConfirm(
                      t('navbar.logoutConfirm'),
                      t('navbar.logoutText'),
                      t('navbar.logoutYes'),
                      t('common.cancel'),
                      true
                    ).then((result) => {
                      if (result.isConfirmed) {
                        logout();
                        navigate('/login');
                      }
                    });
                  }}
                  className="p-2 rounded-lg text-v-gray hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer shrink-0"
                  title={t('sidebar.logout')}
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  showConfirm(
                    t('navbar.logoutConfirm'),
                    t('navbar.logoutText'),
                    t('navbar.logoutYes'),
                    t('common.cancel'),
                    true
                  ).then((result) => {
                    if (result.isConfirmed) {
                      logout();
                      navigate('/login');
                    }
                  });
                }}
                className="flex items-center justify-center w-full py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                title={t('sidebar.logout')}
              >
                <LogOut size={20} />
              </button>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
