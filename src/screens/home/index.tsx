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
            description={item.description}
            publishedAt={item.publishedAt}
            url={item.url}
            urlToImage={item.urlToImage}
            imageSource={item.imageSource}
            sourceName={item.sourceName}
          />
        )}
      />
    </View>
  );
};

export default Home;
