import axios from "axios";
import Storage from "../utils/storage";

const token = Storage.getAccessToken();

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status, data } = error.response || {};

    if (status === 401 && data?.message === "The API key provided was invalid or missing.") {
      alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
      Storage.clearStorage();
      window.location.href = "/";
    }

    // if (status === 403) {
    //   Storage.clearStorage();
    // }

    if (status === 500) {
      alert("서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }

    return Promise.reject(data);
  }
);

export default axiosInstance;
