import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  createDrawerNavigator,
  DrawerToggleButton,
} from "@react-navigation/drawer";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useMediaQuery } from "react-responsive";

import Home from "screens/home";
import Login from "screens/login";
import SignUp from "@/screens/signup";
import NewsDetails from "screens/news-details";
import Logo from "components/logo";
import BackgroundGradient from "components/gradient-background";

import { RootStackParamList } from "./types";
import ResetPassword from "@/screens/reset-password";

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const LoginStack = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontFamily: "Roboto",
          fontWeight: "bold",
          letterSpacing: 2,
        },
        tabBarItemStyle: {
          flexDirection: "row",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#6173B4",
        },
      }}
    >
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? "account" : "account-outline"}
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Signup"
        component={SignUp}
        options={{
          tabBarLabel: "Sign Up",
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? "account-plus" : "account-plus-outline"}
              size={20}
              color={color}
            />
          ),
        }}
      />
    </TopTab.Navigator>
  );
};

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerTitle: () => <Logo />,
      headerBackground: () => (
        <BackgroundGradient
          colors={["#4777B1", "#6173B4", "#746EB4"]}
          start={{ x: 0.2, y: 1 }}
          end={{ x: 0.8, y: 0.1 }}
        />
      ),
      tabBarActiveTintColor: "#fff",
      tabBarInactiveTintColor: "#a6bedb",
      tabBarLabelStyle: {
        fontSize: 12,
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
        shadowOpacity: 0.05,
        shadowRadius: 15,
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
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
    <Tab.Screen
      name="LoginStack"
      component={LoginStack}
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
  </Tab.Navigator>
);

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitle: () => <Logo />,
        headerBackground: () => (
          <BackgroundGradient
            colors={["#4777B1", "#6173B4", "#746EB4"]}
            start={{ x: 0.2, y: 1 }}
            end={{ x: 0.8, y: 0.1 }}
          />
        ),
        headerTitleAlign: "left",
        headerLeft: () => null,
        headerRight: () => <DrawerToggleButton tintColor="#fff" />,
        drawerPosition: "right",
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="LoginStack" component={LoginStack} />
    </Drawer.Navigator>
  );
};

export default function Navigation() {
  const isTablet = useMediaQuery({ query: "(min-width: 500px)" });

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TabNavigator"
        screenOptions={{ headerShown: false }}
      >
        {isTablet ? (
          <Stack.Screen name="TabNavigator" component={DrawerNavigator} />
        ) : (
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        )}
        <Stack.Screen
          name="Article"
          component={NewsDetails}
          options={({ navigation }) => ({
            headerShown: true,
            title: "",
            presentation: "modal",
            headerShadowVisible: true,
            headerStyle: {
              backgroundColor: "#4777B1",
            },
            headerLeft: () => (
              <Icon
                onPress={navigation.goBack}
                name="arrow-left-thick"
                size={30}
                color="#eef3fb"
              />
            ),
            headerRight: () => (
              <Icon
                onPress={() => {}}
                name="bookmark-outline"
                size={30}
                color="#eef3fb"
              />
            ),
          })}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={({ navigation }) => ({
            headerShown: true,
            title: "Reset Password",
            headerTintColor: "#fff",
            presentation: "modal",
            headerShadowVisible: true,
            headerStyle: {
              backgroundColor: "#4777B1",
            },
            headerLeft: () => (
              <Icon
                onPress={navigation.goBack}
                name="arrow-left-thick"
                size={30}
                color="#eef3fb"
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
