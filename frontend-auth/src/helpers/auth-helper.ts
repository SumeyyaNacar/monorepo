import { auth } from "@/auth";

interface AuthHeader {
  [key: string]: string;
}

/**
 * 🔐 Authorization Header Hazırlayıcı
 * Spring'deki SecurityContext'ten token çekip Header'a koymak gibidir.
 */
export const getAuthHeader = async (): Promise<AuthHeader> => {
  const session = await auth(); 
  const token = (session as any)?.accessToken;
  
  const authHeader: AuthHeader = {
    "Content-Type": "application/json",
  };

  if (token) {
    // Backend'de JWTService Bearer ön eki olmadan sadece token dönerse:
    authHeader["Authorization"] = `Bearer ${token}`; 
  }

  return authHeader;
};

/**
 * 🔍 JWT Token Decode (Payload okuma)
 */
interface JwtPayload {
  exp: number;
  [key: string]: unknown;
}

const parseJwt = (token: string): JwtPayload => {
  try {
    const base64Payload = token.split(".")[1];
    // Next.js (Node.js) ortamında atob yerine Buffer tercih edilir
    const decodedPayload = Buffer.from(base64Payload, 'base64').toString();
    return JSON.parse(decodedPayload) as JwtPayload;
  } catch (error) {
    console.error("JWT parse hatası:", error);
    return { exp: 0 };
  }
};

/**
 * ✅ Token Süresi Kontrolü
 * Token'ın expire (exp) süresinin geçip geçmediğine bakar.
 */
export const getIsTokenValid = (token: string | null | undefined): boolean => {
  if (!token || typeof token !== "string" || token.split(".").length !== 3) {
    return false;
  }

  try {
    const jwtPayload = parseJwt(token);
    if (!jwtPayload.exp) return false;

    const jwtExpireDateTime = new Date(jwtPayload.exp * 1000);
    return jwtExpireDateTime > new Date(); 
  } catch {
    return false;
  }
};

/**
 * 🚦 Erişim Kontrolü (Sadeleştirilmiş)
 * Şu an role olmadığı için sadece 'isLoggedIn' durumuna bakar.
 */
export const getIsUserAuthorized = (isLoggedIn: boolean): boolean => {
  return isLoggedIn;
};