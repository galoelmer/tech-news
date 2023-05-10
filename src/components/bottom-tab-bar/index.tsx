import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, ScrollView, View } from "react-native";
import { TouchableRipple, Text } from "react-native-paper";
import Animated, {
  FadeInLeft,
  FadeOutLeft,
  Layout,
} from "react-native-reanimated";

const BottomTabBar = ({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) => {
  return (
    <View style={[styles.container]}>
      <ScrollView
        horizontal
        contentContainerStyle={[
          styles.scrollView,
          { paddingBottom: insets.bottom },
        ]}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const icon = options.tabBarIcon ? options.tabBarIcon : () => null;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, { merge: true });
            }
          };

          return (
            <Animated.View
              key={route.key}
              layout={Layout}
              style={[
                styles.buttonContainer,
                { backgroundColor: isFocused ? "#8aaad0" : "#4777b1" },
              ]}
            >
              <TouchableRipple
                onPress={onPress}
                rippleColor="rgba(255, 255, 255, .55)"
                style={styles.buttonRipple}
              >
                <>
                  {icon({ color: "#fff", size: 24, focused: isFocused })}
                  {isFocused && (
                    <Animated.View
                      entering={FadeInLeft.delay(200).duration(200)}
                      exiting={FadeOutLeft.duration(100)}
                    >
                      <Text style={styles.label} variant="labelLarge">
                        {typeof options.tabBarLabel === "string"
                          ? options.tabBarLabel
                          : ""}
                      </Text>
                    </Animated.View>
                  )}
                </>
              </TouchableRipple>
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: "#4777B1",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.05,
    shadowRadius: 15,
  },
  scrollView: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 30,
    marginTop: 5,
    marginLeft: 5,
  },
  buttonRipple: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    height: "100%",
  },
  label: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 14,
    fontFamily: "Roboto",
  },
});
