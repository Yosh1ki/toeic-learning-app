import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from "./styles";
import { Stack } from "expo-router";
import { QuestionCard } from "@/components/QuestionCard";
import { part5Questions } from "@/data/part5Questions";

export default function DailyChallengeScreen() {
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: "デイリーチャレンジ🤩" }} />
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollContainer}>
        {part5Questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question.question}
            options={question.options}
            correctAnswer={question.correctAnswer}
            explanation={question.explanation}
          />
        ))}
      </ScrollView>
    </ThemedView>
  );
}
