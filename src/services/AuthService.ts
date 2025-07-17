import { AxiosResponse } from "axios";
import { AuthResponse } from "@/types/response/AuthResponse";
import api from "@/api/axiosConfig";
import { CheckResponse } from "@/types/response/CheckResponse";

export default class AuthService {
  static async register(
    email: string,
    password: string
  ): Promise<AxiosResponse> {
    return api.post("/auth/register/", { email, password });
  }

  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>("/auth/login/", { email, password });
  }

  static async logout(): Promise<void> {
    return api.post("/auth/logout/");
  }

  static async check():Promise<AxiosResponse<CheckResponse>>{
    return api.get<CheckResponse>("/auth/check/")
  }
}
