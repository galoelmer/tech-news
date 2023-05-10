import { useFonts } from "expo-font";

import Navigation from "@/navigation";
import BackgroundContainer from "components/gradient-background";

import { useGetUserDataQuery } from "services/api";

export default function App() {
  useGetUserDataQuery(undefined, {
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

  return (
    <BackgroundContainer>
      <Navigation />
    </BackgroundContainer>
  );
}
