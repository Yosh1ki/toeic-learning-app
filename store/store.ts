import { configureStore } from "@reduxjs/toolkit";
import dailyChallengeReducer from "./dailyChallengeSlice";

export const store = configureStore({
  reducer: {
    dailyChallenge: dailyChallengeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
