import { motion } from 'framer-motion';

/**
 * Reusable scroll-triggered entrance animation wrapper.
 * Fades in + slides up slightly when the element enters the viewport.
 * 
 * Usage:
 *   <ScrollReveal>        — default fade-up
 *   <ScrollReveal delay={0.2}>  — with stagger delay
 *   <ScrollReveal direction="left"> — slide from left
 */
const ScrollReveal = ({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 30,
  className = '',
  once = true,
  threshold = 0.15,
}) => {
  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { y: 0, x: -distance },
    right: { y: 0, x: distance },
    none: { y: 0, x: 0 },
  };

  const offset = directionMap[direction] || directionMap.up;

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // smooth deceleration curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
