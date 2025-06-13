import { useModal } from "../../contexts/ModalContext";

const CommonModal = () => {
  const { isOpen, closeModal, content } = useModal(); 

  if (!isOpen || !content) return null;

  return (
    <div
      className="fixed inset-0 bg-[#1B1B1B]/60 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-5 max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </div>
    </div>
  );
};

export default CommonModal;
