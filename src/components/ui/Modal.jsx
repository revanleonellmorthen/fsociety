import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import './ui.css';

/**
 * Cakrawala Shared Modal Component
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {Function} props.onClose
 * @param {string} props.title
 * @param {string} [props.subtitle]
 * @param {React.ReactNode} props.children
 * @param {React.ReactNode} [props.footer]
 * @param {string} [props.maxWidth='540px']
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = '540px'
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="cw-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="cw-modal-container"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cw-card__header">
          <div>
            <h3 className="cw-card__title" style={{ fontSize: 'var(--font-size-md)' }}>{title}</h3>
            {subtitle && <p className="cw-card__subtitle">{subtitle}</p>}
          </div>
          <button
            type="button"
            className="cw-button cw-button--ghost cw-button--sm"
            onClick={onClose}
            aria-label="Tutup dialog"
            style={{ padding: '6px', height: 'auto', borderRadius: '50%' }}
          >
            <X size={18} />
          </button>
        </div>
        <div className="cw-card__body">{children}</div>
        {footer && <div className="cw-card__footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
