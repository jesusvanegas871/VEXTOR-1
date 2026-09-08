import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Badge Component
 *
 * Responsabilidad:
 * Indicador visual estandarizado de estados operativos en VEXTOR
 * (Vehículos, Conductores, Rutas, Mantenimientos, Notificaciones).
 *
 * Propiedades:
 * - variant: 'success' | 'info' | 'warning' | 'danger' | 'purple' | 'neutral' | 'primary'
 * - size: 'xs' | 'sm' | 'md'
 * - pulse: boolean (muestra un punto pulsante para estados en tiempo real)
 * - dot: boolean (muestra un punto estático)
 */
const Badge = React.forwardRef(({
  className,
  variant = 'neutral',
  size = 'sm',
  pulse = false,
  dot = false,
  children,
  ...props
}, ref) => {
  const variants = {
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    danger: 'bg-red-500/10 text-red-400 border-red-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    neutral: 'bg-v-dark-border/40 text-v-gray border-v-dark-border',
    primary: 'bg-primary/10 text-primary border-primary/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
  };

  const dotColors = {
    success: 'bg-emerald-400',
    info: 'bg-blue-400',
    warning: 'bg-amber-400',
    danger: 'bg-red-400',
    purple: 'bg-purple-400',
    neutral: 'bg-v-gray',
    primary: 'bg-primary'
  };

  const sizes = {
    xs: 'text-[10px] px-2 py-0.5 gap-1 font-bold',
    sm: 'text-xs px-2.5 py-1 gap-1.5 font-bold',
    md: 'text-sm px-3 py-1.5 gap-2 font-bold'
  };

  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full border uppercase tracking-wider transition-colors shrink-0 select-none',
        variants[variant] || variants.neutral,
        sizes[size] || sizes.sm,
        className
      )}
      {...props}
    >
      {(pulse || dot) && (
        <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
          {pulse && (
            <span
              className={cn(
                'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                dotColors[variant] || dotColors.neutral
              )}
            />
          )}
          <span
            className={cn(
              'relative inline-flex h-1.5 w-1.5 rounded-full',
              dotColors[variant] || dotColors.neutral
            )}
          />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
});

Badge.displayName = 'Badge';

export { Badge };
