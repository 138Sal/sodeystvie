import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OrthodoxCross } from '../icons/OrthodoxCross';

interface IntroPreloaderProps {
  onComplete: () => void;
}

export const IntroPreloader: React.FC<IntroPreloaderProps> = ({ onComplete }) => {
  const [isFinished, setIsFinished] = useState(false);
  const word = 'СОДЕЙСТВИЕ';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFinished(true);
      setTimeout(onComplete, 650);
    }, 2900);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const letterVariants = {
    hidden: { opacity: 0, y: 8, filter: 'blur(12px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
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
