import { Image } from "react-native";
import { Appbar } from "react-native-paper";

const Logo = require("assets/images/logo.png");

const AppBar = () => (
  <Appbar.Header
    style={{ justifyContent: "space-between", backgroundColor: "#457B9D" }}
  >
    <Image source={Logo} style={{ width: 250, height: 50 }} />
    <Appbar.Action icon="menu" color="#fff" onPress={() => {}} />
  </Appbar.Header>
);

export default AppBar;
