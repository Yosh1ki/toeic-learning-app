export interface QuestionIds {
  id: string;
  date: string;
  question_ids: string[];
  created_at: string;
}

export interface Question {
  id: string;
  part: string;
  question: string;
  choices: string[];
  correct_answer: string;
  explanation: string;
  is_answered?: boolean;
  created_at: string;
}
