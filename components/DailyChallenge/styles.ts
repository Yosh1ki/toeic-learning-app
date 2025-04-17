import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  dailyChallengeContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    maxWidth: 350,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },
  date: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#000",
  },
  unanswered: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#F31010",
    marginLeft: 10,
  },
  arrow: {
    color: "#2C00DD",
    fontSize: 30,
    fontWeight: "semibold",
    lineHeight: 30,
    flex: 1,
    textAlign: "right",
  },
});