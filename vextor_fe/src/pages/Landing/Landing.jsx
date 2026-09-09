import LandingNavbar from './components/LandingNavbar';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import FeaturesSection from './components/FeaturesSection';
import CTASection from './components/CTASection';
import LandingFooter from './components/LandingFooter';

/**
 * Landing Page
 *
 * Responsabilidad:
 * Página web de marketing (pública) para la conversión de empresas de transporte especial.
 *
 * Estructura:
 * * LandingNavbar: Navegación global (#inicio, #funciones, #beneficios, #contacto).
 * * HeroSection: Propuesta de valor principal con imágenes transparentes de vehículos.
 * * ProblemSection: Agitación de puntos de dolor operativos y posicionamiento VEXTOR.
 * * FeaturesSection: 6 funciones clave (#funciones) y beneficios reales (#beneficios).
 * * CTASection: Llamada a la acción final hacia /register.
 * * LandingFooter: Información corporativa y contacto (#contacto).
 */
const Landing = () => {
  return (
    <div className="min-h-screen bg-v-dark font-sans selection:bg-primary selection:text-v-dark-constant">
      <LandingNavbar />

      <main>
        <HeroSection />
        <ProblemSection />
        <FeaturesSection />
        <CTASection />
      </main>

      <LandingFooter />
    </div>
  );
};

export default Landing;
