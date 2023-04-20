import {
  View,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Text } from "react-native-paper";

import Card from "components/card";
import ImageSlider from "components/image-slider";
import { useGetNewsDataQuery } from "services/api";

const Home = () => {
  // TODO: handle error
  // TODO: add skeleton loading
  const { data, error, isLoading } = useGetNewsDataQuery();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <SafeAreaView>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <ImageSlider data={data} />
        <Text variant="headlineSmall" style={{ marginLeft: 15 }}>
          Tech News
        </Text>
        {data?.slice(4).map((item) => (
          <Card
            key={item.id + "home"}
            title={item.title}
            publishedDate={item.pubDate}
            image_url={item.image_url}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
