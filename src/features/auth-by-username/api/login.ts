import { baseRequest } from "@/shared/api/base";
import type { LoginFormFields } from "../model/types";

export type LoginResponse = {
  accessToken: string;
};

export const loginRequest = (data: LoginFormFields) => {
  return baseRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username: data.username,
      password: data.password,
      expiresInMins: 60,
    }),
  });
};
