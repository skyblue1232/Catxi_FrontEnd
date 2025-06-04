import { useNavigate } from "react-router-dom";
import Kakao from "../../assets/icons/kakao.svg?react";
export const Login = () => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full h-full px-6.5 flex items-center justify-center bg-[#FAFAFA] cursor-pointer"
      onClick={() => navigate("/signIn")}
    >
      <Kakao />
    </div>
  );
};
