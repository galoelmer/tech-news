import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { Text, Appbar, Badge } from "react-native-paper";

import { useGetNewsDataQuery } from "services/api";
import formatDate from "utils/formatDate";

import { NewsDetailsProps } from "@/src/navigation/types";

interface PostCreatorsProps {
  creators: string[] | null | undefined;
}

// TODO: improve this function
const addDoubleLineBreakToText = (text: string) => {
  return text.replace(/(?!\.) \. /g, ".\n\n");
};

const PostCreators = ({ creators }: PostCreatorsProps) => {
  if (!creators || creators.length === 0) {
    return null;
  }

  return (
    <>
      <Badge size={5} style={styles.badge} />
      <Text style={styles.creator} variant="labelSmall">
        {`By ${creators.join(", ")}`}
      </Text>
    </>
  );
};

const NewsDetails = ({ route, navigation }: NewsDetailsProps) => {
  const { id } = route.params;
  const { data, isLoading } = useGetNewsDataQuery();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const news = data?.find((item) => item.id === id);

  return (
    <SafeAreaView>
      <ScrollView
        style={{ marginHorizontal: 15 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Appbar style={styles.appBar}>
          <Appbar.BackAction
            onPress={navigation.goBack}
            style={styles.appBarBackButton}
          />
          <Appbar.Action icon="bookmark-outline" size={28} onPress={() => {}} />
        </Appbar>
        <View>
          <Text style={styles.title} variant="titleLarge">
            {news?.title}
          </Text>
          <View style={styles.postDateWrapper}>
            <Text style={styles.postDate} variant="labelSmall">
              {formatDate(news?.pubDate ?? "")}
            </Text>
            <PostCreators creators={news?.creator} />
          </View>
          <Image source={{ uri: news?.image_url }} style={styles.image} />
          <Text variant="bodyMedium" style={styles.body}>
            {addDoubleLineBreakToText(news?.content ?? "")}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsDetails;

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: "transparent",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appBarBackButton: {
    marginLeft: 0,
  },
  title: {
    fontWeight: "600",
  },
  postDateWrapper: { flexDirection: "row", marginTop: 10 },
  postDate: {
    fontSize: 12,
    color: "#949bad",
  },
  creator: {
    fontSize: 12,
  },
  badge: {
    backgroundColor: "#949bad",
    marginHorizontal: 8,
    alignSelf: "center",
    borderRadius: 3,
  },
  image: {
    flex: 1,
    height: 200,
    borderRadius: 5,
    marginVertical: 15,
  },
  body: { lineHeight: 25 },
});
