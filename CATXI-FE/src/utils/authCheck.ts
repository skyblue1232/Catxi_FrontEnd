import Storage from "./storage.ts";
import { redirect } from "react-router-dom";

export class AuthCheck {
  static async authPageCheck() {
    if (!Storage.getAccessToken()) {
      window.alert("로그인이 필요합니다.");
      return redirect("/");
    }
    return null;
  }
}
