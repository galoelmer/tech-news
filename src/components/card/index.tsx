import { Image, View } from "react-native";
import { Avatar, Card, Text, IconButton } from "react-native-paper";

import ShareButton from "./share-button";
import { CardProps } from "./types";

const LeftContentIcon = (imageSource: string) => {
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
  publishedAt,
  description,
  urlToImage,
  imageSource,
  sourceName,
  url,
}: CardProps) => {
  const Icon = () => LeftContentIcon(imageSource);

  return (
    <Card style={{ margin: 10 }}>
      <Card.Title title={title} subtitle={publishedAt} left={Icon} />
      <Card.Content>
        <Text variant="bodyMedium">{description}</Text>
      </Card.Content>
      <Card.Cover source={{ uri: urlToImage }} style={{ margin: 5 }} />
      <Card.Actions>
        <View
          style={{
            flexGrow: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ShareButton />
          <IconButton
            icon="heart-outline"
            mode="contained"
            animated
            size={25}
            onPress={() => console.log("Pressed Like button")}
            accessibilityLabel="Like"
            style={{ display: "flex" }}
          />
        </View>
      </Card.Actions>
    </Card>
  );
};

export default CardComponent;
