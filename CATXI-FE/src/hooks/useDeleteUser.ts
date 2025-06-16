import { useMutation } from "@tanstack/react-query";
import { DeleteUser } from "../apis/deleteUser";
import { useNavigate } from "react-router-dom";
export const useDeleteUser = () => {
  const navigate = useNavigate();
  const { mutate: deleteUser } = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: async () => {
      return await DeleteUser();
    },
    onSuccess: (response) => {
      if (!response?.success) alert("탈퇴 처리 중 오류가 발생했습니다.");
      else {
        alert("탈퇴 처리 되었습니다.\n로그인 화면으로 이동합니다.");
        navigate("/");
      }
    },
  });

  return {
    deleteUser,
  };
};
