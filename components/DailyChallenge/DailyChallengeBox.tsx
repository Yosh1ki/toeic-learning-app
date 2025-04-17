import { TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { styles } from "./styles";

type DailyChallengeProps = {
  date: string;
  unansweredCount: number;
  caption: string;
  onPress: () => void;
};

export const DailyChallengeBox = ({
  date,
  unansweredCount,
  caption,
  onPress,
}: DailyChallengeProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView style={styles.dailyChallengeContainer}>
        <ThemedText style={styles.date}>{date}</ThemedText>
        <ThemedText style={[styles.unanswered]}>
          {unansweredCount}/5{caption}
        </ThemedText>
        <ThemedText style={styles.arrow}>→</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
};

//通知が発信されたら表示するコンポーネントだし、回答数や日付に応じてスタイルを変えたりもするので一旦このままで
