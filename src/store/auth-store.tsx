import { IUser } from "@/schemas";
import AuthService from "@/services/AuthService";
import { makeAutoObservable, runInAction } from "mobx";

class AuthStore {
  user = {} as IUser;
  isAuth: boolean = false;
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setError(error: string | null) {
    this.error = error;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  async register(email: string, password: string) {
    this.isLoading = true;
    this.error = null;
    try {
      await AuthService.register(email, password);
    } catch (e) {
      this.error = e.response?.data?.detail || "Registration failed";
      throw e;
    } finally {
      this.isLoading = false;
    }
  }

  async login(email: string, password: string) {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await AuthService.login(email, password);
      runInAction(() => {
        this.user = response.user;
        this.isAuth = true;
      });
      localStorage.setItem("token", response.access_token);
      console.log(response);
    } catch (error) {
      this.error = e.response?.detail || "Login failed";
    } finally {
      this.isLoading = false;
    }
  }

  async logout() {
    this.isLoading = true;
    this.error = null;
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      runInAction(() => {
        this.isAuth = false;
        this.user = {} as IUser;
      });
    } catch (e) {
      this.error = e.response?.data?.datail || "Logout failed";
      throw e;
    } finally {
      this.isLoading = false;
    }
  }

  async checkAuth() {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await AuthService.check();
      runInAction(() => {
        this.user = response;
        this.isAuth = true;
      });
    } catch (e) {
      this.error = e.response?.data?.detail || "Login failed";
      throw e;
    } finally {
      this.isLoading = false;
    }
  }
}

export default new AuthStore();
