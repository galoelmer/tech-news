import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";

import Navigation from "@/navigation";
import BackgroundContainer from "@/components/gradient-background";

import { useGetUserDataQuery } from "@/services/api";

export default function App() {
  const { isLoading } = useGetUserDataQuery(undefined, {
    pollingInterval: 900000,
    refetchOnMountOrArgChange: true,
  });

  const [fontsLoaded] = useFonts({
    Roboto: require("assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <BackgroundContainer>
      <Navigation />
    </BackgroundContainer>
  );
}
