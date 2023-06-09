import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import StyleSheet from 'react-native-media-query';
import { useMediaQuery } from 'react-responsive';

import FeatureNews from './featureNews';

import Card from '@/components/card';
import ImageSlider from '@/components/image-slider';
import SafeAreaView from '@/components/safe-area-view';
import ScrollViewWithButton from '@/components/scrollview-with-button';
import { setButtonTabBarHeight } from '@/context/reducers/ui-reducer';
import { useAppDispatch } from '@/hooks/useRedux';
import { useGetNewsDataQuery } from '@/services/api';
import { tablet } from '@/utils/mediaQueries';

const Home = () => {
  // TODO: handle error
  // TODO: add skeleton loading
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching } = useGetNewsDataQuery();

  const isDesktop = useMediaQuery({ query: '(min-width: 1020px)' });
  const isSmallTablet = useMediaQuery({ query: '(min-width: 425px )' });
  const isLargeTablet = useMediaQuery({ query: '(min-width: 760px)' });
  const tabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    dispatch(setButtonTabBarHeight(tabBarHeight));
  }, [tabBarHeight]);

  if (isLoading || isFetching) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
          {isDesktop ? (
            <FeatureNews data={data} />
          ) : (
            <ImageSlider data={data} />
          )}
          <View
            style={styles.cardsContainer}
            dataSet={{ media: ids.cardsContainer }}
          >
            {data?.slice(4).map((item) => (
              <Card
                key={item.id + 'home'}
                id={item.id}
                title={item.title}
                publishedDate={item.pubDate}
                image_url={item.image_url}
                width={isLargeTablet ? '45%' : isSmallTablet ? '85%' : '100%'}
                previousScreen="home"
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
  cardsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    '@media (min-width: 670px)': {
      alignSelf: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    '@media (min-width: 1020px)': {
      width: '85%',
      justifyContent: 'space-evenly'
    }
  },
  titleHeader: {
    fontFamily: 'Roboto',
    color: '#000',
    textAlign: 'center',
    [tablet]: {
      marginLeft: 30
    }
  }
});
