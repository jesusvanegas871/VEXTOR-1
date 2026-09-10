import LandingNavbar from './components/LandingNavbar';
import HeroSection from './components/HeroSection';
import ProductPreviewSection from './components/ProductPreviewSection';
import ProblemSection from './components/ProblemSection';
import FeaturesSection from './components/FeaturesSection';
import BenefitsSection from './components/BenefitsSection';
import WhyVextorSection from './components/WhyVextorSection';
import IntermediateCTA from './components/IntermediateCTA';
import ContactSection from './components/ContactSection';
import LandingFooter from './components/LandingFooter';

/**
 * Landing Page
 *
 * Responsabilidad:
 * Página comercial (pública) B2B para la conversión de empresas de transporte especial.
 *
 * Estructura:
 * * LandingNavbar: Navegación fija con accesos suaves (#inicio, #producto, #funciones, #beneficios, #por-que-vextor, #contacto).
 * * HeroSection: Mapa de Bogotá + Vehículos (/Cars/vehiculos-hero.png) + Headline B2B comercial + CTAs.
 * * ProductPreviewSection: Demostrador visual interactivo del producto (#producto).
 * * ProblemSection: Agitación de retos en transporte especial (Problema → Consecuencia → Solución).
 * * FeaturesSection: Módulos como soluciones de negocio (#funciones).
 * * BenefitsSection: Resultados y pilares de valor "Más control. Menos imprevistos." (#beneficios).
 * * WhyVextorSection: Propuesta diferenciadora B2B para transporte especial (#por-que-vextor).
 * * IntermediateCTA: Llamado a la acción estratégico para solicitar demostración.
 * * ContactSection: Formulario de generación de leads (#contacto) con FormSubmit.
 * * LandingFooter: Pie de página oficial y enlaces globales.
 */
const Landing = () => {
  return (
    <div className="min-h-screen bg-v-dark font-sans selection:bg-primary selection:text-v-dark-constant">
      <LandingNavbar />

      <main>
        <HeroSection />
        <ProductPreviewSection />
        <ProblemSection />
        <FeaturesSection />
        <BenefitsSection />
        <WhyVextorSection />
        <IntermediateCTA />
        <ContactSection />
      </main>

      <LandingFooter />
    </div>
  );
};

export default Landing;
