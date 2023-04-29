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
import Ionicons from "@expo/vector-icons/Ionicons";

import Home from "@/screens/home";
import NewsDetails from "@/screens/news-details";
import Login from "@/screens/login";
import Register from "@/screens/register";
import Logo from "@/components/logo";
import GradientBackground from "@/components/gradient-background";

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
        screenOptions={{
          headerTitle: () => (
            <Link to={{ screen: "NewsFeed" }}>
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
          headerRight: () =>
            isMobile ? null : <Link to={{ screen: "Account" }}>Login</Link>,
          tabBarLabelStyle: {
            fontSize: 12,
            letterSpacing: 1,
            textTransform: "uppercase",
          },
          tabBarStyle: {
            borderTopColor: "transparent",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -5,
            },
            shadowOpacity: 0.05,
            shadowRadius: 15,
          },
        }}
        tabBar={isMobile ? undefined : () => null}
      >
        <BottomTabs.Screen
          name="Home"
          component={HomeStackScreen}
          listeners={({ navigation }) => ({
            tabPress: ({ preventDefault }) => {
              preventDefault();
              navigation.navigate("NewsFeed");
            },
          })}
          options={{
            tabBarLabel: "News",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? "newspaper" : "newspaper-outline"}
                size={30}
                color={focused ? "#5f8dda" : color}
              />
            ),
          }}
        />
        <BottomTabs.Screen
          name="Account"
          component={AccountTopTabs}
          options={{
            tabBarLabel: "Login",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? "log-in" : "log-in-outline"}
                size={30}
                color={focused ? "#5f8dda" : color}
              />
            ),
          }}
        />
      </BottomTabs.Navigator>
    </NavigationContainer>
  );
}
