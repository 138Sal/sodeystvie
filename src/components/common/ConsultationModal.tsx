import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { ConsultationForm } from './ConsultationForm';

export interface ConsultationModalProps {
  open: boolean;
  onClose: () => void;
  defaultMessage?: string;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export const ConsultationModal = ({
  open,
  onClose,
  defaultMessage = '',
  triggerRef,
}: ConsultationModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      restoreFocusRef.current = triggerRef?.current ?? (document.activeElement as HTMLElement | null);
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
      if (restoreFocusRef.current) {
        restoreFocusRef.current.focus();
        restoreFocusRef.current = null;
      }
    }
  }, [open, triggerRef]);

  // Clean up if unmounted while open
  useEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      if (dialog?.open) {
        dialog.close();
      }
    };
  }, []);

  const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement, Event>) => {
    e.preventDefault();
    onClose();
  };

  const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const handleClose = () => {
    if (open) {
      onClose();
    }
    if (restoreFocusRef.current) {
      restoreFocusRef.current.focus();
      restoreFocusRef.current = null;
    }
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby="consultation-modal-title"
      aria-label="Заявка на консультацию"
      onCancel={handleCancel}
      onClick={handleClick}
      onClose={handleClose}
      className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-[620px] overflow-y-auto overscroll-contain rounded-none border-0 bg-surface p-0 text-paper shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop:bg-black/70 backdrop:backdrop-blur-sm [overscroll-behavior:contain] focus:outline-none"
    >
      <div className="relative px-6 pb-8 pt-11 sm:px-9 sm:pb-10">
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть окно консультации"
          className="absolute right-3 top-3 z-10 flex min-h-[44px] min-w-[44px] items-center justify-center p-2 text-dim transition-colors hover:text-paper"
        >
          <X className="h-5 w-5" />
        </button>

        <ConsultationForm
          onSuccess={onClose}
          defaultMessage={defaultMessage}
          source="Окно заявки"
          titleId="consultation-modal-title"
          compact
        />
      </div>
    </dialog>,
    document.body
  );
};
