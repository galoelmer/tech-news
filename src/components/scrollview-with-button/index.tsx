import { useRef } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  ScrollViewProps
} from 'react-native';

import StyleSheet from 'react-native-media-query';
import { IconButton, IconButtonProps } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import { isWeb } from 'utils/checkPlatform';

interface ScrollToTopProps extends React.PropsWithChildren<{}> {
  scrollviewStyles?: ScrollViewProps['style'];
  buttonStyles?: IconButtonProps['style'];
}

const ScrollViewWithButton = ({
  children,
  scrollviewStyles,
  buttonStyles
}: ScrollToTopProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const offset = useSharedValue(0);
  const { width, height } = Dimensions.get('window');

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: offset.value < 0 ? offset.value : height },
        ...(isWeb ? [] : [{ translateX: width - 60 }])
      ]
    };
  });

  const handleOnPress = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handScroll = ({
    nativeEvent
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (nativeEvent.contentOffset.y > 250) {
      offset.value = withSpring(-100, {
        damping: 20,
        stiffness: 90
      });
    } else {
      offset.value = withSpring(height);
    }
  };

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        bounces={false}
        showsVerticalScrollIndicator={false}
        onScroll={handScroll}
        scrollEventThrottle={20}
        style={scrollviewStyles}
      >
        <>{children}</>
      </ScrollView>
      <Animated.View
        style={[styles.container, animatedStyles]}
        dataSet={{ media: ids.container }}
      >
        <IconButton
          onPress={handleOnPress}
          icon="arrow-up-thick"
          size={30}
          iconColor="#fff"
          style={[styles.icon, buttonStyles]}
        />
      </Animated.View>
    </>
  );
};

export default ScrollViewWithButton;

const { styles, ids } = StyleSheet.create({
  container: {
    ...(isWeb && {
      alignItems: 'flex-end',
      flex: 0
    })
  },
  icon: {
    backgroundColor: isWeb ? 'rgba(95,141,218,0.45)' : 'rgba(95,141,218, 0.25)'
  }
});
