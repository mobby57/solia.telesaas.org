import type { ReactNode} from 'react';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', onEsc);
    }
    return () => {
      document.removeEventListener('keydown', onEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 id="modal-title" className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            {title}
          </h2>
        )}
        <div>{children}</div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-mint text-white rounded-lg hover:bg-mint-light focus:outline-none focus:ring-2 focus:ring-mint-dark"
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};
