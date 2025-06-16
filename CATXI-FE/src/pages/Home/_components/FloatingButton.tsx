import { useNavigate } from "react-router-dom";
import Float from "../../../assets/icons/Float.svg?react";

const FloatingButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/createChat");
  };

  return (
    <button
      className="fixed bottom-[5rem] cursor-pointer right-[1.688rem] bg-[#7424F5] text-white w-[3.75rem] h-[3.75rem] rounded-full shadow-lg flex items-center justify-center"
      onClick={handleClick}
    >
      <Float />
    </button>
  );
};

export default FloatingButton;
