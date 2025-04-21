import { saveDailyQuestionsToLocalDB } from "@/db";
import { supabase } from "../supabase";
import { QuestionIds, Question } from "@/types/questionType";
import NetInfo from "@react-native-community/netinfo";

// // オンライン時はSupabaseから取得、オフライン時はローカルDBから取得する
// export const fetchQuestions = async () => {
//   try {
//     // ネットワーク接続状態を確認
//     const netInfo = await NetInfo.fetch();

//     if (netInfo.isConnected && netInfo.isInternetReachable) {
//       // オンライン: Supabaseからデータを取得
//       return await fetchQuestionsFromSupabase();
//     } else {
//       // オフライン: ローカルDBからデータを取得
//       return await fetchQuestionsFromLocalDB();
//     }
//   } catch (error) {
//     console.error("Error fetching questions:", error);
//     // エラー発生時はローカルDBからの取得を試みる
//     try {
//       return await fetchQuestionsFromLocalDB();
//     } catch (localError) {
//       console.error("Error fetching from local DB:", localError);
//       throw localError;
//     }
//   }
// };

// // Supabaseからデータを取得する関数
// const fetchQuestionsFromSupabase = async (): Promise<Question[]> => {
//   try {
//     // daily_questionsの取得
//     const { data, error } = await supabase
//       .from("daily_questions")
//       .select("question_ids")
//       .order("created_at", { ascending: false })
//       .limit(1)
//       .single();

//     if (error) throw error;

//     const questionIds = data?.question_ids ? JSON.parse(data.question_ids) : [];

//     if (questionIds.length === 0) {
//       return [];
//     }

//     // ローカルDBにdaily_questionsを保存
//     await saveDailyQuestionsToLocalDB(questionIds);

//     // questionsの取得
//     const { data: questions, error: questionsError } = await supabase
//       .from("questions")
//       .select("*")
//       .in("id", questionIds);

//     if (questionsError) throw questionsError;

//     const fetchedQuestions = questions || [];

//     // ローカルDBにquestionsを保存
//     if (fetchedQuestions.length > 0) {
//       await saveQuestions(fetchedQuestions);
//     }

//     return fetchedQuestions;
//   } catch (error) {
//     console.error("Error fetching from Supabase:", error);
//     // エラー時はローカルDBからの取得を試みる
//     return await fetchQuestionsFromLocalDB();
//   }
// };

// // ローカルDBからデータを取得する関数
// const fetchQuestionsFromLocalDB = async (): Promise<Question[]> => {
//   // ローカルDBからdaily_questionsを取得
//   const questionIds = await getLocalDailyQuestions();

//   if (questionIds.length === 0) {
//     return [];
//   }

//   // ローカルDBからquestionsを取得
//   return await getLocalQuestions(questionIds);
// };
