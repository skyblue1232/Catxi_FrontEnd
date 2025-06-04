import { createContext, useContext, useState, type ReactNode } from "react";

interface ModalButton {
  label: string;
  onClick: () => void;
  isPrimary?: boolean;
}

interface ModalContextType {
  isOpen: boolean;
  title: string;
  description?: string;
  buttons: ModalButton[];
  openModal: (props: {
    title: string;
    description?: string;
    buttons: ModalButton[];
  }) => void;
  closeModal: () => void;
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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [buttons, setButtons] = useState<ModalButton[]>([]);

  const openModal = ({
    title,
    description,
    buttons,
  }: {
    title: string;
    description?: string;
    buttons: ModalButton[];
  }) => {
    setTitle(title);
    setDescription(description);
    setButtons(buttons);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTitle("");
    setDescription(undefined);
    setButtons([]);
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, title, description, buttons, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};
