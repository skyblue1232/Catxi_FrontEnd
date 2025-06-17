import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  email: string;
  [key: string]: any;
}

export function getEmailFromToken(token: string): string | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.email;
  } catch (err) {
    console.error('JWT 디코딩 실패', err);
    return null;
  }
}
