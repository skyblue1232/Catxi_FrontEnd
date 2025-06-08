import { useNavigate } from "react-router-dom";
import Kakao from "../../assets/icons/kakao.svg?react";
import Logo from "../../../public/logo.svg?react";
import LogoText from "../../assets/icons/logoText.svg?react";
export const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full px-6.5 flex flex-col items-center justify-center bg-[#FAFAFA]">
      <div className="flex flex-col items-center mb-[156px]">
        <div className="mb-5">
          <Logo />
        </div>
        <p className="text-[15px] text-[#424242] font-normal mb-1.25">
          택시 동승자 매칭 서비스
        </p>
        <LogoText />
      </div>
      <div className="cursor-pointer" onClick={() => navigate("/signIn")}>
        <Kakao />
      </div>
    </div>
  );
};
