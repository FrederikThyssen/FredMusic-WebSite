import type { ReactNode } from "react";
import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./Button";

type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ title, isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-night-950/82 px-4 py-8 backdrop-blur-sm" role="presentation">
      <section
        aria-modal="true"
        role="dialog"
        aria-labelledby="modal-title"
        className="max-h-[88vh] w-full max-w-2xl overflow-y-auto border border-white/14 bg-night-900 p-6 text-ivory shadow-glow"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="modal-title" className="font-display text-3xl leading-tight">{title}</h2>
          <Button variant="ghost" size="sm" aria-label="Fermer la fenêtre" onClick={onClose}>
            <X className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
        <div className="mt-6">{children}</div>
      </section>
    </div>
  );
}
