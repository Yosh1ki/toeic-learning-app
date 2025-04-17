import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setDate, setUnansweredCount } from "@/store/dailyChallengeSlice";
import { useEffect } from "react";

export const useDailyChallenge = () => {
  const dispatch = useDispatch();
  const { unansweredCount, date } = useSelector(
    (state: RootState) => state.dailyChallenge
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

  useEffect(() => {
    if (!date) {
      dispatch(setDate(generateFormattedDate()));
    }
  }, [date, dispatch]);

  return { unansweredCount, date, setCount };
};
