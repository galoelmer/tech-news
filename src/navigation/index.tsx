import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import Home from "screens/home";
import Login from "screens/login";
import Register from "screens/register";
import NewsDetails from "screens/news-details";
import Logo from "components/logo";

import { RootStackParamList } from "./types";

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const LoginStack = () => {
  return (
    <TopTab.Navigator>
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Register" component={Register} />
    </TopTab.Navigator>
  );
};

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="News"
    screenOptions={{
      headerTitle: () => <Logo />,
      headerStyle: {
        backgroundColor: "#5f8dda",
      },
      tabBarLabelStyle: {
        fontSize: 12,
        letterSpacing: 1,
        textTransform: "uppercase",
      },
      tabBarStyle: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.05,
        shadowRadius: 15,
      },
    }}
  >
    <Tab.Screen
      name="News"
      component={Home}
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
    <Tab.Screen
      name="LoginStack"
      component={LoginStack}
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
  </Tab.Navigator>
);

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TabNavigator"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="NewsDetails" component={NewsDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
