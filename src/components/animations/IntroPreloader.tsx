import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { OrthodoxCross } from '../icons/OrthodoxCross';

interface IntroPreloaderProps {
  onComplete: () => void;
}

export const IntroPreloader: React.FC<IntroPreloaderProps> = ({ onComplete }) => {
  const reduce = useReducedMotion();
  const [isFinished, setIsFinished] = useState(false);
  const word = 'СОДЕЙСТВИЕ';

  const hasSeen =
    typeof window !== 'undefined' &&
    (() => {
      try {
        return sessionStorage.getItem('intro_seen') === 'true';
      } catch {
        return false;
      }
    })();

  const shouldSkip = Boolean(reduce || hasSeen);

  useEffect(() => {
    if (shouldSkip) {
      onComplete();
      return;
    }

    try {
      sessionStorage.setItem('intro_seen', 'true');
    } catch {
      // ignore storage access errors
    }

    const timer = setTimeout(() => {
      setIsFinished(true);
      setTimeout(onComplete, 650);
    }, 2900);

    return () => clearTimeout(timer);
  }, [onComplete, shouldSkip]);

  if (shouldSkip) {
    return null;
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.25 + i * 0.09,
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100] flex select-none flex-col items-center justify-center overflow-hidden bg-ink px-5"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mb-8"
          >
            <OrthodoxCross className="h-12 w-12 text-paper" />
          </motion.div>

          <div className="flex items-center justify-center gap-[0.02em] whitespace-nowrap">
            {word.split('').map((letter, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="church inline-block text-paper text-[clamp(26px,8.4vw,88px)] leading-none"
                style={{ letterSpacing: '0.06em' }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
