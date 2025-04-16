import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { styles } from "./styles";

export const DailyChallenge = () => {
  return (
    <ThemedView style={styles.dailyChallengeContainer}>
      <ThemedText style={styles.date}>6月25日 日曜日</ThemedText>
      <ThemedText style={[styles.date, styles.unanswered]}>
        1/5未回答
      </ThemedText>
      <ThemedText style={styles.arrow}>→</ThemedText>
    </ThemedView>
  );
};

//通知が発信されたら表示するコンポーネントだし、回答数や日付に応じてスタイルを変えたりもするので一旦このままで
