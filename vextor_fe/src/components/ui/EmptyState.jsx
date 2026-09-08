import { motion } from 'framer-motion';
import { Inbox } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * EmptyState Component
 *
 * Responsabilidad:
 * Estado vacío profesional y reutilizable para vistas B2B cuando no se encuentran
 * registros, resultados de búsqueda o datos filtrados en VEXTOR.
 */
const EmptyState = ({
  icon: Icon = Inbox,
  title = "No hay datos para mostrar",
  description = "No se encontraron registros que coincidan con la búsqueda o filtro seleccionado.",
  action,
  className
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex flex-col items-center justify-center min-h-[320px] p-8 sm:p-12 text-center bg-v-dark-soft border border-v-dark-border rounded-2xl relative overflow-hidden",
        className
      )}
    >
      <div className="relative mb-4 flex items-center justify-center">
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl transform scale-150" />
        <div className="relative h-16 w-16 rounded-2xl bg-v-dark border border-v-dark-border flex items-center justify-center text-primary shadow-lg">
          <Icon size={32} />
        </div>
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-v-white mb-1.5 tracking-tight">
        {title}
      </h3>

      <p className="text-xs sm:text-sm text-v-gray max-w-md leading-relaxed mb-6 font-medium">
        {description}
      </p>

      {action && (
        <div className="shrink-0 animate-in fade-in zoom-in duration-300">
          {action}
        </div>
      )}
    </motion.div>
  );
};

export { EmptyState };
