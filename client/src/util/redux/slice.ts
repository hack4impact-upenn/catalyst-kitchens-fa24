/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface UserState {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
}

interface Payload {
  email: string;
  firstName: string;
  lastName: string;
}

const initialState = {
  email: null,
  firstName: null,
  lastName: null,
} as UserState;
// Reducers
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Payload>) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    logout: (state) => {
      state.email = null;
      state.firstName = null;
      state.lastName = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

// Selectors
export const selectUser = (state: RootState) => state;
