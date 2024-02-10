import { createSlice } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";

interface UserData {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface authSliceState {
  token: string | null;
  user: UserData | null;
}

const initialState: authSliceState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
    setCredentials: (state, action) => {
      const { token, ...userData } = action.payload;
      state.token = token;
      state.user = { ...userData };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(apiSlice.endpoints.login.matchFulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
  },
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
