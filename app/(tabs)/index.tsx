import { StyleSheet, ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { QuestionCard } from "@/components/QuestionCard";
import { part5Questions } from "@/data/part5Questions";
import { Feather } from "@expo/vector-icons";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container} lightColor="white" darkColor="black">
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollContainer}>
        <Feather name="bell" size={32} color="black" style={styles.bellicon} />
        <View style={styles.shadowContainer}>
          <ThemedText type="default" style={styles.text}>
            💡1日5問でいいんだよ？
          </ThemedText>
        </View>
        <View>
          
        </View>
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
  bellicon: {
    textAlign: "right",
  },
  shadowContainer: {
    maxWidth: 220,
    alignSelf: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    maxWidth: 200,
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
