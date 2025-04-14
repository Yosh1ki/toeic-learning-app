import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { StyleProp, TextStyle } from "react-native";
import { StyleSheet } from "react-native";

type ThemedIconProps = {
  name: keyof typeof Feather.glyphMap;
  size?: number;
  style?: StyleProp<TextStyle>;
};

export const ThemedIcon = ({ name, size = 30, style = { textAlign: "right" } }: ThemedIconProps) => {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <Feather
      name={name}
      size={size}
      color={Colors[colorScheme].text}
      style={style}
    />
  );
};
