import { useRef, useState } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Text, IconButton } from "react-native-paper";

import Card from "components/card";
import ImageSlider from "components/image-slider";
import { useGetNewsDataQuery } from "services/api";

const Home = () => {
  // TODO: handle error
  // TODO: add skeleton loading
  const { data, error, isLoading } = useGetNewsDataQuery();
  const scrollViewRef = useRef<ScrollView>(null);
  const [displayButton, setDisplayButton] = useState(false);

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
      <ScrollView
        ref={scrollViewRef}
        bounces={false}
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={({ nativeEvent }) => {
          if (nativeEvent.contentOffset.y > 250) {
            setDisplayButton(true);
          } else {
            setDisplayButton(false);
          }
        }}
      >
        {/* TODO: Image slider not working on web */}
        <ImageSlider data={data} />
        <Text variant="headlineSmall" style={{ marginLeft: 15 }}>
          Tech News
        </Text>
        {data?.slice(4).map((item) => (
          <Card
            key={item.id + "home"}
            id={item.id}
            title={item.title}
            publishedDate={item.pubDate}
            image_url={item.image_url}
          />
        ))}
      </ScrollView>
      {displayButton && (
        // TODO: mode to components
        <IconButton
          onPress={() => {
            scrollViewRef.current?.scrollTo({ y: 0, animated: true });
            setDisplayButton(false);
          }}
          icon="arrow-up-thick"
          size={30}
          iconColor="#fff"
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            backgroundColor: "#5f8dda",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.85,
            shadowRadius: 3.84,
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
