import { configureStore } from "@reduxjs/toolkit";
import dailyChallengeReducer from "./dailyChallengeSlice";
import questionsReducer from "./questionsSlice";

export const store = configureStore({
  reducer: {
    dailyChallenge: dailyChallengeReducer,
    questions: questionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
