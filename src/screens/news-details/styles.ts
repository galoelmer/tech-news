import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
  },
  postDateWrapper: { flexDirection: "row", marginTop: 10 },
  postDate: {
    fontSize: 12,
    color: "#949bad",
  },
  creator: {
    fontSize: 12,
  },
  badge: {
    backgroundColor: "#949bad",
    marginHorizontal: 8,
    alignSelf: "center",
    borderRadius: 3,
  },
  image: {
    flex: 1,
    height: 200,
    borderRadius: 5,
    marginVertical: 15,
  },
  body: {
    fontSize: 15,
    lineHeight: 28,
    letterSpacing: 0.3,
    marginBottom: 14,
  },
});