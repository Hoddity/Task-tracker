// src/api/axios.js

import axios from 'axios';

// Создаем экземпляр axios
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Ваш базовый URL
});

// Интерсептор для добавления токена в каждый запрос
api.interceptors.request.use(
    (config) => {
        // Получаем токен из localStorage
        const token = localStorage.getItem('accessToken');
        
        if (token) {
            // Добавляем токен в заголовки запроса, если он есть
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
