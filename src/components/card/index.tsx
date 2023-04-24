import { Image, View, Pressable } from "react-native";
import { Badge, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import StyleSheet from "react-native-media-query";

import { CardProps } from "./types";
import formatDate from "utils/formatDate";
import { isWeb } from "utils/checkPlatform";

const CardComponent = ({ id, title, publishedDate, image_url }: CardProps) => {
  const { navigate } = useNavigation();

  return (
    <Pressable
      onPress={() => navigate("NewsDetails", { id })}
      style={styles.pressable}
      dataSet={{ media: ids.pressable }}
    >
      <View style={styles.container} dataSet={{ media: ids.container }}>
        <View style={styles.content}>
          <View style={styles.postDateContainer}>
            <Badge size={5} style={styles.badge} />
            <Text variant="labelSmall" style={styles.postDate}>
              {formatDate(publishedDate)}
            </Text>
          </View>
          <Text style={styles.title} variant="titleMedium">
            {title}
          </Text>
        </View>
        <Image
          source={{ uri: image_url }}
          style={styles.image}
          dataSet={{ media: ids.image }}
        />
      </View>
    </Pressable>
  );
};

export default CardComponent;

const { styles, ids } = StyleSheet.create({
  pressable: {
    "@media (min-width: 670px)": {
      width: "50%",
    },
  },
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
    "@media (min-width: 670px)": {
      height: 140,
    },
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
  image: {
    width: 130,
    height: 120,
    borderRadius: 5,
    "@media (min-width: 670px)": {
      height: 140,
    },
  },
});
