import * as Linking from "expo-linking";
import {
  NavigationContainer,
  Link,
  LinkingOptions,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useMediaQuery } from "react-responsive";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import Home from "@/screens/home";
import NewsDetails from "@/screens/news-details";
import Login from "@/screens/login";
import Register from "@/screens/register";
import Logo from "@/components/logo";
import GradientBackground from "@/components/gradient-background";
import HeaderRightButton from "./header-right-buttons";

import { RootStackParamList } from "./types";

const BottomTabs = createBottomTabNavigator();
const TopTabs = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStackScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="NewsFeed"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="NewsFeed" component={Home} />
      <Stack.Screen name="NewsDetails" component={NewsDetails} />
    </Stack.Navigator>
  );
};

const AccountTopTabs = () => {
  return (
    <TopTabs.Navigator>
      <TopTabs.Screen name="Login" component={Login} />
      <TopTabs.Screen name="Signup" component={Register} />
    </TopTabs.Navigator>
  );
};

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Home: {
        screens: {
          NewsFeed: "",
          NewsDetails: "news/:id",
        },
      },
      Account: {
        screens: {
          Login: "login",
          Signup: "signup",
        },
      },
    },
  },
};

export default function Navigation() {
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

  return (
    <NavigationContainer linking={linking}>
      <BottomTabs.Navigator
        initialRouteName="Home"
        tabBar={isMobile ? undefined : () => null}
        screenOptions={{
          headerTitle: () => (
            <Link
              to={{
                screen: "Home",
                params: {
                  screen: "NewsFeed",
                },
              }}
            >
              <Logo resizeMode="contain" width={150} />
            </Link>
          ),
          headerBackground: () => (
            <GradientBackground
              colors={["#4777B1", "#6173B4", "#746EB4"]}
              start={{ x: 0.2, y: 1 }}
              end={{ x: 0.8, y: 0.1 }}
            />
          ),
          headerRight: () => (isMobile ? null : <HeaderRightButton />),
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#a6bedb",
          tabBarLabelPosition: "beside-icon",
          tabBarLabelStyle: {
            fontFamily: "Roboto",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: 2,
          },
          tabBarStyle: {
            backgroundColor: "#4777B1",
            borderTopColor: "transparent",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -5,
            },
            shadowOpacity: 0.2,
            shadowRadius: 15,
          },
        }}
      >
        <BottomTabs.Screen
          name="Home"
          component={HomeStackScreen}
          listeners={({ navigation }) => ({
            tabPress: ({ preventDefault }) => {
              preventDefault();
              navigation.navigate("Home", { screen: "NewsFeed" });
            },
          })}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                name={focused ? "home-variant" : "home-variant-outline"}
                size={focused ? size + 5 : size}
                color={color}
              />
            ),
          }}
        />
        <BottomTabs.Screen
          name="Account"
          component={AccountTopTabs}
          options={{
            tabBarLabel: "Login",
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                name={focused ? "account-circle" : "account-circle-outline"}
                size={focused ? size + 5 : size}
                color={color}
              />
            ),
          }}
        />
      </BottomTabs.Navigator>
    </NavigationContainer>
  );
}
