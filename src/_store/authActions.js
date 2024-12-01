export const authActions = {
    loginSuccess: (token) => ({ type: 'auth/loginSuccess', payload: token }),
    logout: () => ({ type: 'auth/logout' }),
};

// Reducer для обработки действий
const initialState = {
    isAuthenticated: false, // По умолчанию пользователь не авторизован
};

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'auth/loginSuccess':
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,  // предполагается, что в action.payload передается токен
                user: action.payload.user,    // если возвращаете информацию о пользователе
            };
        case 'auth/logout':
            return { ...state, isAuthenticated: false };
        default:
            return state;
    }
}
