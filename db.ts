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
      is_answered BOOLEAN NOT NULL DEFAULT FALSE,
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
    // INSERT OR REPLACEを使用して、同じIDのレコードが存在する場合は上書きする
    await db.runAsync(
      `INSERT OR REPLACE INTO daily_questions (id, date, question_ids, created_at) VALUES (?, ?, ?, ?)`,
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

// ローカルのquestionsテーブルにデータを保存する関数
export const saveQuestions = async (questions: Question[]) => {
  try {
    for (const question of questions) {
      const choicesJson = JSON.stringify(question.choices);
      await db.runAsync(
        `INSERT OR REPLACE INTO questions 
        (id, part, question, choices, correct_answer, explanation, is_answered, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          question.id,
          question.part,
          question.question,
          choicesJson,
          question.correct_answer,
          question.explanation,
          question.is_answered || false, // is_answeredがない場合はfalseをデフォルト値とする
          question.created_at,
        ]
      );
    }
  } catch (error) {
    console.error("Error saving questions to local DB:", error);
    throw error;
  }
};

// ローカルDBから今日の問題IDを取得する関数
export const getLocalDailyQuestions = async (): Promise<string[]> => {
  try {
    // 今日の日付を取得（日本時間）
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const todayStr = `${year}-${month}-${day}`; // YYYY-MM-DD形式

    // 今日の日付の問題IDを取得
    const result = await db.getAllAsync(
      `SELECT question_ids FROM daily_questions WHERE date = ? ORDER BY created_at DESC LIMIT 1`,
      [todayStr]
    );

    if (result.length === 0) {
      console.log("今日の問題が見つかりませんでした");
      return [];
    }

    const row = result[0] as { question_ids: string };
    const parsedIds = JSON.parse(row.question_ids);
    console.log(`今日の問題ID ${parsedIds.length}個を取得しました`);
    return parsedIds;
  } catch (error) {
    console.error("Error getting daily questions from local DB:", error);
    return [];
  }
};

// ローカルDBから指定されたIDの問題を取得する関数
export const getLocalQuestions = async (
  questionIds: string[]
): Promise<Question[]> => {
  try {
    if (questionIds.length === 0) {
      return [];
    }

    // IN句で使用するためのプレースホルダーを作成
    const placeholders = questionIds.map(() => "?").join(",");

    const result = await db.getAllAsync(
      `SELECT * FROM questions WHERE id IN (${placeholders})`,
      questionIds
    );

    if (result.length === 0) {
      return [];
    }

    // 結果を整形して返す
    return result.map((row: any) => ({
      id: row.id,
      part: row.part,
      question: row.question,
      choices: JSON.parse(row.choices),
      correct_answer: row.correct_answer,
      explanation: row.explanation,
      is_answered: row.is_answered === 1, // SQLiteでは真偽値は0/1で表されるため変換
      created_at: row.created_at,
    }));
  } catch (error) {
    console.error("Error getting questions from local DB:", error);
    return [];
  }
};

// 今日の問題がすでにローカルDBに存在するか確認する関数
export const isTodayQuestionsExist = async (): Promise<boolean> => {
  try {
    // 今日の日付を取得（日本時間）
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const todayStr = `${year}-${month}-${day}`; // YYYY-MM-DD形式

    console.log(`今日の日付で検索します: ${todayStr}`);

    // データベース内のすべての日付を確認（デバッグ用）
    const allDates = await db.getAllAsync(
      `SELECT id, date FROM daily_questions ORDER BY date DESC`
    );

    console.log("データベース内の日付:", JSON.stringify(allDates));

    // 正確に今日の日付のレコードがあるか確認（exactMatch）
    const exactMatch = await db.getAllAsync(
      `SELECT COUNT(*) as count FROM daily_questions WHERE date = ?`,
      [todayStr]
    );

    // LIKEを使った場合の結果も確認（デバッグ用）
    const likeMatch = await db.getAllAsync(
      `SELECT COUNT(*) as count FROM daily_questions WHERE date LIKE ?`,
      [`${todayStr}%`]
    );

    if (exactMatch.length === 0) {
      return false;
    }

    const exactRow = exactMatch[0] as { count: number };
    const likeRow = likeMatch[0] as { count: number };

    console.log(`完全一致: ${exactRow.count}件, 部分一致: ${likeRow.count}件`);

    // 完全に一致する日付のみを使用して判定
    return exactRow.count > 0;
  } catch (error) {
    console.error("Error checking if today's questions exist:", error);
    return false;
  }
};

// ここから下はデバッグ用関数

// データベースを再初期化する関数（既存のテーブルを削除して再作成）
export const reinitDatabase = async () => {
  try {
    console.log("データベースを再初期化しています...");
    // 既存のテーブルを削除
    await db.execAsync(`DROP TABLE IF EXISTS daily_questions`);
    await db.execAsync(`DROP TABLE IF EXISTS questions`);

    // テーブルを再作成
    await initDatabase();
    console.log("データベースの再初期化が完了しました");
    return true;
  } catch (error) {
    console.error("データベース再初期化エラー:", error);
    return false;
  }
};

// データベースのテーブル一覧を取得する関数
export const getTablesList = async (): Promise<string[]> => {
  try {
    const result = await db.getAllAsync(
      `SELECT name FROM sqlite_master WHERE type='table'`
    );
    return result.map((row: any) => row.name as string);
  } catch (error) {
    console.error("テーブル一覧の取得に失敗:", error);
    return [];
  }
};

// テーブルの内容を取得する関数
export const getTableContent = async (tableName: string): Promise<any[]> => {
  try {
    const result = await db.getAllAsync(`SELECT * FROM ${tableName}`);
    return result;
  } catch (error) {
    console.error(`${tableName}テーブルの内容取得に失敗:`, error);
    return [];
  }
};

// テーブルのスキーマ（カラム情報）を取得する関数
export const getTableSchema = async (tableName: string): Promise<any[]> => {
  try {
    const result = await db.getAllAsync(`PRAGMA table_info(${tableName})`);
    return result;
  } catch (error) {
    console.error(`${tableName}テーブルのスキーマ取得に失敗:`, error);
    return [];
  }
};

// 強制的に日付を更新する関数（デバッグ用）
export const forceUpdateDate = async (): Promise<boolean> => {
  try {
    // 今日の日付を取得（日本時間）
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const todayStr = `${year}-${month}-${day}`; // YYYY-MM-DD形式

    console.log(`日付を強制的に更新します: ${todayStr}`);

    // daily_questionsテーブル内のすべての行の日付を今日の日付に更新
    await db.runAsync(`UPDATE daily_questions SET date = ?`, [todayStr]);

    console.log("日付の更新が完了しました");
    return true;
  } catch (error) {
    console.error("Error updating dates:", error);
    return false;
  }
};
