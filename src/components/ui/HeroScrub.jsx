import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * Cinematic scroll-scrubbed hero media.
 *
 * A single, optimised workshop photograph is used instead of a frame sequence
 * so the hero stays fast on mobile data. The scroll choreography (image zoom +
 * drift) is preserved and replaced with a static frame when the visitor prefers
 * reduced motion.
 */
export default function HeroScrub({
  src,
  srcSet,
  sizes,
  alt,
  width,
  height,
  className = '',
  children,
}) {
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const scale = useTransform(
    scrollY,
    [0, 720],
    reduceMotion ? [1, 1] : [1, 1.1],
  );
  const y = useTransform(scrollY, [0, 720], reduceMotion ? [0, 0] : [0, 26]);

  return (
    <motion.div
      ref={containerRef}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden bg-graphite ${className}`}
    >
      <motion.img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        style={{ scale, y }}
        className="h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent"
      />
      {children}
    </motion.div>
  );
}
