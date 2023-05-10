import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const AccountInfo = () => {
  return (
    <View>
      <Text
        variant="headlineMedium"
        style={{
          fontFamily: "RobotoBold",
          textAlign: "center",
          paddingVertical: 20,
          backgroundColor: "#F1F0F6",
        }}
      >
        Account Information
      </Text>
    </View>
  );
};

export default AccountInfo;

const styles = StyleSheet.create({});
