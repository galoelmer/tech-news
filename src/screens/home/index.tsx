import { View, ActivityIndicator } from "react-native";
import { Text } from "react-native-paper";
import StyleSheet from "react-native-media-query";

import ScrollViewWithButton from "components/scrollview-with-button";
import SafeAreaView from "components/safe-area-view";
import ImageSlider from "components/image-slider";
import Card from "components/card";

import { useGetNewsDataQuery } from "services/api";
import { tablet } from "utils/mediaQueries";

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
      <ScrollViewWithButton>
        <>
          <ImageSlider data={data} />
          <Text
            variant="headlineSmall"
            style={styles.titleHeader}
            dataSet={{ media: ids.titleHeader }}
          >
            Tech News
          </Text>
          <View style={styles.container} dataSet={{ media: ids.container }}>
            {data?.slice(4).map((item) => (
              <Card
                key={item.id + "home"}
                id={item.id}
                title={item.title}
                publishedDate={item.pubDate}
                image_url={item.image_url}
              />
            ))}
          </View>
        </>
      </ScrollViewWithButton>
    </SafeAreaView>
  );
};

export default Home;

const { styles, ids } = StyleSheet.create({
  container: {
    justifyContent: "center",
    "@media (min-width: 670px)": {
      flexDirection: "row",
      flexWrap: "wrap",
    },
  },
  titleHeader: {
    fontFamily: "Roboto",
    color: "#000",
    marginLeft: 15,
    [tablet]: {
      marginLeft: 20,
    },
  },
});
