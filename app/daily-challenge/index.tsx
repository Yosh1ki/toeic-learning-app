import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "./styles";
import { Stack } from "expo-router";
import { QuestionCard } from "@/components/QuestionCard/QuestionCard";
import { Question } from "@/types/questionType";
import useDailyChallenge from "./hooks";
import { useState } from "react";

export default function DailyChallengeScreen() {
  const { questions } = useDailyChallenge();

  // 各質問IDに対する選択された回答を保存する
  const [selectedOptions, setSelectedOptions] = useState<{
    [questionId: string]: string;
  }>({});
  const [answeredQuestions, setAnsweredQuestions] = useState<{
    [questionId: string]: boolean;
  }>({});
  const dailyChallenge = useDailyChallenge();
  const { unansweredCount, setCount } = dailyChallenge;

  const handleOptionSelect = (questionId: string, optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
    setAnsweredQuestions((prev) => ({
      ...prev,
      [questionId]: true,
    }));
    setCount(unansweredCount - 1);
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: "デイリーチャレンジ🤩" }} />
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollContainer}>
        {questions?.map((question: Question) => {
          const correctAnswerOption = String.fromCharCode(
            65 + question.choices.indexOf(question.correct_answer)
          );

          return (
            <QuestionCard
              key={question.id}
              question={question.question}
              options={question.choices.map((choice, index) => ({
                id: String.fromCharCode(65 + index), //A,B,C,D
                text: choice,
              }))}
              correctAnswer={correctAnswerOption}
              explanation={question.explanation}
              onPress={(optionId) => handleOptionSelect(question.id, optionId)}
              selectedOption={selectedOptions[question.id] || null}
              isCorrect={selectedOptions[question.id] === correctAnswerOption}
              showExplanation={!!answeredQuestions[question.id]}
            />
          );
        })}
      </ScrollView>
    </ThemedView>
  );
}
