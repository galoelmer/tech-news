import StyleSheet from "react-native-media-query";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
import { isNative } from "utils/checkPlatform";
import { tablet } from "utils/mediaQueries";
import { webStyle } from "utils/webStyles";

const { styles, ids } = StyleSheet.create({
  container: {
    marginVertical: 15,
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "white",
    width: webStyle("90%") ?? width - 40,
    alignSelf: "center",
    [tablet]: {
      height: 280,
      width: "80%",
    },
    cursor: webStyle("pointer"),
  },
  image: {
    height: 200,
    [tablet]: {
      height: 280,
    },
  },
  pagination: {
    marginBottom: 50,
  },
  text: {
    fontFamily: "Roboto",
    fontWeight: "600",
    lineHeight: 22,
    letterSpacing: webStyle(0.4) ?? 0.25,
    padding: 10,
    textAlign: "center",
    textTransform: "capitalize",
    fontSize: webStyle(16),
    color: webStyle("#000"),
  },
  titleWrapper: {
    backgroundColor: "#fff",
    height: 90,
    justifyContent: "center",
    alignSelf: "center",
    ...(isNative && { width: width - 100 }),
  },
  shadow: {
    width: webStyle("80%"),
    [tablet]: {
      width: "70%",
    },
    backgroundColor: "#fff",
    overflow: "hidden",
    borderRadius: 8,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    bottom: 50,
  },
  badge: {
    backgroundColor: "#fff",
    width: 25,
    height: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    marginRight: 5,
  },
});

export { styles as default, ids };
