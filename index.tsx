import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import { makeServer } from "./server";

import App from "./src/App";

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}

const Main = () => {
  return <App />;
};

registerRootComponent(Main);
