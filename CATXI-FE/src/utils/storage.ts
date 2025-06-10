import { encrypt, decrypt } from "./crypto";

class Storage {
  static getAccessToken = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    return accessToken ? decrypt(accessToken) : undefined;
  };
  static setAccessToken = (accessToken: string) => {
    sessionStorage.setItem("accessToken", encrypt(accessToken));
  };
  static clearStorage = () => {
    sessionStorage.clear();
  };
}

export default Storage;
