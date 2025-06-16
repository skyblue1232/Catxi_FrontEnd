import { useState } from "react";
import { useModal } from "../../contexts/ModalContext";

interface Props {
  nickname: string;
  onReport: (nickname: string, reason: string) => void;
}

const ReportModal = ({ nickname, onReport }: Props) => {
  const { closeModal } = useModal();
  const [reason, setReason] = useState("");

  const isValid = reason.trim().length > 7;

  return (
    <div className="w-full space-y-[0.938rem]">
      <h2 className="text-center font-medium text-[1.125rem]">신고하기</h2>
      <div className="h-[1px] bg-[#E0E0E0] w-full" />
      <textarea
        placeholder="신고 사유를 입력해주세요. (8자 이상)"
        className="w-full h-[180px] bg-[#F5F5F5] rounded p-3 text-sm text-gray-700 resize-none outline-none focus:ring-2 focus:ring-[#7424F5]"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <div className="flex w-full gap-[1.25rem] text-[0.875rem] font-medium">
        <button
          onClick={closeModal}
          className="flex-1 bg-[#F5F5F5] text-[#7424F5] py-[0.625rem] rounded-md"
        >
          취소
        </button>
        <button
          onClick={() => {
            if (isValid) {
              onReport(nickname, reason);
              closeModal();
            }
          }}
          disabled={!isValid}
          className={`flex-1 py-[0.625rem] rounded-md ${
            isValid
              ? "bg-[#7424F5] text-[#FEFEFE]"
              : "bg-[#E0E0E0] text-[#AAAAAA] cursor-not-allowed"
          }`}
        >
          신고하기
        </button>
      </div>
    </div>
  );
};

export default ReportModal;
