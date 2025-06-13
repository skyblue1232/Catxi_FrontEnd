// import { useNavigate } from "react-router-dom";
import Kakao from "../../assets/icons/kakao.svg?react";
import Logo from "../../../public/logo.svg?react";
import LogoText from "../../assets/icons/logoText.svg?react";
export const Login = () => {
  const handleKakaoLogin = () => {
    const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
    const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&response_type=code&scope=profile_nickname,account_email`;
    window.location.href = kakaoAuthUrl;
  };
  return (
    <div className="w-full h-full px-6.5 flex flex-col items-center justify-center bg-[#FAFAFA]">
      <div className="flex flex-col items-center mb-[136px]">
        <div className="mb-2.5">
          <Logo />
        </div>
        <p className="text-[15px] text-[#424242] font-normal mb-1.25">
          택시 동승자 매칭 서비스
        </p>
        <LogoText />
      </div>
      <div className="cursor-pointer" onClick={handleKakaoLogin}>
        <Kakao />
      </div>
    </div>
  );
};
