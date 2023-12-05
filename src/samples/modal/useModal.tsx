import React, { ReactNode, useCallback, useState } from "react";
import { createPortal } from "react-dom";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(() => true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(() => false);
  }, []);

  const ModalWrapper = ({ children }: { children: ReactNode }) => (
    <Modal open={isOpen}>{children}</Modal>
  );

  return {
    ModalWrapper,
    open,
    close,
  };
};

const Modal = ({
  children,
  open = false,
}: {
  children: ReactNode;
  open: boolean;
}) => {
  if (!open) {
    return null;
  }
  return createPortal(
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        {children}
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default useModal;
