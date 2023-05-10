import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import React from "react";

const Appearance = () => {
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
        Appearance
      </Text>
    </View>
  );
};

export default Appearance;

const styles = StyleSheet.create({});
