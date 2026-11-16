import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { OrthodoxCross } from '../icons/OrthodoxCross';

/**
 * Короткая заставка: только затемнение на 0,7 с, контент под ней уже отрисован.
 * Навязчивое интро на 3,5 с раньше задерживало LCP и раздражало.
 */
export const IntroPreloader = () => {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    try {
      return sessionStorage.getItem('intro_seen') !== 'true';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!visible) return;
    try {
      sessionStorage.setItem('intro_seen', 'true');
    } catch {
      // приватный режим — просто показываем один раз
    }
    const timer = window.setTimeout(() => setVisible(false), 700);
    return () => window.clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[100] flex select-none flex-col items-center justify-center bg-ink"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <OrthodoxCross className="h-10 w-10 text-paper" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="church mt-5 text-[clamp(24px,7vw,52px)] leading-[1.1] tracking-[0.06em] text-paper"
          >
            СОДЕЙСТВИЕ
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
