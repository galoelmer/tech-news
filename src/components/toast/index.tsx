import { StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";
import Animated, { SlideInDown } from "react-native-reanimated";

import { closeSnackbar } from "@/context/reducers/ui-reducer";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";

const Toast = () => {
  const dispatch = useAppDispatch();
  const tabBarHeight = useAppSelector((state) => state.ui.tabBarHeight);
  const { isOpen, message } = useAppSelector((state) => state.ui.snackbar);

  if (!isOpen) return null;

  const onDismissSnackBar = () => {
    dispatch(closeSnackbar());
  };

  return (
    <Animated.View
      entering={SlideInDown.duration(800)}
      style={styles.container}
    >
      <Snackbar
        visible
        onDismiss={onDismissSnackBar}
        duration={3500}
        action={{
          label: "X",
          onPress: onDismissSnackBar,
        }}
        style={{
          backgroundColor: "#2b486b",
          marginHorizontal: 20,
          marginBottom: tabBarHeight ?? 60,
        }}
      >
        {message}
      </Snackbar>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
});

export default Toast;
