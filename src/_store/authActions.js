export const authActions = {
    loginSuccess: (tokens) => ({
        type: 'auth/loginSuccess',
        payload: {
            refresh: tokens.refresh,
            access: tokens.access,
            user: tokens.user,
        },
    }),
    logout: () => ({ type: 'auth/logout' }),
};

// Reducer для обработки действий
const initialState = {
    isAuthenticated: false, // По умолчанию пользователь не авторизован
    refreshToken: null,
    accessToken: null,
    user: null,
};

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'auth/loginSuccess':
            return {
                ...state,
                isAuthenticated: true,
                refreshToken: action.payload.refresh, // Сохраняем refresh токен
                accessToken: action.payload.access,  // Сохраняем access токен
                user: action.payload.user,           // Сохраняем информацию о пользователе
            };
        case 'auth/logout':
            return {
                ...state,
                isAuthenticated: false,
                refreshToken: null,
                accessToken: null,
                user: null,
            };
        default:
            return state;
    }
}
