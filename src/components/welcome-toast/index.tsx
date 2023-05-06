import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";

import useAuth from "hooks/useAuth";

const WelcomeToast = () => {
  const { isAuth } = useAuth();
  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    if (isAuth) {
      setVisible(true);
    }
  }, [isAuth]);

  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={3000}
        action={{
          label: "X",
          onPress: onDismissSnackBar,
        }}
        style={{ backgroundColor: "#2b486b" }}
      >
        Welcome Back!
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
});

export default WelcomeToast;
