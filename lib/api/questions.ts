import {
  saveDailyQuestionsToLocalDB,
  saveQuestions,
  getLocalDailyQuestions,
  getLocalQuestions,
  isTodayQuestionsExist,
} from "@/db";
import { supabase } from "../supabase";
import { QuestionIds, Question } from "@/types/questionType";
import NetInfo from "@react-native-community/netinfo";

// オンライン時はSupabaseから取得、オフライン時はローカルDBから取得する
export const fetchQuestions = async () => {
  try {
    console.log("問題の取得を開始します...");

    // 今日の問題がすでにローカルDBに存在するか確認
    const todayQuestionsExist = await isTodayQuestionsExist();
    console.log(`今日の問題の存在チェック結果: ${todayQuestionsExist}`);

    if (todayQuestionsExist) {
      // 既に今日の問題が取得済みの場合はローカルDBから取得
      console.log("今日の問題は既に取得済みです。ローカルDBから取得します。");
      return await fetchQuestionsFromLocalDB();
    }

    console.log("今日の問題はまだ取得されていません。新たに取得します。");

    // ネットワーク接続状態を確認
    const netInfo = await NetInfo.fetch();
    console.log(
      `ネットワーク状態: 接続=${netInfo.isConnected}, インターネット=${netInfo.isInternetReachable}`
    );

    if (netInfo.isConnected && netInfo.isInternetReachable) {
      // オンライン: Supabaseからデータを取得
      console.log("オンライン状態です。Supabaseからデータを取得します。");
      return await fetchQuestionsFromSupabase();
    } else {
      // オフライン: ローカルDBからデータを取得
      console.log("オフライン状態です。ローカルDBからデータを取得します。");
      return await fetchQuestionsFromLocalDB();
    }
  } catch (error) {
    console.error("Error fetching questions:", error);
    // エラー発生時はローカルDBからの取得を試みる
    try {
      console.log(
        "エラーが発生しました。代わりにローカルDBからデータを取得します。"
      );
      return await fetchQuestionsFromLocalDB();
    } catch (localError) {
      console.error("Error fetching from local DB:", localError);
      throw localError;
    }
  }
};

// Supabaseからデータを取得する関数
const fetchQuestionsFromSupabase = async (): Promise<Question[]> => {
  try {
    console.log("Supabaseからデータを取得中...");

    // 今日の日付を取得（日本時間）
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const todayStr = `${year}-${month}-${day}`; // YYYY-MM-DD形式

    console.log(`今日の日付: ${todayStr}`);

    // daily_questionsの取得
    const { data, error } = await supabase
      .from("daily_questions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;

    // データがなければ空配列を返す
    if (!data) {
      console.log("Supabaseからデータが取得できませんでした");
      return [];
    }

    console.log("取得したデータ:", JSON.stringify(data));

    // 様々なケースを考慮してquestion_idsを取得
    let questionIds: string[] = [];
    try {
      if (typeof data.question_ids === "string") {
        // 文字列の場合はJSONとしてパース
        questionIds = JSON.parse(data.question_ids);
      } else if (Array.isArray(data.question_ids)) {
        // すでに配列の場合はそのまま使用
        questionIds = data.question_ids;
      } else if (data.question_ids) {
        // オブジェクトの場合は文字列化してパース
        questionIds = JSON.parse(JSON.stringify(data.question_ids));
      }
    } catch (parseError) {
      console.error("question_idsのパースに失敗:", parseError);
      console.log("問題のquestion_ids:", data.question_ids);
      // エラーが発生してもできるだけ続行する
      questionIds = [];
    }

    if (!Array.isArray(questionIds) || questionIds.length === 0) {
      console.log("有効な問題IDが見つかりませんでした");
      return [];
    }

    console.log(`${questionIds.length}個の問題IDを取得しました`);

    // 日付を常に今日の日付に設定してQuestionIdsオブジェクトを作成
    const dailyQuestions: QuestionIds = {
      id: `daily-${todayStr}`, // 日付を含むユニークなID
      date: todayStr,
      question_ids: questionIds,
      created_at: now.toISOString(),
    };

    // ローカルDBにdaily_questionsを保存
    await saveDailyQuestionsToLocalDB(dailyQuestions);

    // questionsの取得
    const { data: questions, error: questionsError } = await supabase
      .from("questions")
      .select("*")
      .in("id", questionIds);

    if (questionsError) throw questionsError;

    const fetchedQuestions = questions || [];
    console.log(`${fetchedQuestions.length}個の問題を取得しました`);

    // ローカルDBにquestionsを保存
    if (fetchedQuestions.length > 0) {
      await saveQuestions(fetchedQuestions);
    }

    return fetchedQuestions;
  } catch (error) {
    console.error("Error fetching from Supabase:", error);
    // エラー時はローカルDBからの取得を試みる
    return await fetchQuestionsFromLocalDB();
  }
};

// ローカルDBからデータを取得する関数
const fetchQuestionsFromLocalDB = async (): Promise<Question[]> => {
  // ローカルDBからdaily_questionsを取得
  const questionIds = await getLocalDailyQuestions();

  if (questionIds.length === 0) {
    return [];
  }

  // ローカルDBからquestionsを取得
  return await getLocalQuestions(questionIds);
};
