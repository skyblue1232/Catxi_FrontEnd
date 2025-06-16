import { createContext, useContext, useState, type ReactNode } from "react";

interface ModalContextType {
  isOpen: boolean;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  content: ReactNode | null; 
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);

  const openModal = (modalContent: ReactNode) => {
    setContent(modalContent);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setContent(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, content }}>
      {children}
      {isOpen && content && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-[1.656rem]"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-[1rem] shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()} 
          >
            {content}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};
