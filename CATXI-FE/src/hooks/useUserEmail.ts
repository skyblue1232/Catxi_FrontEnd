import { useEffect, useState } from "react";
import Storage from "../utils/storage";
import { getEmailFromToken } from "../utils/chat/authUtils";

export function useUserEmail(): string | null {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const token = Storage.getAccessToken();
    if (token) {
      const decoded = getEmailFromToken(token);
      if (decoded) setEmail(decoded);
    }
  }, []);

  return email;
}
