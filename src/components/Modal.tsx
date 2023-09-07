"use client";
import React from "react";
import ReactDOM from "react-dom";
import { getRedirectTypeFromError } from "next/dist/client/components/redirect";
import { type } from "os";

interface IModalProps {
  onClose: () => void;
  open: boolean;
  children: React.ReactNode;
}

// In real project, I would rather use Modal from a well established package..
// probably from MUI or radix or shadcn...
const Modal = ({ open, onClose, children }: IModalProps) => {
  const modalContent = (
    <div
      className="fixed  left-0 top-0 z-[1055] backdrop-blur  h-screen w-screen overflow-y-auto overflow-x-hidden outline-none"
      tabIndex={-1}
      role="dialog"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div className="flex items-center justify-center w-full h-full">
        <div
          className="bg-white shadow-md border border-black rounded-md min-w-[400px] min-h-[150px]"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );

  if (typeof window === "undefined" || typeof document === "undefined")
    return null;
  const modalRoot = window.document?.getElementById("plerion-modal");
  if (modalRoot && open) return ReactDOM.createPortal(modalContent, modalRoot);
};

export default Modal;
