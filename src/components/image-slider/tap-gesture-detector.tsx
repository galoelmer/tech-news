import { PropsWithChildren } from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import { isWeb } from "utils/checkPlatform";

interface TapGestureDetectorProps
  extends PropsWithChildren<{ onPress: () => void }> {}

const TapGestureDetector = ({ children, onPress }: TapGestureDetectorProps) => {
  if (isWeb) {
    return <>{children}</>;
  }

  const tapGesture = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => onPress())
    .runOnJS(true);

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={tapGesture}>{children}</GestureDetector>
    </GestureHandlerRootView>
  );
};

export default TapGestureDetector;
