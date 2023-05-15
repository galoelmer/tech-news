import { useState } from 'react';
import { Image, Pressable, View } from 'react-native';

import { Text } from 'react-native-paper';
import Swiper, { SwiperControlsProps } from 'react-native-web-swiper';

import { ArrowLeftButton, ArrowRightButton } from './chevron-icon-button';
import styles, { ids } from './styles';
import TapGestureDetector from './tap-gesture-detector';

import { setPreviousScreen } from '@/context/reducers/ui-reducer';
import { Article } from '@/context/types';
import useNavigation from '@/hooks/useNavigation';
import { useAppDispatch } from '@/hooks/useRedux';
import { isWeb } from '@/utils/checkPlatform';

interface ImageSliderProps {
  data: Article[];
}

const ImageSlider = ({ data }: ImageSliderProps) => {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation();
  const [article, setArticle] = useState(data[0]);

  const handlePress = (id?: string | undefined) => {
    dispatch(setPreviousScreen('home'));
    navigate('Article', { id: id ?? article.id });
  };

  return (
    <>
      <TapGestureDetector onPress={handlePress}>
        <View style={styles.container} dataSet={{ media: ids.container }}>
          <Swiper
            loop
            from={0}
            timeout={4.5}
            onIndexChanged={(index) => setArticle(data[index])}
            controlsProps={controlsProps}
            gesturesEnabled={() => !isWeb}
          >
            {data.slice(0, 4).map((item) => (
              <Pressable
                key={item.id}
                disabled={!isWeb}
                onPress={() => handlePress(item.id)}
              >
                <Image
                  source={{ uri: item.image_url }}
                  style={styles.image}
                  dataSet={{ media: ids.image }}
                />
              </Pressable>
            ))}
          </Swiper>
        </View>
      </TapGestureDetector>
      <Pressable onPress={() => handlePress()}>
        <View style={styles.shadow} dataSet={{ media: ids.shadow }}>
          <View style={styles.titleWrapper}>
            <Text style={styles.text} variant="titleMedium">
              {article.title}
            </Text>
          </View>
        </View>
      </Pressable>
    </>
  );
};

const controlsProps: SwiperControlsProps = {
  prevPos: isWeb && 'left',
  nextPos: isWeb && 'right',
  PrevComponent: ArrowLeftButton,
  NextComponent: ArrowRightButton,
  dotsWrapperStyle: {
    marginBottom: 60
  },
  dotProps: {
    badgeStyle: styles.badge
  },
  dotActiveStyle: {
    backgroundColor: '#5582D1'
  }
};

export default ImageSlider;
