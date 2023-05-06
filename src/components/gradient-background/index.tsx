import { View, StyleSheet } from "react-native";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";

import WelcomeToast from "components/welcome-toast";

interface GradientBackgroundProps extends Partial<LinearGradientProps> {}

const GradientBackground = ({
  children,
  colors = ["#fff", "#FAF7FF"],
  start,
  end,
}: GradientBackgroundProps) => (
  <View style={styles.container}>
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={styles.gradient}
    />
    <>
      {children}
      <WelcomeToast />
    </>
  </View>
);

export default GradientBackground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
});
