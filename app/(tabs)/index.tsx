import { ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import LearningTip from "@/components/LearningTip/LearningTip";
import { ThemedIcon } from "@/components/ThemedIcon";
import { Counter } from "@/components/Counter/Conter";
import { DailyChallengeBox } from "@/components/DailyChallenge/DailyChallengeBox";
import useDailyChallenge from "@/app/daily-challenge/hooks";
import { styles } from "./HomeScreen/styles";
import { useHomeScreen } from "./HomeScreen/hooks";

export default function HomeScreen() {
  const { navigateToDailyChallenge, navigateToAnswerHistory } = useHomeScreen();
  const { unansweredCount, date } = useDailyChallenge();

  return (
    <ThemedView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollContainer}>
        <ThemedIcon name="bell" />
        <LearningTip>1日5問でいいんだよ？</LearningTip>
        <ThemedView style={styles.counters}>
          <Counter
            count={0}
            caption={"回答済み"}
            onPress={navigateToAnswerHistory}
          />
          <Counter count={0} caption={"連続日数"} onPress={() => {}} />
        </ThemedView>
        <ThemedView style={styles.dailyChallengeContainer}>
          {unansweredCount === 0 ? (
            <ThemedView style={styles.afterChallengeContainer}>
              <ThemedText style={styles.afterChallengeText}>
                お疲れ様！{"\n"}今日も継続できててえらい🥺
              </ThemedText>
            </ThemedView>
          ) : (
            <ThemedView>
              <ThemedView style={styles.timeContainer}>
                <ThemedText style={styles.paragraph}>残り時間</ThemedText>
                {/* 問題生成されてから20時間 */}
                <ThemedText style={[styles.paragraph, styles.time]}>
                  10:24
                </ThemedText>
              </ThemedView>
              <DailyChallengeBox
                date={date}
                unansweredCount={unansweredCount}
                onPress={navigateToDailyChallenge}
                caption={"未回答"}
              />
            </ThemedView>
          )}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}
