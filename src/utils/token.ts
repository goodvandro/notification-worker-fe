import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
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
