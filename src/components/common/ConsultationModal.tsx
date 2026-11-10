import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { ConsultationForm } from './ConsultationForm';

interface ConsultationModalProps {
  open: boolean;
  onClose: () => void;
  defaultMessage?: string;
}

export const ConsultationModal = ({
  open,
  onClose,
  defaultMessage = '',
}: ConsultationModalProps) => {
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    const focusTimer = window.setTimeout(() => dialogRef.current?.focus(), 60);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[95] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-ink/85 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Dialog Container */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Оставить заявку координатору"
            tabIndex={-1}
            initial={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: 32, filter: 'blur(12px)' }
            }
            animate={
              reduce
                ? { opacity: 1 }
                : { opacity: 1, y: 0, filter: 'blur(0px)' }
            }
            exit={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: 16, filter: 'blur(8px)' }
            }
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[90vh] w-full max-w-[620px] overflow-y-auto bg-surface px-6 pb-8 pt-11 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] outline-none sm:px-9 sm:pb-10"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть окно"
              className="absolute right-4 top-4 z-10 p-2 text-dim transition-colors hover:text-paper"
            >
              <X className="h-5 w-5" />
            </button>

            <ConsultationForm
              onSuccess={onClose}
              defaultMessage={defaultMessage}
              source="Окно заявки"
              compact
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
};
