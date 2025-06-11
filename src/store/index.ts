import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import messageReducer from "./messages.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
