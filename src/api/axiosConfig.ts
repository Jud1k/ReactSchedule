import axios from "axios";

// 1. Создаём экземпляр axios с настройками
const api = axios.create({
  baseURL: "http://localhost:8000", // Базовый URL
  timeout: 5000, // Максимальное время ожидания запроса
  headers: {
    "Content-Type": "application/json",
    // Можно добавить Auth-токен, если нужно
    // "Authorization": `Bearer ${localStorage.getItem('token')}`
  },
});

// 2. Добавляем интерцепторы (опционально)
// api.interceptors.request.use(
//   (config) => {
//     // Можно модифицировать запрос перед отправкой (например, добавить токен)
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

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

// 3. Экспортируем настроенный экземпляр
export default api;
