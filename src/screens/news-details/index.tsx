import { useEffect } from "react";
import { View, ActivityIndicator, Image } from "react-native";
import { Text, Badge } from "react-native-paper";

import { useGetNewsDataQuery } from "services/api";
import formatDate from "utils/formatDate";
import { useAppDispatch } from "hooks/useRedux";
import { setFocusArticlesUrl } from "@/context/reducers/news-reducer";

import NewBodyText from "./news-body-text";
import withDialog from "@/components/dialog";
import SafeAreaView from "@/components/safe-area-view";
import ScrollViewWithButton from "@/components/scrollview-with-button";

import styles, { ids } from "./styles";
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
  const dispatch = useAppDispatch();
  const { id } = route.params;
  const { data, isLoading } = useGetNewsDataQuery();

  const news = data?.find((item) => item.id === id);

  useEffect(() => {
    dispatch(setFocusArticlesUrl(news?.link ?? ""));
    const removeListener = navigation.addListener("beforeRemove", () =>
      dispatch(setFocusArticlesUrl(""))
    );
    return removeListener;
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollViewWithButton scrollviewStyles={{ marginHorizontal: 15 }}>
        <View style={{ marginTop: 10 }}>
          <Text
            style={styles.title}
            dataSet={{ media: ids.title }}
            variant="titleLarge"
          >
            {news?.title}
          </Text>
          <View
            style={styles.postDateWrapper}
            dataSet={{ media: ids.postDateWrapper }}
          >
            <Text style={styles.postDate} variant="labelSmall">
              {formatDate(news?.pubDate ?? "")}
            </Text>
            <PostCreators creators={news?.creator} />
          </View>
          <Image
            source={{ uri: news?.image_url }}
            style={styles.image}
            dataSet={{ media: ids.image }}
          />
          <NewBodyText text={news?.content ?? ""} />
        </View>
      </ScrollViewWithButton>
    </SafeAreaView>
  );
};

export default withDialog(NewsDetails);
