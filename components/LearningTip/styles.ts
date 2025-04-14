import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
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

export const THEME_COLORS = {
  light: {
    background: "white",
    text: "black",
  },
  dark: {
    background: "white",
    text: "black",
  },
} as const;
