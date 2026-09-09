import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../../../components/ui/Logo';

/**
 * LandingFooter Component
 *
 * Responsabilidad:
 * Pie de página oficial de VEXTOR con id="contacto", enlaces navegables, datos corporativos y copyright.
 */
const LandingFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contacto" className="bg-v-dark-soft border-t border-v-dark-border pt-16 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">

          {/* MARCA E INFORMACIÓN */}
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="inline-block mb-5">
              <Logo size="sm" />
            </Link>
            <p className="text-v-gray text-sm leading-relaxed mb-6">
              Plataforma tecnológica especializada en la gestión operativa, control de flota y monitoreo de transporte para empresas modernas.
            </p>
          </div>

          {/* NAVEGACIÓN RÁPIDA */}
          <div>
            <h4 className="text-v-white font-bold text-sm uppercase tracking-wider mb-5">Navegación</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#inicio" className="text-v-gray hover:text-primary transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#funciones" className="text-v-gray hover:text-primary transition-colors">
                  Funciones
                </a>
              </li>
              <li>
                <a href="#beneficios" className="text-v-gray hover:text-primary transition-colors">
                  Beneficios
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-v-gray hover:text-primary transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* ACCESO A PLATAFORMA */}
          <div>
            <h4 className="text-v-white font-bold text-sm uppercase tracking-wider mb-5">Plataforma</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/login" className="text-v-gray hover:text-primary transition-colors">
                  Iniciar Sesión
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-v-gray hover:text-primary transition-colors">
                  Crear Cuenta
                </Link>
              </li>
              <li>
                <span className="text-v-gray/70">Gestión de Vehículos</span>
              </li>
              <li>
                <span className="text-v-gray/70">Mantenimiento Preventivo</span>
              </li>
            </ul>
          </div>

          {/* INFORMACIÓN DE CONTACTO */}
          <div>
            <h4 className="text-v-white font-bold text-sm uppercase tracking-wider mb-5">Contacto</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 text-v-gray">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>contacto@vextor.com</span>
              </li>
              <li className="flex items-center gap-3 text-v-gray">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+57 (601) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-v-gray">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Bogotá, Colombia</span>
              </li>
            </ul>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="pt-8 border-t border-v-dark-border/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-v-gray">
          <p>© {currentYear} VEXTOR. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-primary cursor-pointer transition-colors">Términos y Condiciones</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Política de Privacidad</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default LandingFooter;
