import Meta from "../components/Meta";
import HeroSection from "../components/HeroSection";
import StorySection from "../components/StorySection";
import ServicesSection from "../components/ServicesSection";
import PhilosophySection from "../components/PhilosophySection";
import ContactSection from "../components/ContactSection";

export default function HomePage() {
  return (
    <>
      <Meta 
        title="hueneu - Designs that whisper loud stories."
        description="hueneu is a graphic design studio where stories find their aesthetic. We craft intentional, evocative designs that are quiet but bold, calm yet playful."
        keywords="graphic design, branding, packaging, social media, stationery, coffee table books, story-first design, hueneu, creative studio, minimal design, evocative design"
        ogImage="https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80" // Updated to use placeholder URL
        ogUrl="https://hueneu.com" // Standardized URL
        canonicalUrl="https://hueneu.com" // Standardized URL
      />
      <main className="flex flex-col items-center overflow-x-hidden">
        <HeroSection />
        <StorySection />
        <ServicesSection />
        <PhilosophySection />
        <ContactSection />
      </main>
    </>
  );
}
