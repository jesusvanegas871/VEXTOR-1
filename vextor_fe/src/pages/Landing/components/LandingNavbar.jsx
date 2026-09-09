import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Logo } from '../../../components/ui/Logo';
import { ThemeToggle } from '../../../components/ui/ThemeToggle';

/**
 * LandingNavbar Component
 *
 * Responsabilidad:
 * Barra de navegación superior para la página de aterrizaje (Landing Page).
 *
 * Funcionalidades:
 * * Logo VEXTOR con enlace a inicio.
 * * Enlaces de navegación suave (#inicio, #funciones, #beneficios, #contacto).
 * * Selector de modo oscuro (ThemeToggle).
 * * Enlaces a autenticación (/login, /register).
 * * Menú hamburguesa responsive para dispositivos móviles.
 */
const LandingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Funciones', href: '#funciones' },
    { name: 'Beneficios', href: '#beneficios' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        isScrolled
          ? 'bg-v-dark-soft/95 backdrop-blur-md border-b border-v-dark-border shadow-xs'
          : 'bg-v-dark-soft/80 backdrop-blur-xs border-b border-v-dark-border/50'
      }`}
    >
      <div className="container mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
        {/* IZQUIERDA: Logo VEXTOR */}
        <Link to="/" className="flex items-center group">
          <Logo size="sm" className="group-hover:opacity-90 transition-opacity" />
        </Link>

        {/* CENTRO: Links de navegación */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-v-white/80 hover:text-primary transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* DERECHA: Acciones (ThemeToggle, Login, Register) */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="ghost" className="text-sm font-semibold text-v-white hover:text-primary px-4">
              Iniciar Sesión
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="primary" className="text-sm font-bold shadow-sm px-5">
              Crear Cuenta
            </Button>
          </Link>
        </div>

        {/* Menú Móvil & Theme Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            aria-label="Toggle Navigation Menu"
            className="text-v-white p-2 rounded-lg hover:bg-v-dark/50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Overlay Menú Móvil */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-v-dark-soft border-b border-v-dark-border overflow-hidden shadow-lg"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-semibold text-v-white hover:text-primary transition-colors py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-v-dark-border my-2" />
              <div className="flex flex-col gap-3">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-center">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full justify-center font-bold">
                    Crear Cuenta
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default LandingNavbar;
