import { AxiosResponse } from "axios";
import { AuthResponse, authSchema, IUser, userSchema } from "@/schemas";
import api from "@/api/axiosConfig";

export default class AuthService {
  static async register(
    email: string,
    password: string
  ): Promise<AxiosResponse> {
    return api.post("/auth/register/", { email, password });
  }

  static async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login/", {
      email,
      password,
    });
    return authSchema.parse(response.data);
  }

  static async logout(): Promise<void> {
    return api.post("/auth/logout/");
  }

  static async check(): Promise<IUser> {
    const response = await api.get<IUser>("/auth/check/");
    return userSchema.parse(response.data);
  }
}
