import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import { makeServer } from "./server";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "context/store";

import App from "./src/App";

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}

const Main = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </ReduxProvider>
  );
};

registerRootComponent(Main);
