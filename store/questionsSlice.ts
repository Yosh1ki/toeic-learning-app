import { createSlice } from "@reduxjs/toolkit";
import { Question } from "@/types/questionType";

interface QuestionsState {
  questions: Question[];
}

const initialState: QuestionsState = {
  questions: [],
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload
    },
  }
})

export const { setQuestions } = questionsSlice.actions;

export default questionsSlice.reducer;