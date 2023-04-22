import { PropsWithChildren } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

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

  return <GestureDetector gesture={tapGesture}>{children}</GestureDetector>;
};

export default TapGestureDetector;
