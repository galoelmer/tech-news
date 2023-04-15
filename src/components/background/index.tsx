import { View, ViewProps } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Background = ({ children }: ViewProps) => {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <LinearGradient
        colors={["#E3F0FF", "#99C2FF"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "100%",
          width: "100%",
        }}
      />
      <>{children}</>
    </View>
  );
};

export default Background;
