import { StyleSheet, View } from 'react-native';

import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';

type GradientBackgroundProps = Partial<LinearGradientProps>;

const GradientBackground = ({
  children,
  colors = ['#fff', '#FAF7FF'],
  start,
  end
}: GradientBackgroundProps) => (
  <View style={styles.container}>
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={styles.gradient}
    />
    <>{children}</>
  </View>
);

export default GradientBackground;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  gradient: {
    position: 'absolute',
    height: '100%',
    width: '100%'
  }
});
