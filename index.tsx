import "react-native-gesture-handler";
import { registerRootComponent } from "expo";

import App from "./src/App";

const Main = () => {
  return <App />;
};

registerRootComponent(Main);
