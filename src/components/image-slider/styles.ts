import { Dimensions, StyleSheet } from "react-native";

import { isWeb } from "utils/checkPlatform";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    marginVertical: 15,
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "white",
    width: isWeb ? "90%" : width - 40,
    alignSelf: "center",
    ...(isWeb && { cursor: "pointer" }),
  },
  image: {
    height: 200,
  },
  pagination: {
    marginBottom: 50,
  },
  text: {
    fontWeight: "600",
    lineHeight: 22,
    letterSpacing: 0.25,
    padding: 10,
    textAlign: "center",
    textTransform: "capitalize",
    ...(isWeb && {
      fontFamily: "Roboto",
      fontSize: 16,
      letterSpacing: 0.4,
      color: "#000",
    }),
  },
  titleWrapper: {
    backgroundColor: "#fff",
    height: 90,
    justifyContent: "center",
    alignSelf: "center",
    ...(!isWeb && {
      width: width - 100,
    }),
  },
  shadow: {
    ...(isWeb && {
      width: "80%",
    }),
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
