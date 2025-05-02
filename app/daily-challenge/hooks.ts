import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setDate, setUnansweredCount } from "@/store/dailyChallengeSlice";
import { setQuestions } from "@/store/questionsSlice";
import { fetchQuestions } from "@/lib/api/questions";
import { useEffect, useCallback } from "react";

const useDailyChallenge = () => {
  const dispatch = useDispatch();
  const { unansweredCount, date } = useSelector(
    (state: RootState) => state.dailyChallenge
  );
  const questions = useSelector(
    (state: RootState) => state.questions?.questions || []
  );

  const setCount = (count: number) => {
    dispatch(setUnansweredCount(count));
  };

  const generateFormattedDate = () => {
    const now = new Date();
    const todaysMonth = now.getMonth() + 1;
    const todaysDate = now.getDate();

    const DAY_OF_WEEK = ["日", "月", "火", "水", "木", "金", "土"];
    const todaysDay = DAY_OF_WEEK[now.getDay()];

    return `${todaysMonth}/${todaysDate} (${todaysDay}曜日)`;
  };

  // 問題を取得する関数
  const fetchAndSetQuestions = useCallback(async () => {
    try {
      // すでに問題が取得済みかどうかを確認
      if (questions.length > 0) {
        console.log(
          "問題は既にRedux状態に存在します。再取得をスキップします。"
        );
        return;
      }

      const fetchedQuestions = await fetchQuestions();
      dispatch(setQuestions(fetchedQuestions));

      // 未回答数を設定（すべての問題が未回答と仮定）
      if (fetchedQuestions.length > 0 && unansweredCount === 0) {
        dispatch(setUnansweredCount(fetchedQuestions.length));
      }
    } catch (error) {
      console.error("問題の取得中にエラーが発生しました:", error);
    }
  }, [dispatch, questions.length, unansweredCount]);

  useEffect(() => {
    if (!date) {
      dispatch(setDate(generateFormattedDate()));
    }
  }, [date, dispatch]);

  useEffect(() => {
    fetchAndSetQuestions();
  }, [fetchAndSetQuestions]);

  return { unansweredCount, date, setCount, questions };
};

export default useDailyChallenge;
