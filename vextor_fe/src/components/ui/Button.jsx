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
 * * Radio de bordes corporativo: ~8px - 10px (rounded-lg).
 * * Botón Principal: Verde oscuro VEXTOR (#124A2F) con texto blanco, hover elegante (#0B3522).
 * * Botón Secundario: Fondo blanco/off-white, borde sutil, texto verde oscuro VEXTOR, hover limpio.
 */
const Button = React.forwardRef(({ className, variant = 'primary', size = 'default', isLoading, children, disabled, ...props }, ref) => {
  const variants = {
    primary: 'bg-[#124A2F] text-white hover:bg-[#0B3522] dark:bg-[#124A2F] dark:hover:bg-[#0B3522] dark:text-white shadow-sm hover:shadow transition-all duration-200',
    secondary: 'bg-white text-[#124A2F] border border-gray-200 hover:bg-gray-50 hover:border-gray-300 dark:bg-[#12291D] dark:text-emerald-300 dark:border-[#1E3D2C] dark:hover:bg-[#1A3828] shadow-xs transition-all duration-200',
    outline: 'border border-[#124A2F]/20 bg-transparent hover:bg-[#124A2F]/5 text-[#124A2F] dark:border-[#1E3D2C] dark:text-emerald-300 dark:hover:bg-[#1E3D2C]/40 transition-all duration-200',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-white/5 text-[#647067] dark:text-gray-300 hover:text-[#124A2F] dark:hover:text-emerald-300 transition-colors duration-200',
    link: 'text-[#124A2F] dark:text-emerald-400 underline-offset-4 hover:underline font-semibold'
  };

  const sizes = {
    default: 'h-10 px-5 py-2 text-sm font-semibold',
    sm: 'h-9 px-3.5 text-xs font-semibold',
    lg: 'h-12 px-7 text-base font-semibold',
    icon: 'h-10 w-10',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#124A2F]/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.99] cursor-pointer',
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
