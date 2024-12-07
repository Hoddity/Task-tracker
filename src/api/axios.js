// src/api/axios.js

import axios from 'axios';

// Функция для верификации токена
const verifyToken = async (token) => {
    try {
        // Отправка токена на сервер для верификации
        await axios.post(
            'http://127.0.0.1:8000/api/token/verify/', // API для верификации токена
            { token },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        // В случае ошибки (например, недействительный токен)
        throw new Error('Invalid token');
    }
};

// Создаем экземпляр axios
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Ваш базовый URL
});

// Интерсептор для добавления токена в каждый запрос
api.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('accessToken');
        
        if (token) {
            try {
                // Проверяем токен на подлинность перед выполнением запроса
                await verifyToken(token);

                // Если токен валиден, добавляем его в заголовки
                config.headers['Authorization'] = `Bearer ${token}`;
                window.location.href = '/login';
            } catch (error) {
                // Если токен недействителен, очищаем локальное хранилище
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('authUser');
                
                // Перенаправляем пользователя на страницу логина
                window.location.href = '/login';
            }
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
