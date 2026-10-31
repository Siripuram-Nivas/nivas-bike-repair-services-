import { motion, useReducedMotion } from 'framer-motion';

/**
 * Lightweight scroll reveal wrapper. Reduced-motion users get static content.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 24,
  as = 'div',
}) {
  const reduce = useReducedMotion();
  const Component = motion[as] || motion.div;

  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
}
