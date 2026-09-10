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
      'bg-[#124A2F] text-white hover:bg-[#0B3522] active:bg-[#08281A] dark:bg-[#124A2F] dark:hover:bg-[#0B3522] dark:text-white shadow-sm hover:shadow-md hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 border border-transparent font-semibold',
    secondary:
      'bg-white text-[#124A2F] border border-[#124A2F]/20 hover:bg-[#124A2F]/5 hover:border-[#124A2F]/40 dark:bg-[#12291D] dark:text-[#A6C98F] dark:border-[#1E3D2C] dark:hover:bg-[#1A3828] dark:hover:border-[#A6C98F]/40 shadow-xs hover:shadow hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 font-semibold',
    outline:
      'border border-[#124A2F]/30 bg-transparent hover:bg-[#124A2F]/10 text-[#124A2F] dark:border-[#1E3D2C] dark:text-[#A6C98F] dark:hover:bg-[#1E3D2C]/60 transition-all duration-200 font-semibold',
    ghost:
      'bg-transparent hover:bg-[#124A2F]/5 dark:hover:bg-white/5 text-[#647067] dark:text-gray-300 hover:text-[#124A2F] dark:hover:text-[#A6C98F] transition-colors duration-200 font-semibold',
    link:
      'text-[#124A2F] dark:text-[#A6C98F] underline-offset-4 hover:underline font-semibold transition-colors duration-200'
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
        'inline-flex items-center justify-center rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#124A2F]/40 dark:focus-visible:ring-[#A6C98F]/40 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.99] cursor-pointer tracking-tight',
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
