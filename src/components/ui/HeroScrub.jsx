import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * Cinematic scroll-scrubbed hero media.
 *
 * Adapted for this project from the supplied <HeroScrub /> concept:
 * the full-screen pinned frame sequence was replaced with a single,
 * optimised workshop photograph so the hero stays fast on mobile data and
 * relevant to the business. The scroll choreography (image zoom + drift)
 * is preserved and replaced with a static frame when the visitor prefers
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
    reduceMotion ? [1, 1] : [1, 1.12],
  );
  const y = useTransform(scrollY, [0, 720], reduceMotion ? [0, 0] : [0, 28]);

  return (
    <motion.div
      ref={containerRef}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
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
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"
      />
      {children}
    </motion.div>
  );
}
