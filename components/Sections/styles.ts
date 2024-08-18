import { Dimensions, StatusBar, StyleSheet } from "react-native";
import { FOOTER_HEIGHT, HEADER_OFFSET } from "@/config";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight as number,
    maxWidth: Dimensions.get("window").width,
    zIndex: 1,
  },
  sectionList: {
    padding: 16,
    marginTop: HEADER_OFFSET,
    minWidth: "100%",
    minHeight: Dimensions.get("window").height - FOOTER_HEIGHT - HEADER_OFFSET,
  },
  activityIndicatorContainer: {
    padding: 16,
    minWidth: "100%",
    minHeight: Dimensions.get("window").height - FOOTER_HEIGHT,
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  errorTextContainer: {
    padding: 16,
    minWidth: "100%",
    minHeight: Dimensions.get("window").height - FOOTER_HEIGHT,
  },
});
