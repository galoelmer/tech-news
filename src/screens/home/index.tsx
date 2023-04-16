import { View, FlatList, Image } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";

import { useGetNewsDataQuery } from "services/api";

const LeftContent = (imageSource) => {
  const MediaSourceLogo = () => (
    <Image style={{ width: 45, height: 45 }} source={{ uri: imageSource }} />
  );
  return (
    <Avatar.Image
      size={45}
      style={{ overflow: "hidden", borderRadius: 0 }}
      source={MediaSourceLogo}
    />
  );
};

const CardComponent = ({
  title,
  postDate,
  description,
  imageUrl,
  imageSource,
}) => (
  <Card style={{ margin: 10 }}>
    <Card.Title
      title={title}
      subtitle={postDate}
      left={() => LeftContent(imageSource)}
    />
    <Card.Content>
      <Text variant="bodyMedium">{description}</Text>
    </Card.Content>
    <Card.Cover source={{ uri: imageUrl }} style={{ margin: 5 }} />
    <Card.Actions>
      <Button>Like</Button>
      <Button>Share</Button>
    </Card.Actions>
  </Card>
);

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
          <CardComponent
            key={item.id}
            title={item.title}
            postDate={item.publishedAt}
            description={item.description}
            imageUrl={item.urlToImage}
            imageSource={item.imageSource}
          />
        )}
      />
    </View>
  );
};

export default Home;
