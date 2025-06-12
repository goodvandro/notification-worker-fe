import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  exp: number;
  id: string;
  username: string;
}

export function isTokenExpired(token: string): boolean {
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    if (!exp) return true;

    const now = Date.now() / 1000;
    return exp < now;
  } catch {
    return true; // invalid or expired token
  }
}

export function decodeToken(token: string): JwtPayload {
  return jwtDecode<JwtPayload>(token);
}
