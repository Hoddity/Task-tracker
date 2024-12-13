import { createSlice } from '@reduxjs/toolkit';
import { authActions } from './authActions';

const initialState = {
  isAuthenticated: false,
  refreshToken: null,
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.refreshToken = action.payload.refresh;
      state.accessToken = action.payload.access;
      state.user = action.payload.user || null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.refreshToken = null;
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('authUser');
    },
    restoreAuth: (state, action) => {
      const { accessToken, refreshToken, user } = action.payload;
    
      // Проверяем, изменились ли данные
      const isStateChanged =
        state.accessToken !== accessToken ||
        state.refreshToken !== refreshToken ||
        JSON.stringify(state.user) !== JSON.stringify(user);
    
      if (isStateChanged) {
        state.isAuthenticated = !!accessToken;
        state.refreshToken = refreshToken || null;
        state.accessToken = accessToken || null;
        state.user = user || null;
      }
    },
  },
});

export default authSlice.reducer;
