import { Provider as PaperProvider } from "react-native-paper";

import Navigation from "./navigation";
import BackgroundContainer from "components/background";

export default function App() {
  return (
    <PaperProvider>
      <BackgroundContainer>
        <Navigation />
      </BackgroundContainer>
    </PaperProvider>
  );
}
