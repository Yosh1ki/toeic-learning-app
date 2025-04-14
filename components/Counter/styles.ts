import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    maxWidth: 200,
    backgroundColor: "white",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },
  count: {
    color: "#2C00DD",
    fontSize: 40,
    lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  caption: {
    color: "#766E6E",
  },
});