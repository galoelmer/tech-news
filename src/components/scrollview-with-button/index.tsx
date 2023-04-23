import { useState, useRef } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ScrollViewProps,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { IconButton, IconButtonProps } from "react-native-paper";

import { isWeb } from "utils/checkPlatform";

interface ScrollToTopProps extends React.PropsWithChildren<{}> {
  scrollviewStyles?: ScrollViewProps["style"];
  buttonStyles?: IconButtonProps["style"];
}

const ScrollViewWithButton = ({
  children,
  scrollviewStyles,
  buttonStyles,
}: ScrollToTopProps) => {
  const [displayButton, setDisplayButton] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleOnPress = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    setDisplayButton(false);
  };

  const handScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (nativeEvent.contentOffset.y > 250) {
      setDisplayButton(true);
    } else {
      setDisplayButton(false);
    }
  };

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        bounces={false}
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={handScroll}
        onScroll={isWeb ? handScroll : undefined}
        scrollEventThrottle={20}
        style={scrollviewStyles}
      >
        <>{children}</>
      </ScrollView>
      {displayButton && (
        <View>
          <IconButton
            onPress={handleOnPress}
            icon="arrow-up-thick"
            size={30}
            iconColor="#fff"
            style={[styles.icon, buttonStyles]}
          />
        </View>
      )}
    </>
  );
};

export default ScrollViewWithButton;

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    bottom: 20,
    right: 10,
    backgroundColor: isWeb ? "rgba(95,141,218,0.45)" : "rgba(95,141,218, 0.25)",
  },
});
