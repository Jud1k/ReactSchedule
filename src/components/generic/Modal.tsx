import { useEffect, useRef } from "react";
import { FaPlusCircle } from "react-icons/fa";

interface ModalProps {
  title: string;
  header: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onClick: () => void;
  onClose: () => void;
}

export default function Modal({
  title,
  header,
  children,
  isOpen,
  onClose,
  onClick,
}: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  return (
    <>
      <button className="btn" onClick={() => onClick()}>
        <FaPlusCircle/>
        {title}
      </button>
      <dialog
        ref={modalRef}
        className="modal transition-all duration-300 backdrop:bg-black/60"
        onClose={onClose}
      >
        <div className="modal-box max-w-md p-0 overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-green-600 to-green-400 p-6">
            <h3 className="font-bold text-xl text-white">{header}</h3>
          </div>
          <div className="p-6 bg-base-100">{children}</div>
        </div>

        <div className="modal-backdrop" onClick={onClose}>
          <button>close</button>
        </div>
      </dialog>
    </>
  );
}
