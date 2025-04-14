import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native";

export default function ExploreScreen() {
  return (
    <ThemedView style={styles.container}>
      <StatusBar style="auto" />
      <ThemedView style={styles.header}>
        <ThemedText type="title">TOEIC学習ガイド</ThemedText>
      </ThemedView>

      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.section}>
          <ThemedView style={styles.sectionHeader}>
            <Feather name="book-open" size={24} color="#4169E1" />
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Part 5: 短文穴埋め問題
            </ThemedText>
          </ThemedView>
          <ThemedText style={styles.paragraph}>
            Part
            5では、短い文章の中の空欄に当てはまる適切な単語を選ぶ問題が出題されます。文法知識や語彙力が試されます。
          </ThemedText>
          <ThemedView style={styles.tips}>
            <ThemedText type="defaultSemiBold">学習のコツ:</ThemedText>
            <ThemedText>
              • 品詞（名詞、動詞、形容詞など）の使い方を確認
            </ThemedText>
            <ThemedText>• 時制や態（能動態・受動態）に注意</ThemedText>
            <ThemedText>• 前置詞の使い方を復習</ThemedText>
            <ThemedText>• 接続詞と関係代名詞の用法を理解</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedView style={styles.sectionHeader}>
            <Feather name="clock" size={24} color="#4169E1" />
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              学習計画
            </ThemedText>
          </ThemedView>
          <ThemedText style={styles.paragraph}>
            毎日10問ずつ解くことで、少しずつ実力が身につきます。間違えた問題は復習して、苦手な文法項目を特定しましょう。
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedView style={styles.sectionHeader}>
            <Feather name="award" size={24} color="#4169E1" />
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              点数目標
            </ThemedText>
          </ThemedView>
          <ThemedText style={styles.paragraph}>
            Part
            5は30問で構成され、各問1点の配点です。25問以上正解することを目指しましょう。
          </ThemedText>
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
    marginBottom: 20,
    alignItems: "center",
  },
  scrollContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    marginLeft: 8,
  },
  paragraph: {
    lineHeight: 22,
    marginBottom: 12,
  },
  tips: {
    backgroundColor: "rgba(65, 105, 225, 0.1)",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
});
