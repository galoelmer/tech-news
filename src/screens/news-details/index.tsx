import {
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { Text, Appbar, Badge } from "react-native-paper";

import { useGetNewsDataQuery } from "services/api";
import formatDate from "utils/formatDate";
import styles from "./styles";

import NewBodyText from "./news-body-text";
import { NewsDetailsProps } from "navigation/types";

interface PostCreatorsProps {
  creators: string[] | null | undefined;
}

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
          <NewBodyText text={news?.content ?? ""} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsDetails;
