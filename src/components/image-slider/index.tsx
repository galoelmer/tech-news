import { useState } from "react";
import { Dimensions, StyleSheet, View, Image, Pressable } from "react-native";
import { Text } from "react-native-paper";
import Swiper from "react-native-web-swiper";

import styles from "./styles";
import { Article } from "context/types";

interface ImageSliderProps {
  data: Article[];
}

const ImageSlider = ({ data }: ImageSliderProps) => {
  const [text, setText] = useState(data[0].title);

  return (
    <>
      <View style={styles.container}>
        <Swiper
          loop
          from={0}
          timeout={4.5}
          onIndexChanged={(index) => setText(data[index].title)}
          controlsProps={controlsProps}
        >
          {data.slice(0, 4).map((item) => (
            <View key={item.id}>
              <Image source={{ uri: item.image_url }} style={styles.image} />
            </View>
          ))}
        </Swiper>
      </View>
      {/* TODO: add link to url of article */}
      <Pressable onPress={() => console.log("pressed Link")}>
        <View style={styles.shadow}>
          <View style={styles.titleWrapper}>
            <Text style={styles.text} variant="titleMedium">
              {text}
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
