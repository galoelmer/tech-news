import { Image, ImageStyle } from "react-native";

import { isNative } from "utils/checkPlatform";

const LogoImage = require("assets/images/logo.png");

const Logo = ({ resizeMode, width, height }: ImageStyle) => {
  return (
    <Image
      source={LogoImage}
      style={{
        width: width || 210,
        height: height || 50,
        resizeMode: resizeMode || "cover",
        paddingVertical: 20,
        ...(isNative && { marginBottom: 10 }),
      }}
    />
  );
};

export default Logo;
