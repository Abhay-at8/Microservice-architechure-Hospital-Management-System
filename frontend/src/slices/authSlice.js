import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInformation: localStorage.getItem('userInformation')
    ? JSON.parse(localStorage.getItem('userInformation'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInformation = action.payload;
      localStorage.setItem('userInformation', JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInformation = null;
      localStorage.removeItem('userInformation');
    },
    changeAvailable: (state, action) => {
      state.userInformation.available = !state.userInformation.available;
    }
  },
});

export const { setCredentials, logout, changeAvailable } = authSlice.actions;

export default authSlice.reducer;
