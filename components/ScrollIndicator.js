import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const ScrollIndicator = ({ className = '' }) => {
  return (
    <motion.div
      className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-primary ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.8, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <motion.span
        className="mb-2 text-sm font-sans tracking-wider uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2.8, duration: 0.5 }}
      >
        Explore
      </motion.span>
      <motion.div
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
      >
        <ChevronDown size={32} strokeWidth={1.5} />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;
