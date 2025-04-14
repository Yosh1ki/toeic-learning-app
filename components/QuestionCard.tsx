import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

type Option = {
  id: string;
  text: string;
};

type QuestionCardProps = {
  question: string;
  options: Option[];
  correctAnswer: string;
  explanation: string;
};

export const QuestionCard = ({
  question,
  options,
  correctAnswer,
  explanation,
}: QuestionCardProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setShowExplanation(true);
  };

  const isCorrect = selectedOption === correctAnswer;

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
              selectedOption === option.id &&
                (selectedOption === correctAnswer
                  ? styles.correctOption
                  : styles.incorrectOption),
            ]}
            onPress={() => handleOptionSelect(option.id)}
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

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  question: {
    marginBottom: 16,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
  optionText: {
    fontSize: 16,
  },
  correctOption: {
    backgroundColor: "rgba(76, 175, 80, 0.2)",
    borderColor: "#4CAF50",
  },
  incorrectOption: {
    backgroundColor: "rgba(244, 67, 54, 0.2)",
    borderColor: "#F44336",
  },
  explanationContainer: {
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  resultText: {
    marginBottom: 8,
    fontSize: 16,
  },
  correctText: {
    color: "#4CAF50",
  },
  incorrectText: {
    color: "#F44336",
  },
});
