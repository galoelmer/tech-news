import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { useFonts } from "expo-font";

import Navigation from "./navigation";
import BackgroundContainer from "@/src/components/gradient-background";

import { store } from "@/src/context/store";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <BackgroundContainer>
          <Navigation />
        </BackgroundContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}
