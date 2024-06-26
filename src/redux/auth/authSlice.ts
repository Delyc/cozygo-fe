// import { createSlice } from "@reduxjs/toolkit";
// import apiSlice from "../api/apiSlice";

// interface authSliceState {
//   token: string | null;
// }

// const initialState: authSliceState = {
//   token: localStorage.getItem("token"),
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: () => initialState,
//     setCredentials: (state, action) => {
//       const { token } = action.payload;
//       state.token = token;
//       localStorage.setItem("token", token);
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addMatcher(apiSlice.endpoints.login.matchFulfilled, (state, action) => {
//       state.token = action.payload.token;
//     });
//   },
// });

// export const { logout, setCredentials } = authSlice.actions;

// export default authSlice.reducer;


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
let token: string | null = null;

if (typeof window !== "undefined"){
  token = localStorage.getItem("token") ?? null;
} 


interface authSliceState {
  token: string | null;
}



const initialState: authSliceState = {
  token: token
  
 
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/auth' }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: '/signup',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/signin',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        queryFulfilled.then(response => {
          console.log('Query fulfilled:', response);
        }).catch(error => {
          console.error('Query failed:', error);
        });
      }
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),
  }),
});

export default authApi;

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = authApi;
