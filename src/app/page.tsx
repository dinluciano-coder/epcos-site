import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ClientsMarquee from "@/components/ClientsMarquee";
import AboutSection from "@/components/AboutSection";
import ScannerSection from "@/components/ScannerSection";
import GlassCardsSection from "@/components/GlassCardsSection";
import ProjectsSection from "@/components/ProjectsSection";
import InfrastructureSection from "@/components/InfrastructureSection";
import ServicesSection from "@/components/ServicesSection";
import CareersSection from "@/components/CareersSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import ClientLayout from "@/components/ClientLayout";
import ParticleBackground from "@/components/ParticleBackground";

export default function Home() {
  return (
    <ClientLayout>
      <Header />
      {/* Global Particle Background */}
      <ParticleBackground />
      
      <main className="relative z-10 w-full overflow-hidden bg-transparent">
        <HeroSection />
        <ClientsMarquee />
        <AboutSection />
        <GlassCardsSection />
        <ProjectsSection />
        <InfrastructureSection />
        <ServicesSection />
        <ScannerSection />
        <CareersSection />
        <ContactSection />
        <FooterSection />
      </main>
    </ClientLayout>
  );
}
