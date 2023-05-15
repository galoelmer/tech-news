import { useEffect } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
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
import { setFocusArticle } from '@/context/reducers/news-reducer';

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

const NewsDetails = ({ route }: NewsDetailsProps) => {
  const dispatch = useAppDispatch();
  const { id } = route.params;
  const previousScreen = useAppSelector((state) => state.ui.previousScreen);

  const { article, isLoadingArticle } = useGetNewsDataQuery(undefined, {
    skip: previousScreen === 'bookmarks',
    selectFromResult: ({ data, isLoading }) => ({
      article: data?.find((item) => item.id === id),
      isLoadingArticle: isLoading
    })
  });

  const { bookmark, isLoadingBookmark } = useGetUserBookmarksQuery(undefined, {
    skip: previousScreen === 'home',
    selectFromResult: ({ data, isLoading }) => ({
      bookmark: data?.find((item) => item.id === id),
      isLoadingBookmark: isLoading
    })
  });

  const currentArticle = article ?? bookmark;
  const isLoading = isLoadingArticle || isLoadingBookmark;

  useEffect(() => {
    dispatch(
      setFocusArticle({
        id: currentArticle?.id,
        url: currentArticle?.link,
        isBookmarked: currentArticle?.isBookmarked
      })
    );

    return () => {
      dispatch(setFocusArticle(null));
    };
  }, [currentArticle?.isBookmarked]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
      <Toast />
    </>
  );
};

export default withDialog(NewsDetails);
