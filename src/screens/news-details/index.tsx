import { useEffect } from "react";
import { View, ActivityIndicator, Image } from "react-native";
import { Text, Badge } from "react-native-paper";

import { useGetNewsDataQuery } from "services/api";
import formatDate from "utils/formatDate";
import { useAppDispatch } from "hooks/useRedux";
import { setFocusArticleUrl } from "@/context/reducers/news-reducer";

import Toast from "@/components/toast";
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

  const article = data?.find((item) => item.id === id);

  useEffect(() => {
    dispatch(
      setFocusArticleUrl({
        url: article?.link ?? null,
        id: article?.id ?? null,
        article: article || null,
        isBookmarked: article?.isBookmarked ?? false,
      })
    );
    const removeListener = navigation.addListener("beforeRemove", () =>
      dispatch(
        setFocusArticleUrl({
          url: null,
          id: null,
          article: null,
          isBookmarked: false,
        })
      )
    );
    return removeListener;
  }, [article]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <SafeAreaView>
        <ScrollViewWithButton scrollviewStyles={{ marginHorizontal: 15 }}>
          <View style={{ marginTop: 10 }}>
            <Text
              style={styles.title}
              dataSet={{ media: ids.title }}
              variant="titleLarge"
            >
              {article?.title}
            </Text>
            <View
              style={styles.postDateWrapper}
              dataSet={{ media: ids.postDateWrapper }}
            >
              <Text style={styles.postDate} variant="labelSmall">
                {formatDate(article?.pubDate ?? "")}
              </Text>
              <PostCreators creators={article?.creator} />
            </View>
            <Image
              source={{ uri: article?.image_url }}
              style={styles.image}
              dataSet={{ media: ids.image }}
            />
            <NewBodyText text={article?.content ?? ""} />
          </View>
        </ScrollViewWithButton>
      </SafeAreaView>
      <Toast />
    </>
  );
};

export default withDialog(NewsDetails);
