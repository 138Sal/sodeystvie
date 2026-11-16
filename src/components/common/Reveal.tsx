import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  y?: number;
  blur?: number;
  duration?: number;
  once?: boolean;
}

export const Reveal = ({
  children,
  className,
  id,
  delay = 0,
  y = 24,
  blur = 0,
  duration = 0.75,
  once = true,
}: RevealProps) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      id={id}
      className={className}
      initial={
        reduce ? { opacity: 1 } : { opacity: 0, y, filter: `blur(${blur}px)` }
      }
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-64px 0px -64px 0px' }}
      transition={{
        duration: reduce ? 0 : duration,
        delay: reduce ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
};
