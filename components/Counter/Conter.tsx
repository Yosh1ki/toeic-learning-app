import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { styles } from "./styles";
import { TouchableOpacity } from "react-native";
type CounterProps = {
  count: number;
  caption: string;
  onPress?: () => void;
};

export const Counter = ({ count, caption, onPress }: CounterProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
    <ThemedView style={styles.container}>
      <ThemedText style={styles.count}>{count}</ThemedText>
        <ThemedText style={styles.caption}>{caption}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
};