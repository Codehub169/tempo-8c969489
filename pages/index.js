import Head from "next/head";
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
        ogImage="/og-image.png" // Replace with actual path to OG image
        url="https://www.hueneu.com" // Replace with actual domain
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
