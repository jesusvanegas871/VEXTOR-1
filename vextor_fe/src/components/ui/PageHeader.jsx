import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

/**
 * PageHeader Component
 *
 * Responsabilidad:
 * Encabezado de página estandarizado para la plataforma B2B VEXTOR.
 * Muestra el título, subtítulo contextual, badge de estado u operaciones y acciones principales.
 */
const PageHeader = ({
  title,
  subtitle,
  badge,
  actions,
  className
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-v-dark-soft p-5 sm:p-6 rounded-2xl border border-v-dark-border shadow-sm text-left relative overflow-hidden",
        className
      )}
    >
      {/* Background glow accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[80px] pointer-events-none -mr-20 -mt-20" />

      <div className="space-y-1 z-10 max-w-2xl">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-v-white tracking-tight">
            {title}
          </h2>
          {badge && <div className="shrink-0">{badge}</div>}
        </div>
        {subtitle && (
          <p className="text-v-gray text-xs sm:text-sm leading-relaxed font-normal">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-3 self-stretch sm:self-auto shrink-0 z-10 w-full sm:w-auto">
          {actions}
        </div>
      )}
    </motion.div>
  );
};

export { PageHeader };
