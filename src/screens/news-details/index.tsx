import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';

import { useAppSelector } from 'hooks/useRedux';
import { NewsDetailsProps } from 'navigation/types';
import { Badge, Text } from 'react-native-paper';
import { useGetNewsDataQuery, useGetUserBookmarksQuery } from 'services/api';
import formatDate from 'utils/formatDate';

import NewBodyText from './news-body-text';
import styles, { ids } from './styles';

import withDialog from '@/components/dialog';
import SafeAreaView from '@/components/safe-area-view';
import ScrollViewWithButton from '@/components/scrollview-with-button';
import Toast from '@/components/toast';
import { Article } from '@/context/types';
import ModalTopBar from '@/navigation/navigation-components/modal-top-bar';

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
        {`By ${creators.join(', ')}`}
      </Text>
    </>
  );
};

const NewsDetails = ({ route, navigation }: NewsDetailsProps) => {
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = route.params;
  const previousScreen = useAppSelector((state) => state.ui.previousScreen);

  const { article } = useGetNewsDataQuery(undefined, {
    skip: previousScreen === 'bookmark',
    selectFromResult: ({ data }) => ({
      article: data?.find((item) => item.id === id)
    })
  });

  const { bookmark } = useGetUserBookmarksQuery(undefined, {
    skip: previousScreen === 'home',
    selectFromResult: ({ data }) => ({
      bookmark: data?.find((item) => item.id === id)
    })
  });

  useEffect(() => {
    setCurrentArticle(article ?? bookmark ?? null);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!currentArticle) {
    navigation.goBack();
    return null;
  }

  return (
    <>
      <SafeAreaView>
        <ModalTopBar navigation={navigation} article={currentArticle} />
        <ScrollViewWithButton scrollviewStyles={{ marginHorizontal: 15 }}>
          <View style={{ marginTop: 10 }}>
            <Text
              style={styles.title}
              dataSet={{ media: ids.title }}
              variant="titleLarge"
            >
              {currentArticle?.title}
            </Text>
            <View
              style={styles.postDateWrapper}
              dataSet={{ media: ids.postDateWrapper }}
            >
              <Text style={styles.postDate} variant="labelSmall">
                {formatDate(currentArticle?.pubDate ?? '')}
              </Text>
              <PostCreators creators={currentArticle?.creator} />
            </View>
            <Image
              source={{ uri: currentArticle?.image_url }}
              style={styles.image}
              dataSet={{ media: ids.image }}
            />
            <NewBodyText text={currentArticle?.content ?? ''} />
          </View>
        </ScrollViewWithButton>
      </SafeAreaView>
      <Toast toastId="bookmark-toast" />
    </>
  );
};

export default withDialog(NewsDetails);
