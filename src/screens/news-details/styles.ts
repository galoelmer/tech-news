import StyleSheet from "react-native-media-query";
import { isWeb } from "utils/checkPlatform";

import { tablet } from "utils/mediaQueries";

const { styles, ids } = StyleSheet.create({
  appBar: {
    backgroundColor: "transparent",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appBarBackButton: {
    marginLeft: 0,
  },
  title: {
    fontWeight: "600",
    color: "#000",
    fontFamily: "Roboto",
    [tablet]: {
      width: "70%",
      alignSelf: "center",
    },
  },
  postDateWrapper: {
    flexDirection: "row",
    marginTop: 10,
    [tablet]: {
      width: "70%",
      alignSelf: "center",
    },
  },
  postDate: {
    fontSize: 12,
    color: "#949bad",
    fontFamily: "Roboto",
  },
  creator: {
    fontSize: 12,
    color: "#000",
    fontFamily: "Roboto",
  },
  badge: {
    backgroundColor: "#949bad",
    marginHorizontal: 8,
    alignSelf: "center",
    borderRadius: 3,
  },
  image: {
    ...(!isWeb && { flex: 1 }),
    height: 200,
    borderRadius: 5,
    marginVertical: 15,
    [tablet]: {
      height: 300,
    },
  },
  body: {
    fontFamily: "Roboto",
    fontSize: 15,
    lineHeight: 28,
    letterSpacing: 0.3,
    marginBottom: 14,
    [tablet]: {
      width: "70%",
      alignSelf: "center",
    },
  },
});

export { styles as default, ids };
