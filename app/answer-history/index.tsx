import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { styles } from "./styles";
import { Stack } from "expo-router";

export default function AnswerHistoryScreen() {
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: "今まで解いた問題" }} />
      <ThemedText>回答履歴</ThemedText>
    </ThemedView>
  );
}
