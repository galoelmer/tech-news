import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";

import Card from "components/card";
import { useGetNewsDataQuery } from "services/api";

const Home = () => {
  const { data, error, isLoading } = useGetNewsDataQuery();

  if (isLoading) {
    return <Text>Loadding...</Text>;
  }

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Card
            key={item.id}
            title={item.title}
            publishedDate={item.pubDate}
            image_url={item.image_url}
          />
        )}
      />
    </View>
  );
};

export default Home;
