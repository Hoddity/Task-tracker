import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function PrivateRoute() {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);

    if (!isAuth) {
        // Если пользователь не авторизован, перенаправляем на страницу входа
        return <Navigate to="/account/login" replace />;
    }

    // Если пользователь авторизован, рендерим дочерние маршруты
    return <Outlet />;
    
}
const initialState = {
    isAuthenticated: false, // По умолчанию пользователь не авторизован
};

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'auth/loginSuccess':
            return { ...state, isAuthenticated: true }; // Авторизация успешна
        case 'auth/logout':
            return { ...state, isAuthenticated: false }; // Выход из аккаунта
        default:
            return state;
    }
}
