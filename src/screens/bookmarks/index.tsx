import { StyleSheet, View, ActivityIndicator } from "react-native";

import { useGetUserBookmarksQuery } from "@/services/api";

import Card from "@/components/card";
import ScrollViewWithButton from "@/components/scrollview-with-button";

const Bookmarks = () => {
  const { data, isLoading } = useGetUserBookmarksQuery();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollViewWithButton scrollviewStyles={styles.container}>
      <View style={styles.cardsContainer}>
        {data?.map((item) => (
          <Card
            key={item.id + "bookmarks"}
            id={item.id}
            title={item.title}
            publishedDate={item.pubDate}
            image_url={item.image_url}
          />
        ))}
      </View>
    </ScrollViewWithButton>
  );
};

export default Bookmarks;

const styles = StyleSheet.create({
  container: {},
  cardsContainer: {},
});
