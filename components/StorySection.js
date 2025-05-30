import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const StorySection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3, // Trigger when 30% of the element is visible
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const popOutVariants = {
    hidden: { scale: 0.5, opacity: 0, rotate: -15 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      rotate: 0,
      transition: { type: 'spring', stiffness: 100, damping: 10, delay: 0.5 },
    },
  };

  return (
    <motion.section 
      id="story"
      ref={ref}
      className="py-20 md:py-32 bg-brand-neutralLight text-brand-text overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <div className="container mx-auto px-6 md:px-8 max-w-4xl text-center md:text-left">
        <div className="md:grid md:grid-cols-3 md:gap-12 items-center">
          <motion.div className="md:col-span-2" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-brand-primary mb-6">
              The <span className="text-brand-accent">Hue</span> in <span className="text-brand-text">Neu</span>.
            </h2>
            <p className="text-lg md:text-xl font-sans mb-4 leading-relaxed">
              At hueneu, we believe in the power of duality. <strong className="font-medium text-brand-accent">“Hue”</strong> represents the vibrant bursts of creativity, the unexpected color palettes, the playful ideas that spark joy and intrigue. It's the life and soul of a story, brought to visual form.
            </p>
            <p className="text-lg md:text-xl font-sans mb-6 leading-relaxed">
              <strong className="font-medium text-brand-textSecondary">“Neu”</strong> is its counterpart – the grounding neutrality, the calm canvas, the intentional white space that allows stories to breathe and resonate. It's the quiet confidence that underpins bold expression.
            </p>
            <p className="text-lg md:text-xl font-sans font-medium text-brand-primary leading-relaxed">
              Together, they create designs that are not just seen, but felt. Balanced, evocative, and always, uniquely yours.
            </p>
          </motion.div>
          
          <motion.div 
            className="md:col-span-1 mt-12 md:mt-0 flex justify-center items-center relative"
            variants={popOutVariants} 
            // Custom animation for the Who Knew part
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 group transform transition-transform duration-500 hover:scale-105">
              {/* Placeholder for public/images/who-knew-visual.svg - Assuming it's a playful, abstract visual */} 
              {/* For actual SVG, use <Image src="/images/who-knew-visual.svg" ... /> if it's complex or needs optimization */}
              {/* Or inline SVG for simple ones that can be styled with CSS */} 
              <div className="absolute inset-0 bg-brand-accent opacity-20 rounded-full blur-2xl group-hover:opacity-30 transition-opacity duration-300"></div>
              <svg viewBox="0 0 100 100" className="relative z-10 w-full h-full fill-current text-brand-accent">
                <path d="M50,5 C74.85,5 95,25.15 95,50 C95,74.85 74.85,95 50,95 C25.15,95 5,74.85 5,50 C5,25.15 25.15,5 50,5 Z M50,15 C30.67,15 15,30.67 15,50 C15,69.33 30.67,85 50,85 C69.33,85 85,69.33 85,50 C85,30.67 69.33,15 50,15 Z" />
                <text x="50" y="55" textAnchor="middle" className="font-display font-bold text-xl fill-current text-brand-background group-hover:text-white transition-colors duration-300">
                  Who
                </text>
                <text x="50" y="75" textAnchor="middle" className="font-display font-bold text-xl fill-current text-brand-background group-hover:text-white transition-colors duration-300">
                  Knew?
                </text>
              </svg>
              <div className="absolute -bottom-4 -right-4 bg-brand-primary text-brand-background px-3 py-1 rounded-md text-xs font-sans shadow-lg group-hover:scale-110 transition-transform duration-300">
                The Surprise!
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default StorySection;
