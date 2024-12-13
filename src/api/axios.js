import axios from 'axios';
import  store  from '_store/store'; // Импортируйте ваш Redux store
import { authActions } from '_store/authActions';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

// Добавляем интерсептор для запроса
api.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;

    if (token) {
      // Проверка валидности токена
      const isTokenValid = await store.dispatch(authActions.verifyAccessToken());

      if (!isTokenValid.valid) {
        // Если токен недействителен, отправляем пользователя на страницу входа
        window.location.href = '/login';
        throw new Error('Token is not valid');
      }

      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
