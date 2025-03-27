import React from "react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useClickOutside } from "../hooks/useClickOutside";

const MODAL_ROOT = "modal-root";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  // esc 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // 포커스 트랩
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  // 모달 외부 클릭 시 닫기
  useClickOutside(modalRef, () => {
    if (isOpen) onClose();
  });

  if (!isOpen) return null;

  return createPortal(
    <div className="relative z-10" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center">
        <div
          ref={modalRef}
          tabIndex={-1}
          className="bg-white p-6 rounded-1g max-w-md w-full"
        >
          {children}
        </div>
      </div>
    </div>,
    document.getElementById(MODAL_ROOT) as HTMLElement
  );
}
