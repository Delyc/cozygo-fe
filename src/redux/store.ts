import { combineReducers, configureStore } from "@reduxjs/toolkit";
import apiSlice from "./api/apiSlice";
import authSlice from "./auth/authSlice";

const rootReducer = combineReducers({
  [authSlice.reducerPath]: authSlice.reducer, 
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend().concat( authSlice.middleware, apiSlice.middleware ),
    devTools: process.env.NODE_ENV !== "production",
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
