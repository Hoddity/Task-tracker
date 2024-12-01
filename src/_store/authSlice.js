import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    token: null,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user || null;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
            localStorage.removeItem('authToken');
            localStorage.removeItem('authUser');
        },
        
        restoreAuth: (state, action) => {
            state.isAuthenticated = !!action.payload.token;
            state.token = action.payload.token || null;
            state.user = action.payload.user || null;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
