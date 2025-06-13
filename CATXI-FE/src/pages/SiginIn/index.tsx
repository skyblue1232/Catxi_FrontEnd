import { useState } from "react";
import LoginCheck from "../../assets/icons/loginCheck.svg?react";
import clsx from "clsx";
import { useSignin } from "../../hooks/useSignIn";
import { useCheckNN } from "../../hooks/query/useCheckNN";
const SignIn = () => {
  const { signIn } = useSignin();
  const [nickName, setNickName] = useState("");
  const { data, refetch } = useCheckNN(nickName);
  const [studentId, setStudentId] = useState("");
  const [nameChecked, setNameChecked] = useState(false);
  const isValid = nickName && studentId;
  const handleDBCheck = async () => {
    await refetch();
    setNameChecked(true);
  };
  return (
    <div className="flex flex-col h-[calc(100vh-66px)] justify-between pt-15.25 px-7.5 relative bg-[#FAFAFA]">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <LoginCheck />
          <div className="flex flex-col gap-2.5">
            <p className="text-xl font-medium text-[#424242]">
              카카오톡 로그인에 성공했습니다!
            </p>
            <p className="text-base font-normal text-[#8C46F6]">
              나머지 정보를 기입해주세요.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2.5">
            <p className="text-sm">닉네임</p>
            <div className="flex flex-col gap-1.25">
              <div className="flex text-sm gap-4">
                <input
                  placeholder="닉네임"
                  className="bg-[#F5F5F5] h-9 px-3.75 py-2.5 placeholder:text-[#9E9E9E] rounded-md focus:outline-none w-full"
                  onChange={(e) => {
                    setNickName(e.target.value);
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
                  onClick={handleDBCheck}
                >
                  중복확인
                </button>
              </div>
              {nameChecked &&
                (data ? (
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
          signIn({ nickname: nickName, StudentNo: Number(studentId) });
        }}
      >
        시작하기
      </button>
    </div>
  );
};

export default SignIn;
