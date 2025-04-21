import React from "react";
import { View, TouchableOpacity } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { styles } from "./styles";

type Option = {
  id: string;
  text: string;
};

type QuestionCardProps = {
  question: string;
  options: Option[];
  correctAnswer: string;
  explanation: string;
  onPress: (optionId: string) => void;
  selectedOption: string | null;
  isCorrect: boolean;
  showExplanation: boolean;
};

export const QuestionCard = ({
  question,
  options,
  correctAnswer,
  explanation,
  onPress,
  selectedOption,
  isCorrect,
  showExplanation,
}: QuestionCardProps) => {
  return (
    <ThemedView style={styles.card}>
      <ThemedText type="subtitle" style={styles.question}>
        {question}
      </ThemedText>

      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionButton,
              selectedOption !== null &&
                (option.id === correctAnswer
                  ? styles.correctOption
                  : selectedOption === option.id
                  ? styles.incorrectOption
                  : null),
            ]}
            onPress={() => onPress(option.id)}
            disabled={selectedOption !== null}
          >
            <ThemedText style={styles.optionText}>
              {option.id}. {option.text}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      {showExplanation && (
        <ThemedView style={styles.explanationContainer}>
          <ThemedText
            type="defaultSemiBold"
            style={[
              styles.resultText,
              isCorrect ? styles.correctText : styles.incorrectText,
            ]}
          >
            {isCorrect ? "正解！" : "不正解"}
          </ThemedText>
          <ThemedText>{explanation}</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
};
