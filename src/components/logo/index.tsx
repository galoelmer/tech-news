import { Image } from "react-native";

const LogoImage = require("assets/images/logo.png");

const Logo = () => {
  return (
    <Image
      source={LogoImage}
      style={{
        width: 180,
        height: 30,
      }}
      resizeMode="stretch"
    />
  );
};

export default Logo;
