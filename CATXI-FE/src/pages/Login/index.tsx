import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PWD from "../../assets/icons/pwd.svg?react";
import clsx from "clsx";
export const Login = () => {
  const navigate = useNavigate();
  const correctId = "123";
  const correctPwd = "123*";
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [visible, setVisible] = useState(false);
  const [idError, setIdError] = useState(false);
  const [pwdError, setPwdError] = useState(false);

  const handleLogin = () => {
    const idMatch = id === correctId;
    const pwdMatch = pwd === correctPwd;
    setIdError(!idMatch);
    setPwdError(!pwdMatch);

    if (idMatch && pwdMatch) {
      navigate("/");
    }
  };
  return (
    <div className="w-full h-full px-6.5 flex flex-col justify-center gap-7.5 bg-[#FAFAFA]">
      <div className="flex flex-col gap-5">
        <p className="text-sm">아이디</p>
        <div className="flex flex-col gap-1">
          <input
            type="text"
            onChange={(e) => setId(e.target.value)}
            onKeyDown={() => setIdError(false)}
            className={clsx(
              "border-b pb-2 text-base focus:outline-none",
              idError ? "border-b-[#FF5252]" : "border-b-[#E0E0E0]"
            )}
          />
          {idError && (
            <p className="text-xs text-[#FF5252]">아이디가 틀렸습니다.</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <p className="text-sm">비밀번호</p>
        <div className="flex flex-col gap-1">
          <div className="relative">
            <input
              type={visible ? "text" : "password"}
              onChange={(e) => setPwd(e.target.value)}
              onKeyDown={() => setPwdError(false)}
              className={clsx(
                "border-b pb-2 text-base focus:outline-none w-full",
                pwdError ? "border-b-[#FF5252]" : "border-b-[#E0E0E0]"
              )}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 right-0.5 bg-transparent cursor-pointer"
              onClick={() => setVisible(!visible)}
            >
              <PWD />
            </div>
          </div>
          {pwdError && (
            <p className="text-xs text-[#FF5252]">비밀번호가 틀렸습니다.</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <button
          disabled={!id || !pwd}
          className={clsx(
            "w-full py-4 rounded-md text-lg text-[#FAFAFA] cursor-pointer",
            !id || !pwd ? "bg-gray-400 cursor-not-allowed" : "bg-[#7424F5]"
          )}
          onClick={handleLogin}
        >
          로그인
        </button>
        <button
          className="text-base cursor-pointer"
          onClick={() => navigate("/signIn")}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};
