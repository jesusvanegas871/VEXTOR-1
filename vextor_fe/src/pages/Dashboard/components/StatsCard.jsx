import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { Badge } from '../../../components/ui/Badge';

/**
 * StatsCard Component
 *
 * Responsabilidad:
 * Mostrar indicadores clave de rendimiento (KPIs) en el Centro de Control VEXTOR,
 * con jerarquía visual de nivel B2B SaaS empresarial, badges de tendencia y microinteracciones.
 */
const StatsCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  variant = 'primary',
  delay = 0
}) => {
  const iconGlows = {
    primary: 'bg-primary/10 text-primary border-primary/20 group-hover:bg-primary group-hover:text-v-dark-constant',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20 group-hover:bg-amber-500 group-hover:text-white',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20 group-hover:bg-purple-500 group-hover:text-white'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="bg-v-dark-soft border border-v-dark-border p-5 sm:p-6 rounded-2xl hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group relative overflow-hidden text-left"
    >
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all pointer-events-none -mr-10 -mt-10" />

      <div className="flex items-start justify-between gap-3 mb-3">
        <div className={cn(
          "h-12 w-12 rounded-2xl border flex items-center justify-center transition-all duration-300 shadow-sm shrink-0",
          iconGlows[variant] || iconGlows.primary
        )}>
          <Icon size={22} className="transition-transform group-hover:scale-110" />
        </div>

        {trend && (
          <div className="shrink-0">
            {trendValue !== null && trendValue !== undefined ? (
              <Badge
                variant={trend === 'up' ? 'success' : 'danger'}
                size="xs"
                className="font-mono"
              >
                {trend === 'up' ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                <span>{trendValue}%</span>
              </Badge>
            ) : (
              <Badge variant="neutral" size="xs" className="font-mono text-[9px]">
                Operativo
              </Badge>
            )}
          </div>
        )}
      </div>

      <div className="space-y-1 relative z-10">
        <p className="text-v-gray text-xs font-bold uppercase tracking-wider font-mono">
          {title}
        </p>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-v-white tracking-tight">
          {value}
        </h3>
        {subtitle && (
          <p className="text-[11px] text-v-gray font-medium mt-1 leading-snug">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default StatsCard;
