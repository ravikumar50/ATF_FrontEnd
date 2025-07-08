// store.js
import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice";

// Simple Redux store without persistence
export const store = configureStore({
  reducer: {
    auth: authSliceReducer
  },
  devTools: true,
});
