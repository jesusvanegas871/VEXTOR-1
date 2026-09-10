import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

/**
 * Button Component
 *
 * Responsabilidad:
 * Proporcionar un elemento de acción interactivo con múltiples variantes visuales y estados.
 *
 * Especificaciones de Marca VEXTOR:
 * * Radio de bordes corporativo: 8px - 10px (rounded-lg).
 * * Botón Principal CTA: Verde oscuro VEXTOR (#124A2F) con texto blanco, hover profundo (#0B3522), elevación sutil.
 * * Botón Secundario CTA: Fondo contrastado, borde corporativo sutil, texto verde VEXTOR, micro-interacción refinada.
 */
const Button = React.forwardRef(({ className, variant = 'primary', size = 'default', isLoading, children, disabled, ...props }, ref) => {
  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary-hover active:bg-primary-dark shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/25 hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 border border-transparent font-semibold',
    secondary:
      'bg-v-dark-soft text-v-white border border-v-dark-border hover:bg-v-dark hover:border-primary/35 dark:hover:bg-white/5 shadow-xs hover:shadow-sm hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 font-semibold',
    outline:
      'border border-primary/35 bg-transparent hover:bg-primary/8 text-primary dark:hover:bg-primary/15 transition-all duration-200 font-semibold',
    ghost:
      'bg-transparent hover:bg-primary/8 dark:hover:bg-white/5 text-v-gray hover:text-primary transition-colors duration-200 font-semibold',
    link:
      'text-primary underline-offset-4 hover:underline font-semibold transition-colors duration-200',
    success:
      'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 shadow-sm shadow-emerald-600/20 transition-all duration-200 border border-transparent font-semibold',
    danger:
      'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm shadow-red-600/20 transition-all duration-200 border border-transparent font-semibold'
  };

  const sizes = {
    default: 'h-10 px-5 py-2 text-sm',
    sm: 'h-9 px-3.5 text-xs',
    lg: 'h-12 px-7 text-base',
    icon: 'h-10 w-10',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-v-dark disabled:pointer-events-none disabled:opacity-45 disabled:saturate-50 active:scale-[0.99] cursor-pointer tracking-tight',
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : null}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
