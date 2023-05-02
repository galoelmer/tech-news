import { View, Image } from "react-native";
import { Text, Divider } from "react-native-paper";

import Card from "components/card";

import formatDate from "utils/formatDate";
import { Article } from "context/types";

type FeatureNewsProps = {
  data: Article[];
};

const FeatureNews = ({ data }: FeatureNewsProps) => {
  return (
    <View style={{ flex: 1, margin: 20 }}>
      <Text variant="headlineMedium" style={{ color: "#000", marginLeft: 30 }}>
        Feature News
      </Text>
      <View style={{ flexDirection: "row" }}>
        <View style={{ paddingHorizontal: 30, flexBasis: "60%" }}>
          <Image
            source={{ uri: data[0].image_url }}
            style={{ height: "60%", marginVertical: 10, borderRadius: 5 }}
          />
          <Text
            variant="labelSmall"
            style={{ color: "#949bad", marginBottom: 10 }}
          >
            {formatDate(data[0].pubDate)}
          </Text>
          <Text
            variant="titleMedium"
            style={{ color: "#000", fontWeight: "bold", marginBottom: 10 }}
          >
            {data[0].title}
          </Text>
          <Text variant="bodyMedium" style={{ color: "#000" }}>
            {data[0].description}
          </Text>
        </View>
        <View style={{ flexBasis: "40%" }}>
          {data.slice(1, 4).map((item) => (
            <Card
              key={item.id + "home"}
              id={item.id}
              title={item.title}
              publishedDate={item.pubDate}
              image_url={item.image_url}
            />
          ))}
        </View>
      </View>
      <Divider style={{ marginTop: 30, backgroundColor: "#949bad" }} />
    </View>
  );
};

export default FeatureNews;
