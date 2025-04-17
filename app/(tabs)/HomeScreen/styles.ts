import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 15,
    alignItems: "center",
  },
  scrollContainer: {
    flex: 1,
  },
  counters: {
    flexDirection: "row",
    gap: 30,
    justifyContent: "center",
    marginTop: 30,
  },
  timeContainer: {
    marginLeft: 10,
    marginVertical: 20,
    flexDirection: "row",
  },
  paragraph: {
    fontWeight: "bold",
    fontSize: 20,
  },
  time: {
    marginLeft: 20,
  },
  dailyChallengeContainer: {
    marginTop: 20,
    marginLeft: 5,
  },
  afterChallengeContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  afterChallengeText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
