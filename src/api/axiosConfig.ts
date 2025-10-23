import { AuthResponse } from '@/features/auth/api/service';
import axios from 'axios';
import { apiRoutes } from './apiRoutes';

export const API_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(
          `${API_URL}${apiRoutes.auth.refresh}`,
          { withCredentials: true },
        );
        localStorage.setItem('token', response.data.access_token);
        return api.request(originalRequest);
      } catch (e: unknown) {
        console.log(e);
      }
    }
    return Promise.reject(error);
  },
);

// api.interceptors.response.use(
//   (response) => {
//     // Можно обработать успешный ответ
//     return response;
//   },
//   (error) => {
//     // Можно обработать ошибку (например, если 401 – перенаправить на логин)
//     if (error.response?.status === 401) {
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
