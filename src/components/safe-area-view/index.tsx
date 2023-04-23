import { ViewProps, SafeAreaView } from "react-native";

import { isWeb } from "utils/checkPlatform";

const SafeAreView = ({ children }: ViewProps) => {
  if (isWeb) {
    return <>{children}</>;
  }

  return <SafeAreaView>{children}</SafeAreaView>;
};

export default SafeAreView;
