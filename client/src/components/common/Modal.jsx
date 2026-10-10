
import { useEffect, useId, useRef } from "react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) => {
  const titleId = useId();
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocusedElement = document.activeElement;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (!firstElement || !lastElement) {
          event.preventDefault();
        } else if (
          event.shiftKey &&
          document.activeElement === firstElement
        ) {
          event.preventDefault();
          lastElement.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === lastElement
        ) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector(".modal-close")?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocusedElement?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className={`modal-content modal-${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex="-1"
        ref={dialogRef}
      >
        <header className="modal-header">
          <h2 id={titleId}>{title}</h2>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </header>

        <div className="modal-body">{children}</div>
      </section>
    </div>
  );
};

export default Modal;