import { createSlice } from "@reduxjs/toolkit";

interface DailyChallengeState {
  date: string;
  unansweredCount: number;
}

const initialState: DailyChallengeState = {
  date: "",
  unansweredCount: 5,
};

const dailyChallengeSlice = createSlice({
  name: "dailyChallenge",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setUnansweredCount: (state, action) => {
      state.unansweredCount = action.payload;
    },
  },
});

export const { setDate, setUnansweredCount } = dailyChallengeSlice.actions;

export default dailyChallengeSlice.reducer;
