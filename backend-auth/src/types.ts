/**
 * UserProfile: API yanıtlarında kullanıcı bilgilerini taşıyan saf veri tipi.
 */
export type UserProfile = {
  id?: number | string; // Hem veritabanı (number) hem JWT (string) uyumu için
  email: string;
  firstName?: string;
  lastName?: string;
  name?: string;       // JWT payload için
  token?: string;
};

export interface SignupResponse {
  message: string;
  user: UserProfile;
}

export interface LoginResponse {
  message: string;
  user: UserProfile;
}
