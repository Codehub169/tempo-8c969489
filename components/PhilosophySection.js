import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, Eye, Heart } from 'lucide-react'; // Example icons for visual interest

// PhilosophySection: Presents the emotional brand pitch and core values of hueneu.
// Focuses on poetic copy and a calm, mysterious, balanced aesthetic.
// Uses react-intersection-observer for scroll-triggered animations.
const PhilosophySection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const poeticLines = [
    { text: 'We don’t just design—', icon: null, emphasis: 'we decode stories.' },
    { text: 'Transforming whispers of ideas', icon: Zap, emphasis: 'into resonant visual narratives.' },
    { text: 'Our approach is quiet, yet bold;', icon: Eye, emphasis: 'designs that speak softly but linger long.' },
    { text: 'Finding beauty in balance,', icon: Heart, emphasis: 'meaning in mystery, and color in calm.' },
  ];

  return (
    <section id="philosophy" ref={ref} className="py-20 md:py-32 bg-lightNeutral text-text">
      <div className="container mx-auto px-6 md:px-8 max-w-3xl text-center">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-display font-semibold text-primary mb-12 md:mb-16"
          >
            Why hueneu?
          </motion.h2>
          
          <div className="space-y-10 md:space-y-12">
            {poeticLines.map((line, index) => {
              const IconComponent = line.icon;
              return (
                <motion.div variants={itemVariants} key={index} className="flex flex-col items-center">
                  {IconComponent && (
                    <IconComponent className="w-10 h-10 text-accent mb-4 stroke-[1.5]" />
                  )}
                  <p className="text-2xl md:text-3xl font-sans leading-snug text-text/90">
                    {line.text}{' '}
                    <span className="font-medium text-accent block sm:inline mt-1 sm:mt-0">{line.emphasis}</span>
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.p 
            variants={itemVariants}
            className="mt-16 md:mt-20 text-xl md:text-2xl font-sans text-text/80 italic leading-relaxed"
          >
            With hueneu, your narrative finds its most evocative form, crafted with intention, warmth, and a touch of playful mystery.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default PhilosophySection;
