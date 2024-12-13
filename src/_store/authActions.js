import api from 'api/axios';

// Действия
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

  verifyToken: (isValid) => ({
    type: 'auth/verifyToken',
    payload: isValid,
  }),

  login: (credentials) => async (dispatch) => {
    try {
      const response = await api.post('/accaunts/login/', credentials, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const { refresh, access } = response.data.tokens || {};
      const user = response.data.user;

      if (refresh && access) {
        localStorage.setItem('refreshToken', refresh);
        localStorage.setItem('accessToken', access);
        localStorage.setItem('authUser', JSON.stringify(user));

        dispatch(authActions.loginSuccess({ refresh, access, user }));
        return { success: true };
      } else {
        throw new Error('Токены отсутствуют в ответе сервера.');
      }
    } catch (error) {
      console.error('Ошибка при входе:', error);
      return { success: false, message: error.response?.data?.detail || 'Ошибка входа' };
    }
  },

  logoutUser: () => (dispatch) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('authUser');

    dispatch(authActions.logout());
  },

  verifyAccessToken: () => async (dispatch) => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      dispatch(authActions.logout());
      return { valid: false };
    }

    try {
      await api.post('/api/token/verify/', { token });
      dispatch(authActions.verifyToken(true));
      return { valid: true };
    } catch (error) {
      console.error('Ошибка верификации токена:', error);

      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await api.post('/api/token/refresh/', { refresh: refreshToken });
          const { access } = response.data;
          localStorage.setItem('accessToken', access);
          dispatch(authActions.loginSuccess({ access, refresh: refreshToken }));
          return { valid: true };
        } catch (refreshError) {
          console.error('Ошибка обновления токена:', refreshError);
          dispatch(authActions.logoutUser());
          return { valid: false };
        }
      }

      dispatch(authActions.logoutUser());
      return { valid: false };
    }
  },
};
