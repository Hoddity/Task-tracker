import axios from 'axios';
import store from '_store/store'; // Импортируем ваш Redux store
import { authActions } from '_store/authActions';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Указываем базовый URL для всех запросов
});

// Интерсептор для запросов
api.interceptors.request.use(
  async (config) => {
    try {
      // Получаем токен из состояния Redux
      const state = store.getState();
      const token = state.auth.accessToken;

      if (token) {
        // Проверяем валидность токена
        const isTokenValid = await store.dispatch(authActions.verifyAccessToken());

        if (!isTokenValid.valid) {
          // Если токен недействителен, перенаправляем пользователя на страницу входа
          window.location.href = '/login';
          throw new Error('Token is not valid');
        }

        // Устанавливаем заголовок Authorization с токеном
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      console.error('Ошибка в интерсепторе запроса:', error.message);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error('Ошибка при отправке запроса:', error.message);
    return Promise.reject(error);
  }
);

// Интерсептор для ответов
api.interceptors.response.use(
  (response) => response, // Возвращаем ответ, если он успешен
  async (error) => {
    // Обрабатываем ошибки 401
    if (error.response?.status === 401) {
      try {
        // Обновляем токен с помощью refreshToken
        const refreshResponse = await store.dispatch(authActions.refreshAccessToken());
        const newAccessToken = refreshResponse.accessToken;

        if (newAccessToken) {
          // Повторяем исходный запрос с обновленным токеном
          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return api.request(error.config);
        }
      } catch (refreshError) {
        console.error('Не удалось обновить токен:', refreshError.message);
        // Перенаправляем пользователя на страницу входа, если обновление токена не удалось
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
