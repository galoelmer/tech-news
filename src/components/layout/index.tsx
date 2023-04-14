import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import AppBar from "components/app-bar";

const Layout = () => {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <LinearGradient
        colors={["#1D3557", "#005F83", "#008B9A"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "100%",
          width: "100%",
        }}
      />
      <AppBar />
      <StatusBar style="auto" />
    </View>
  );
};

export default Layout;
