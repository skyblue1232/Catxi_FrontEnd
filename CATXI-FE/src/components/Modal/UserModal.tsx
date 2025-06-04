import { useModal } from "../../contexts/ModalContext";
import CommonCard from "../Common/CommonCard";

const CommonModal = () => {
  const { isOpen, title, description, buttons, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#1B1B1B]/60 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <CommonCard
        size="smModal"
        className="bg-white rounded-lg shadow-lg p-5 max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-center mb-2">{title}</h2>
        {description && (
          <p className="text-xs text-gray-500 text-center mb-4">{description}</p>
        )}
        <div className="flex justify-center gap-2">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={btn.onClick}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                btn.isPrimary
                  ? "bg-[#1B1B1B] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </CommonCard>
    </div>
  );
};

export default CommonModal;
