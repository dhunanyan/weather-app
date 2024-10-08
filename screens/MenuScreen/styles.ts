import { StyleSheet } from "react-native";
import { COLORS, MENU_SCREEN_Z_INDEX } from "@/config";

export const styling = (height: number) =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS.dark.background,
      flex: 1,
      padding: 0,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: MENU_SCREEN_Z_INDEX,
      height: height,
      // Box shadow for iOS
      shadowColor: "#000",
      shadowOffset: { width: -5, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      // Elevation for Android
      elevation: 10,
    },
    innerContainer: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 60,
    },
    paddingHorizontal: {
      paddingHorizontal: 16,
    },
    pressableContainer: {
      zIndex: 1,
      marginBottom: 5,
      marginRight: "auto",
    },
    pressable: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    icon: {
      height: "100%",
      color: COLORS.dark.title,
      marginRight: 2.5,
    },
    title: {
      height: "100%",
      lineHeight: 22,
      fontSize: 22,
      color: COLORS.dark.title,
    },
    flatList: {
      width: "100%",
    },
    flatListContentContainer: {
      paddingBottom: 60,
    },
    overlay: {
      pointerEvents: "none",
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 0,
      backgroundColor: "rgba(0, 0, 0, 0.55)",
    },
  });
