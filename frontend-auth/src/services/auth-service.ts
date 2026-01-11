import { appConfig } from "@/helpers/config";


export const login = async (payload: any) => {
  return await fetch(`${appConfig.apiURL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

export const registerService = async (payload: any) => {
  return await fetch(`${appConfig.apiURL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};