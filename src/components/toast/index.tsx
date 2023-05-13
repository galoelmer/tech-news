import { StyleSheet, View } from "react-native";
import { Snackbar, Text } from "react-native-paper";
import Animated, { SlideInDown } from "react-native-reanimated";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { closeSnackbar } from "@/context/reducers/ui-reducer";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";

// TODO: create toast with identification keys
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
        onIconPress={onDismissSnackBar}
        icon="close"
        style={{
          backgroundColor: "#2b486b",
          marginHorizontal: 50,
          marginBottom: tabBarHeight ?? 60,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon name="bookmark-plus" size={25} color="#eef3fb" />
          <Text
            style={{
              fontFamily: "RobotoBold",
              fontSize: 16,
              letterSpacing: 1,
              color: "#eef3fb",
              marginLeft: 5,
            }}
          >
            {message}
          </Text>
        </View>
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
