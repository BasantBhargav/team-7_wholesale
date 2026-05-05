import { createSlice } from '@reduxjs/toolkit';

const persisted = localStorage.getItem('bom_auth');
const initialState = persisted ? JSON.parse(persisted) : { token: null, role: null, userId: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const payload = action.payload;
      state.token = payload.token;
      state.role = payload.role;
      state.userId = payload.userId;
      localStorage.setItem('bom_auth', JSON.stringify(state));
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.userId = null;
      localStorage.removeItem('bom_auth');
    }
  }
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
