import { createSlice } from '@reduxjs/toolkit';

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
            state.isAuthenticated = !!action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken || null;
            state.accessToken = action.payload.accessToken || null;
            state.user = action.payload.user || null;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
