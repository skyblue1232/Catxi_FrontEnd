import { useEffect, useState } from 'react';
import Storage from '../utils/storage';
import { getEmailFromToken } from '../utils/chat/authUtils';

export function useUserEmail(): string {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = Storage.getAccessToken();
    if (token) {
      const decoded = getEmailFromToken(token);
      if (decoded) setEmail(decoded);
    }
  }, []);

  return email;
}
