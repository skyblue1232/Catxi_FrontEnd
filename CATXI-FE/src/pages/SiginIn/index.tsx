import Close from "../../assets/icons/close.svg?react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";
const SignIn = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [nickName, setNickName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [idChecked, setIdChecked] = useState(false);
  const [nameChecked, setNameChecked] = useState(false);
  const [pwdChecked, setPwdChecked] = useState(false);
  const [idError, setIdError] = useState<boolean>();
  const [pwdError, setPwdError] = useState<boolean>();
  const [nameError, setNameError] = useState(false);
  const navigate = useNavigate();
  const isValid =
    id &&
    pwd &&
    nickName &&
    idChecked &&
    nameChecked &&
    pwdChecked &&
    studentId &&
    !idError &&
    !pwdError &&
    !nameError;
  const handleCheckPwd = (value: string) => {
    setPwdChecked(true);
    setPwdError(value !== pwd);
  };
  const hanleCheckId = () => {
    setIdChecked(true);
    setIdError(id !== "1");
  };
  const hanleCheckName = () => {
    setNameChecked(true);
    setNameError(nickName !== "채현");
  };
  return (
    <div className="w-full h-full relative">
      <div className="h-16.5 w-full border-b-2 border-b-[#E0E0E0] relative flex justify-center items-center">
        <div
          className="absolute top-1/2 -translate-y-1/2 left-6.5 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          <Close />
        </div>
        <p className="font-regular text-xl">회원가입</p>
      </div>
      <div className="flex flex-col h-[calc(100vh-66px)] justify-between p-7.5">
        <div className="flex flex-col gap-7.5">
          <div className="flex flex-col gap-2.5">
            <p className="text-sm">아이디</p>
            <div className="flex flex-col gap-1.25">
              <div className="flex text-sm gap-4">
                <input
                  placeholder="아이디"
                  className="bg-[#F5F5F5] h-9 px-3.75 py-2.5 placeholder:text-[#9E9E9E] rounded-md focus:outline-none w-full"
                  onChange={(e) => {
                    setId(e.target.value);
                    setIdChecked(false);
                  }}
                />
                <button
                  disabled={!id}
                  className={clsx(
                    "w-30 h-9 px-3.75 rounded-md",
                    !id
                      ? "text-[#9E9E9E] bg-[#E0E0E0]"
                      : "bg-[#7424F5] text-[#FAFAFA] cursor-pointer"
                  )}
                  onClick={hanleCheckId}
                >
                  중복확인
                </button>
              </div>
              {idChecked &&
                (idError ? (
                  <p className="text-xs text-[#FF5252]">
                    이미 사용 중인 아이디입니다.
                  </p>
                ) : (
                  <p className="text-xs text-[#3574FF]">
                    사용 가능한 아이디입니다.
                  </p>
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <p className="text-sm">비밀번호</p>
            <div className="flex flex-col gap-1.25">
              <div className="flex flex-col gap-2.5">
                <input
                  placeholder="비밀번호"
                  className="bg-[#F5F5F5] h-9 px-3.75 text-sm py-2.5 placeholder:text-[#9E9E9E] rounded-md focus:outline-none w-full"
                  onChange={(e) => setPwd(e.target.value)}
                />
                <input
                  placeholder="비밀번호 확인"
                  className="bg-[#F5F5F5] h-9 px-3.75 text-sm py-2.5 placeholder:text-[#9E9E9E] rounded-md focus:outline-none w-full"
                  onChange={(e) => handleCheckPwd(e.target.value)}
                />
              </div>
              {pwdError && pwd && (
                <p className="text-xs text-[#FF5252]">
                  비밀번호가 일치하지 않습니다.
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <p className="text-sm">닉네임</p>
            <div className="flex flex-col gap-1.25">
              <div className="flex text-sm gap-4">
                <input
                  placeholder="닉네임"
                  className="bg-[#F5F5F5] h-9 px-3.75 py-2.5 placeholder:text-[#9E9E9E] rounded-md focus:outline-none w-full"
                  onChange={(e) => {
                    setNickName(e.target.value);
                    setNameChecked(false);
                  }}
                />
                <button
                  disabled={!nickName}
                  className={clsx(
                    "w-30 h-9 px-3.75 rounded-md",
                    !nickName
                      ? "text-[#9E9E9E] bg-[#E0E0E0]"
                      : "bg-[#7424F5] text-[#FAFAFA] cursor-pointer"
                  )}
                  onClick={hanleCheckName}
                >
                  중복확인
                </button>
              </div>
              {nameChecked &&
                (nameError ? (
                  <p className="text-xs text-[#FF5252]">
                    이미 사용 중인 닉네임입니다.
                  </p>
                ) : (
                  <p className="text-xs text-[#3574FF]">
                    사용 가능한 닉네임입니다.
                  </p>
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <p className="text-sm">학번</p>
            <input
              placeholder="학번"
              className="bg-[#F5F5F5] h-9 px-3.75 text-sm py-2.5 placeholder:text-[#9E9E9E] rounded-md focus:outline-none w-full"
              onChange={(e) => setStudentId(e.target.value)}
            />
          </div>
        </div>
        <button
          disabled={!isValid}
          className={clsx(
            "w-full h-13 rounded-md",

            !isValid
              ? "text-[#9E9E9E] bg-[#E0E0E0]"
              : "bg-[#7424F5] text-[#FAFAFA] cursor-pointer"
          )}
          onClick={() => {
            alert("성공");
            navigate("/login");
          }}
        >
          가입하기
        </button>
      </div>
    </div>
  );
};

export default SignIn;
