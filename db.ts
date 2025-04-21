import { Question, QuestionIds } from "./types/questionType";
import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("mydb.db");

export const initDatabase = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS daily_questions (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      question_ids TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS questions (
      id TEXT PRIMARY KEY,
      part TEXT,
      question TEXT NOT NULL,
      choices TEXT NOT NULL,
      correct_answer TEXT NOT NULL,
      explanation TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);
};

// 初期化を実行
initDatabase().catch((error) => {
  console.error("データベース初期化エラー:", error);
});

// ローカルのdaily_questionsテーブルにデータを保存する関数
export const saveDailyQuestionsToLocalDB = async (
  dailyQuestions: QuestionIds
) => {
  try {
    const questionIdsJson = JSON.stringify(dailyQuestions.question_ids);
    await db.runAsync(
      `INSERT INTO daily_questions (id, date, question_ids, created_at) VALUES (?, ?, ?, ?)`,
      [
        dailyQuestions.id,
        dailyQuestions.date,
        questionIdsJson,
        dailyQuestions.created_at,
      ]
    );
  } catch (error) {
    console.error("Error saving daily questions to local DB:", error);
    throw error;
  }
};
