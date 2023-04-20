import { createSlice } from '@reduxjs/toolkit';

interface IUser {
  address: string;
  isAuth: boolean;
}

const initialState: IUser = {
  address: '',
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const { address, isAuth } = action.payload;
      state.address = address;
      state.isAuth = isAuth;
    },
    clearUserInfo: (state) => {
      state.address = '';
      state.isAuth = false;
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;

export default userSlice.reducer;
