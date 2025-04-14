import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { styles } from "./styles";

type CounterProps = {
  count: number;
  caption: string;
};

export const Counter = ({ count, caption }: CounterProps) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.count}>{count}</ThemedText>
      <ThemedText style={styles.caption}>{caption}</ThemedText>
    </ThemedView>
  );
};