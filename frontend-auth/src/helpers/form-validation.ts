import { ValidationError } from "yup";

// ✅ Yup'ın ValidationError sınıfı dışarı aktarılıyor
export { ValidationError as YupValidationError } from "yup";

//
// ✅ 1. JSON Tipleri
//
export type JSONPrimitive = string | number | boolean | null;

export type JSONValue = JSONPrimitive | JSONObject | JSONArray;

export interface JSONObject {
  [key: string]: JSONValue;
}

export type JSONArray = JSONValue[];

//
// ✅ 2. FormData to JSONObject dönüştürücü
//
export const convertToJSONObject = (data: unknown): JSONObject => {
  if (typeof data === "object" && data !== null) {
    if (data instanceof FormData) {
      return Object.fromEntries(data.entries()) as JSONObject;
    }

    if (Symbol.iterator in Object(data)) {
      try {
        return Object.fromEntries(
          data as Iterable<[string, FormDataEntryValue]>
        ) as JSONObject;
      } catch (e) {
        console.error("Error converting iterable to JSONObject:", e);
        return {};
      }
    }

    return data as JSONObject;
  }

  throw new Error("Unsupported data type for JSON conversion");
};

//
// ✅ 3. Genel Response tipi ve üreticisi
//
export interface Response<T = unknown, E = Record<string, string>> {
  ok: boolean;
  data: T;
  message: string;
  errors: E;
}

export const response = <T = unknown, E = Record<string, string>>(
  ok: boolean,
  data: T,
  message: string,
  errors: E
): Response<T, E> => ({
  ok,
  data,
  message,
  errors,
});

//
// ✅ 4. useActionState için uyumlu başlangıç state
//
export const initialState: Response<JSONObject> = response(false, {}, "", {});

//
// ✅ 5. Yup Hata Dönüştürücü (inner array ile uyumlu)
//
export type TransformYupErrorsResponse<T = unknown> = Response<
  T,
  Record<string, string>
>;

export const transformYupErrors = (
  errors: ValidationError["inner"],
  data: JSONObject
): TransformYupErrorsResponse<JSONObject> => {
  const errObject: Record<string, string> = {};

  errors.forEach((item) => {
    if (item.path) {
      errObject[item.path] = item.message;
    }
  });

  return response(false, data, "", errObject);
};
