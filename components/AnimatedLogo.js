import { motion } from 'framer-motion';

// AnimatedLogo: A component that renders the hueneu logo with a reveal animation.
// The animation aims to reflect the 'Hue' (color burst) and 'Neu' (grounding neutrality) concept.
// 'hue' letters animate with a gradient reveal, 'neu' letters with a calmer opacity reveal.
const AnimatedLogo = () => {
  const logoText = ['h', 'u', 'e', 'n', 'e', 'u'];
  const hueColors = ['#D4A373', '#A3B18A', '#8a8a8a']; // Accent, Primary, a softer neutral

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Time between each letter's animation
        delayChildren: 0.2, // Delay before the first letter starts
      },
    },
  };

  const letterVariants = (index) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        // Apply color transition for 'h', 'u', 'e'
        ...(index < 3 && {
          color: [null, hueColors[index % hueColors.length], '#3A3B3C'], // Animate from transparent to accent to final text color
          transition: { duration: 0.8, ease: 'easeInOut' }
        })
      },
    },
  });

  return (
    <motion.div
      className="font-display text-6xl md:text-7xl lg:text-8xl font-semibold text-text tracking-tight flex select-none"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label="hueneu logo"
    >
      {logoText.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants(index)}
          style={{
            // Initial style for 'h', 'u', 'e' to enable color animation
            color: index < 3 ? 'transparent' : '#3A3B3C',
            // marginRight to prevent letter collision, adjust as needed
            marginRight: letter === 'e' && index === 1 ? '-0.1em' : (letter === 'u' && index === 4 ? '-0.05em' : '0'), 
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedLogo;
