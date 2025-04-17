import { useRouter } from "expo-router";

export function useHomeScreen() {
  const router = useRouter();

  const navigateToDailyChallenge = () => {
    router.push("/daily-challenge");
  };

  const navigateToAnswerHistory = () => {
    router.push("/answer-history");
  };

  return {
    navigateToDailyChallenge,
    navigateToAnswerHistory,
  };
}
