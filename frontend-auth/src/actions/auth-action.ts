"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { ValidationError } from "yup";
import {
  convertToJSONObject,
  response,
  transformYupErrors,
} from "@/helpers/form-validation";
import { AuthSchema, RegisterSchema } from "@/helpers/schemes/auth-schema";
import type {
  TransformYupErrorsResponse,
  JSONObject,
} from "@/helpers/form-validation";
import { registerService } from "@/services/auth-service";
import { isRedirectError } from "next/dist/client/components/redirect-error";

// --- LOGIN ACTION ---
export const loginAction = async (
  _: TransformYupErrorsResponse<JSONObject> | undefined,
  formData: FormData
): Promise<TransformYupErrorsResponse<JSONObject>> => {
  const fields: JSONObject = convertToJSONObject(formData);
  
  try {
    AuthSchema.validateSync(fields, { abortEarly: false });
    
    // Auth v5'te signIn başarılı olursa yönlendirme yapabilir
    await signIn("credentials", {
      email: fields.email,
      password: fields.password,
      redirect: false, // Manuel kontrol için false kalsın
    });

  } catch (err) {
    // 1. Eğer hata bir yönlendirme hatasıysa (Next.js iç mekanizması), hatayı fırlat ki redirect çalışsın
    if (isRedirectError(err)) throw err;

    // 2. Yup Validasyon Hataları
    if (err instanceof ValidationError) {
      return transformYupErrors(err.inner, fields);
    }
    
    // 3. NextAuth Hataları
    if (err instanceof AuthError) {
      // CredentialsSignin vb. hataları burada yakalarız
      return response(false, fields, "Geçersiz email veya şifre.", {});
    }

    // Bilinmeyen hatalar için
    return response(false, fields, "Bir şeyler ters gitti. Lütfen tekrar deneyin.", {});
  }

  // try-catch bittikten sonra yönlendir
  redirect("/dashboard");
};
export const registerAction = async (
  _: TransformYupErrorsResponse<JSONObject> | undefined,
  formData: FormData
): Promise<TransformYupErrorsResponse<JSONObject>> => {
  const fields: JSONObject = convertToJSONObject(formData);

  try {
    // 1. Frontend Validasyonu (Yup)
    RegisterSchema.validateSync(fields, { abortEarly: false });

    //2.payload oluştur
    const payload = {
      firstName: fields.firstName,
      lastName: fields.lastName,
      email: fields.email,
      password: fields.password
    };

    // 3. Backend Servis Çağrısı (Temizlenmiş payload ile)
    const res = await registerService(payload);
    const data = await res.json();

    if (!res.ok) {
      // Backend'den gelen "email already exists" vb. hataları yakala
      return response(false, fields, data.error?.message || "Kayıt başarısız", {});
    }

  } catch (err) {
    if (err instanceof ValidationError) {
      return transformYupErrors(err.inner, fields);
    }
    return response(false, fields, "Sunucu hatası oluştu", {});
  }

  redirect("/");
};

// --- LOGOUT ACTION ---
export const logoutAction = async () => {
  await signOut({ redirectTo: "/" });
};