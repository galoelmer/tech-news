import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";

import Navigation from "./navigation";
import BackgroundContainer from "components/background";

import { store } from "@/src/context/store";

export default function App() {
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
