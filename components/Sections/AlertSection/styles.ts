import { COLORS, IS_PLATFORM } from "@/config";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  alertContainer: {
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    marginVertical: 5,
    padding: 10,
    minHeight: 140,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "hidden",
  },
  titleContainer: {
    minWidth: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  icon: {
    color: COLORS.dark.title,
  },
  title: {
    color: COLORS.dark.title,
    fontSize: 20,
    fontWeight: IS_PLATFORM.ANDROID ? "800" : 800,
    marginLeft: 5,
    textAlign: "justify",
  },
  description: {
    color: COLORS.dark.title,
    fontSize: 16,
    textAlign: "justify",
    marginVertical: 10,
  },
  footer: {
    color: COLORS.dark.title,
    fontSize: 15,
    opacity: 0.7,
    textAlign: "justify",
  },
  activityIndicatorContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    minWidth: "100%",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  errorTextContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    minWidth: "100%",
  },
});
