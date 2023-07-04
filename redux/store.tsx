import { configureStore } from "@reduxjs/toolkit";
import blogFormReducer from "./blogFormState";

export const store = configureStore({
  reducer: {
    blogForm: blogFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
