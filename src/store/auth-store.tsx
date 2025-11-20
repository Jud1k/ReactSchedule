import AuthService, { User } from '@/features/auth/api/service';
import { makeAutoObservable, runInAction } from 'mobx';

class AuthStore {
  user = {} as User;
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

  setIsAuth(isAuth: boolean) {
    this.isAuth = isAuth;
  }

  setUser(user: User) {
    this.user = user;
  }

  async register(email: string, password: string) {
    this.isLoading = true;
    this.error = null;
    try {
      await AuthService.register({ email, password });
    } catch (e: any) {
      this.error = e.response?.data?.detail;
      throw e;
    } finally {
      this.isLoading = false;
    }
  }

  async login(email: string, password: string) {
    this.isLoading = true;
    this.error = null;
    try {
      const result = await AuthService.login({ email, password });
      runInAction(() => {
        this.user = result.user;
        this.isAuth = true;
      });
      localStorage.setItem('token', result.access_token);
    } catch (e: any) {
      console.log(e);
      this.error = e.response?.data?.detail;
      throw e;
    } finally {
      this.isLoading = false;
    }
  }

  async logout() {
    this.isLoading = true;
    this.error = null;
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      runInAction(() => {
        this.isAuth = false;
        this.user = {} as User;
      });
    } catch (e: any) {
      this.error = e.response?.data?.datail || 'Logout failed';
      throw e;
    } finally {
      this.isLoading = false;
    }
  }

  async checkAuth() {
    this.isLoading = true;
    this.error = null;
    try {
      const result = await AuthService.check();
      runInAction(() => {
        this.user = result;
        this.isAuth = true;
      });
    } catch (e: any) {
      this.error = e.response?.data?.detail || 'Login failed';
      throw e;
    } finally {
      this.isLoading = false;
    }
  }
}

export default new AuthStore();
