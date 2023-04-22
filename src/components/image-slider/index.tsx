import { useState, useMemo } from "react";
import { View, Image, Pressable, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-web-swiper";

import TapGestureDetector from "./tap-gesture-detector";

import styles from "./styles";
import { Article } from "context/types";

interface ImageSliderProps {
  data: Article[];
}

const ImageSlider = ({ data }: ImageSliderProps) => {
  const [article, setArticle] = useState(data[0]);
  const { navigate } = useNavigation();

  // TODO: fix type error
  const handlePress = () => navigate("NewsDetails", { id: article.id });

  return (
    <>
      <TapGestureDetector onPress={handlePress}>
        <View style={styles.container}>
          <Swiper
            loop
            from={0}
            timeout={4.5}
            onIndexChanged={(index) => setArticle(data[index])}
            controlsProps={controlsProps}
          >
            {data.slice(0, 4).map((item) => (
              <View key={item.id}>
                <Image source={{ uri: item.image_url }} style={styles.image} />
              </View>
            ))}
          </Swiper>
        </View>
      </TapGestureDetector>
      <Pressable onPress={handlePress}>
        <View style={styles.shadow}>
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

const controlsProps = {
  prevPos: false,
  nextPos: false,
  dotsWrapperStyle: {
    marginBottom: 60,
  },
  dotProps: {
    badgeStyle: styles.badge,
  },
  dotActiveStyle: {
    backgroundColor: "#5582D1",
  },
};

export default ImageSlider;
