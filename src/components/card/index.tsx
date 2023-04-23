import { Image, View, StyleSheet, Pressable } from "react-native";
import { Badge, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { CardProps } from "./types";
import formatDate from "utils/formatDate";
import { isWeb } from "utils/checkPlatform";

const CardComponent = ({ id, title, publishedDate, image_url }: CardProps) => {
  const { navigate } = useNavigation();

  return (
    <Pressable onPress={() => navigate("NewsDetails", { id })}>
      <View style={style.container}>
        <View style={style.content}>
          <View style={style.postDateContainer}>
            <Badge size={5} style={style.badge} />
            <Text variant="labelSmall" style={style.postDate}>
              {formatDate(publishedDate)}
            </Text>
          </View>
          <Text style={style.title} variant="titleMedium">
            {title}
          </Text>
        </View>
        <Image source={{ uri: image_url }} style={style.image} />
      </View>
    </Pressable>
  );
};

export default CardComponent;

const style = StyleSheet.create({
  container: {
    margin: 10,
    overflow: "hidden",
    height: 120,
    backgroundColor: "#f9f9f9",
    flexDirection: "row",
    borderRadius: 5,
    ...(isWeb && { cursor: "pointer" }),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.22,
  },
  content: {
    flex: 1,
    marginRight: 35,
    marginLeft: 5,
    paddingTop: 3,
  },
  postDateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    backgroundColor: "#949bad",
    marginRight: 5,
    alignSelf: "center",
  },
  postDate: { color: "#949bad" },
  title: {
    fontFamily: "Roboto",
    marginTop: 8,
    color: "#000",
    ...(isWeb && { fontSize: 14 }),
  },
  image: { width: 130, height: 120, borderRadius: 5 },
});
