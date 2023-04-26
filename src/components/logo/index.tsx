import { Image } from "react-native";

import { isNative } from "utils/checkPlatform";
const LogoImage = require("assets/images/logo.png");

const Logo = () => {
  return (
    <Image
      source={LogoImage}
      style={{
        width: 210,
        height: 50,
        paddingVertical: 20,
        ...(isNative && { marginBottom: 10 }),
      }}
    />
  );
};

export default Logo;
