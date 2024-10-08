import * as React from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  Text,
  View,
  Vibration,
} from "react-native";
import { BlurView } from "expo-blur";
import { Audio } from "expo-av";

import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

import { getMenuSectionData, removeLocation } from "@/api";

import { LocationType, MenuSectionDataType } from "@/types";
import { COLORS, IMAGES, AUDIOS } from "@/config";

import { styling } from "./styles";

export type MenuSectionPropsType = {
  location: LocationType;
  refetchLocations: () => Promise<void>;
};

export const MenuSection = ({
  location,
  refetchLocations,
}: MenuSectionPropsType) => {
  const { width } = Dimensions.get("window");
  const styles = styling(width);

  const [data, setData] = React.useState<MenuSectionDataType | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isError, setIsError] = React.useState<boolean>(false);

  const [scrollViewDisplay, setScrollViewDisplay] = React.useState<
    "flex" | "none"
  >("flex");

  const deleteContainerTranslate = React.useRef(new Animated.Value(80)).current;
  const scrollViewTranslate = React.useRef(new Animated.Value(0)).current;
  const scrollViewHeight = React.useRef(new Animated.Value(120)).current;
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
      useNativeDriver: false,
    })(e);

    if ((scrollX as any)._value > 0) {
      Animated.timing(deleteContainerTranslate, {
        toValue: 0,
        duration: 50,
        useNativeDriver: false,
      }).start();
    }

    if ((scrollX as any)._value < 80) {
      Animated.timing(deleteContainerTranslate, {
        toValue: 80,
        duration: 50,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleDeletePress = async () => {
    Vibration.vibrate(10);

    const soundObject = new Audio.Sound();
    await soundObject.loadAsync(AUDIOS.delete);
    await soundObject.playAsync();

    Animated.timing(scrollViewTranslate, {
      toValue: -width,
      duration: 400,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(scrollViewHeight, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(async () => {
        setScrollViewDisplay("none");
        await removeLocation(location);
        setIsLoading(true);
        await refetchLocations();
        setIsLoading(false);
      });
    });
  };

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const menuSectionData = await getMenuSectionData(location);

        setData(menuSectionData);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [location]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color={COLORS.dark.title} />
        </View>
      </View>
    );
  }

  if (isError || data === null) {
    return (
      <View style={styles.container}>
        <View style={styles.errorTextContainer}>
          <Text>Something went wrong</Text>
        </View>
      </View>
    );
  }

  return (
    <Animated.ScrollView
      style={[
        styles.container,
        {
          transform: [{ translateX: scrollViewTranslate }],
          height: scrollViewHeight,
          display: scrollViewDisplay,
        },
      ]}
      onScroll={handleScroll}
      horizontal
      contentContainerStyle={styles.containerContent}
      showsHorizontalScrollIndicator={false}
    >
      <View style={[styles.swipeContainer]}>
        <ImageBackground
          source={IMAGES.background}
          resizeMode="stretch"
          style={styles.imageBackground}
        />
        <BlurView
          intensity={26}
          style={[
            styles.contentContainer,
            isLoading || isError || data === null
              ? styles.contentContainerNotLoaded
              : {},
          ]}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.dark.title} />
          ) : isError || data === null ? (
            <View style={styles.errorContainer}>
              <AntDesign style={styles.errorIcon} name="warning" size={16} />
              <Text style={styles.errorText}>Failed to load weather data</Text>
            </View>
          ) : (
            <>
              <View style={[styles.content, styles.leftContent]}>
                <Text style={styles.location}>{data.location}</Text>
                <Text style={styles.time}>{data.time}</Text>
                <Text style={styles.conditions}>{data.conditions}</Text>
              </View>
              <View style={[styles.content, styles.rightContent]}>
                <Text style={styles.temp}>{data.temp}</Text>
                <Text style={styles.minMaxTemp}>{data.minMaxTemp}</Text>
              </View>
            </>
          )}
        </BlurView>
      </View>
      {location.id !== "CURRENT_LOCATION" &&
        !isLoading &&
        data !== null &&
        !isError && (
          <Animated.View
            style={[
              styles.deleteContainer,
              { transform: [{ translateX: deleteContainerTranslate }] },
            ]}
          >
            <Pressable onPress={handleDeletePress}>
              <Ionicons name="trash" size={24} color="white" />
            </Pressable>
          </Animated.View>
        )}
    </Animated.ScrollView>
  );
};
