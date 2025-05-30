import { motion } from 'framer-motion';
import { Award, Package, Share2, Printer, BookOpen, Sparkles, ChevronRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

// ServicesSection: Displays the core services offered by hueneu.
// Each service has an icon, title, and playful microcopy revealed on hover.
// Uses react-intersection-observer for scroll-triggered animations.
const ServicesSection = () => {
  const services = [
    {
      icon: Award,
      title: 'Branding',
      description: 'Identities that echo your essence.',
      microcopy: 'Logos that live, palettes that pop.',
    },
    {
      icon: Package,
      title: 'Packaging',
      description: 'Designs that beg to be unboxed.',
      microcopy: 'Packaging, but make it poetic.',
    },
    {
      icon: Share2,
      title: 'Social Media',
      description: 'Stories that scroll and stop.',
      microcopy: 'Content that connects, not just collects.',
    },
    {
      icon: Printer,
      title: 'Stationery',
      description: 'Tangible touches, beautifully branded.',
      microcopy: 'Paper goods with personality.',
    },
    {
      icon: BookOpen,
      title: 'Coffee Table Books',
      description: 'Narratives crafted for keeps.',
      microcopy: 'Your story, bound beautifully.',
    },
    {
      icon: Sparkles,
      title: 'Creative Projects',
      description: 'Ideas sparked, visions realized.',
      microcopy: 'Got a dream? Let\'s design it.',
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.5, staggerChildren: 0.1 }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="services" ref={ref} className="py-20 md:py-32 bg-background text-text">
      <div className="container mx-auto px-6 md:px-8 max-w-5xl">
        <motion.div 
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-display font-semibold text-center mb-4 text-primary"
          >
            What We Do
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-center text-text/80 mb-16 md:mb-24 max-w-2xl mx-auto"
          >
            Crafting visual narratives that resonate. We blend artistry with intention to bring your unique story to the forefront.
          </motion.p>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
            variants={sectionVariants} // Re-use sectionVariants for staggering children here too
          >
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group bg-lightNeutral p-6 rounded-lg shadow-subtle hover:shadow-strong transition-all duration-300 ease-out transform hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className="flex items-center mb-4">
                    <IconComponent className="w-8 h-8 text-accent mr-4 stroke-2" />
                    <h3 className="text-2xl font-display font-medium text-primary">{service.title}</h3>
                  </div>
                  <p className="text-text/80 mb-3 text-base leading-relaxed h-16">{service.description}</p>
                  <div className="relative h-10 mt-2">
                    <p className="absolute bottom-0 left-0 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center">
                      {service.microcopy}
                      <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
