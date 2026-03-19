import { baseRequest } from "@/shared/api/base";
import type { LoginFormFields } from "../model/types";

export const loginRequest = (data: LoginFormFields) => {
  return baseRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username: data.username,
      password: data.password,
      expiresInMins: 60,
    }),
  });
};
