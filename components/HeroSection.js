import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
// import AnimatedLogo from './AnimatedLogo'; // To be implemented later
// import ScrollIndicator from './ScrollIndicator'; // To be implemented later

const HeroSection = () => {
  // Placeholder for AnimatedLogo component
  const AnimatedLogoPlaceholder = () => (
    <div className="text-6xl md:text-8xl font-display font-semibold text-brand-text tracking-tight animate-logo-reveal">
      hueneu
      <span className="text-brand-accent">.</span>
    </div>
  );

  // Placeholder for ScrollIndicator component
  const ScrollIndicatorPlaceholder = () => (
    <motion.div 
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-brand-primary hover:text-brand-accent transition-colors duration-300 cursor-pointer"
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      onClick={() => window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' })}
      title="Scroll down"
    >
      <span className="text-sm font-sans mb-1 tracking-wider">explore</span>
      <ArrowDown size={24} />
    </motion.div>
  );

  return (
    <section 
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center bg-brand-background text-brand-text relative p-8 overflow-hidden"
    >
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* <AnimatedLogo /> */} 
        <AnimatedLogoPlaceholder />
        
        <motion.h1 
          className="mt-6 text-2xl md:text-3xl font-display text-brand-primary tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          Where stories find their aesthetic.
        </motion.h1>
        <motion.p 
          className="mt-3 text-base md:text-lg font-sans text-brand-text max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          Designs that whisper loud stories.
        </motion.p>
      </motion.div>
      
      {/* <ScrollIndicator /> */} 
      <ScrollIndicatorPlaceholder />
    </section>
  );
};

export default HeroSection;
