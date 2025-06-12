import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Storage from "../../utils/storage";
import axiosInstance from "../../apis/axios";
import type { LoginResponse } from "../../types/login";

const Redirection = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, headers } = await axiosInstance.get<LoginResponse>(
          `/auth/login/kakao?code=${code}`
        );
        const accessToken = headers["access"];
        const isNewUser = headers["isNewUser"];
        if (data.success && accessToken) {
          Storage.setAccessToken(accessToken);
          if (isNewUser) {
            navigate("/signIn");
          } else {
            navigate("/home");
          }
        }
      } catch {
        window.alert("소셜 로그인에 실패하였습니다.");
        window.location.href = "/";
      }
    };
    if (code) {
      fetchData();
    }
  }, [code, navigate]);
  return <></>;
};

export default Redirection;
