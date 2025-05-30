import { motion } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';
import ScrollIndicator from './ScrollIndicator';

const HeroSection = () => {
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
        <AnimatedLogo />
        
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
      
      <ScrollIndicator />
    </section>
  );
};

export default HeroSection;
