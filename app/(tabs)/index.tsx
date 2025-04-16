import { StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import LearningTip from "@/components/LearningTip/LearningTip";
import { ThemedIcon } from "@/components/ThemedIcon";
import { QuestionCard } from "@/components/QuestionCard";
import { part5Questions } from "@/data/part5Questions";
import { Counter } from "@/components/Counter/Conter";
import { DailyChallenge } from "@/components/DailyChallenge/DailyChallenge";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollContainer}>
        <ThemedIcon name="bell" />
        <LearningTip>1日5問でいいんだよ？</LearningTip>
        <ThemedView style={styles.counters}>
          <Counter count={0} caption={"回答済み"} />
          <Counter count={0} caption={"連続日数"} />
        </ThemedView>
        <ThemedView style={styles.timeContainer}>
          <ThemedText style={styles.paragraph}>残り時間</ThemedText>
          <ThemedText style={[styles.paragraph, styles.time]}>10:24</ThemedText>
        </ThemedView>
        <ThemedView style={styles.dailyChallengeContainer}>
          <DailyChallenge />
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 15,
    alignItems: "center",
  },
  scrollContainer: {
    flex: 1,
  },
  counters: {
    flexDirection: "row",
    gap: 30,
    justifyContent: "center",
    marginTop: 30,
  },
  timeContainer: {
    marginLeft: 10,
    marginTop: 30,
    flexDirection: "row",
  },
  paragraph: {
    fontWeight: "bold",
    fontSize: 20,
  },
  time: {
    marginLeft: 20,
  },
  dailyChallengeContainer: {
    marginTop: 20,
    marginLeft: 5,
  },
});

// {part5Questions.map((question) => (
//   <QuestionCard
//     key={question.id}
//     question={question.question}
//     options={question.options}
//     correctAnswer={question.correctAnswer}
//     explanation={question.explanation}
//   />
// ))}
