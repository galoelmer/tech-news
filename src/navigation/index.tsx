import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  createDrawerNavigator,
  DrawerToggleButton,
} from "@react-navigation/drawer";
import { IconButton } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useMediaQuery } from "react-responsive";
import { useFlipper } from "@react-navigation/devtools";
import * as WebBrowser from "expo-web-browser";

import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import useAuth from "@/hooks/useAuth";
import { openDialog } from "@/context/reducers/ui-reducer";

import Home from "@/screens/home";
import Login from "@/screens/login";
import Search from "@/screens/search";
import SignUp from "@/screens/signup";
import Settings from "@/screens/settings";
import Bookmarks from "@/screens/bookmarks";
import NewsDetails from "@/screens/news-details";
import ResetPassword from "@/screens/reset-password";
import Appearance from "@/screens/settings/appearance";
import AccountInfo from "@/screens/settings/account-info";

import Logo from "@/components/logo";
import BottomTabBar from "@/components/bottom-tab-bar";
import BackgroundGradient from "@/components/gradient-background";

import { RootStackParamList } from "./types";

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

const SettingsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={({ navigation }) => ({
        animation: "simple_push",
        headerShadowVisible: false,
        headerStyle: { backgroundColor: "#F1F0F6" },
        contentStyle: { backgroundColor: "#fff" },
        headerTitle: "",
        headerLeft: () => (
          <IconButton
            icon="arrow-left-thick"
            onPress={() => navigation.goBack()}
            style={{ marginLeft: -10 }}
          />
        ),
      })}
    >
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerLeft: undefined,
        }}
      />
      <Stack.Screen name="AccountInfo" component={AccountInfo} />
      <Stack.Screen name="Appearance" component={Appearance} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const { isAuth } = useAuth();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerTitle: () => <Logo />,
        headerBackground: () => (
          <BackgroundGradient
            colors={["#4777B1", "#6173B4", "#746EB4"]}
            start={{ x: 0.2, y: 1 }}
            end={{ x: 0.8, y: 0.1 }}
          />
        ),
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
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? "text-box-search" : "text-box-search-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      {isAuth ? (
        <Tab.Screen
          name="Bookmarks"
          component={Bookmarks}
          options={{
            tabBarLabel: "Bookmarks",
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                name={focused ? "bookmark" : "bookmark-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="LoginStack"
          component={LoginStack}
          options={{
            tabBarLabel: "Login / Signup",
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                name={focused ? "account" : "account-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? "cog" : "cog-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

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
  const navigationRef = useNavigationContainerRef();
  const isTablet = useMediaQuery({ query: "(min-width: 500px)" });
  const focusArticleUrl = useAppSelector(
    (state) => state.news.focusArticlesUrl
  );
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();
  useFlipper(navigationRef);

  return (
    <NavigationContainer ref={navigationRef}>
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
                name="close-thick"
                size={30}
                color="#eef3fb"
              />
            ),
            headerRight: () => (
              <>
                <Icon
                  onPress={async () => {
                    await WebBrowser.openBrowserAsync(focusArticleUrl ?? "");
                  }}
                  name="arrow-top-right-bold-box-outline"
                  size={30}
                  color="#eef3fb"
                  style={{ marginRight: 20 }}
                />
                <Icon
                  onPress={() => {
                    if (!isAuth) {
                      dispatch(
                        openDialog({
                          isOpen: true,
                          title: "Login Required",
                          action: {
                            label: "Login",
                            screen: "LoginStack",
                          },
                        })
                      );
                    }
                  }}
                  name="bookmark-outline"
                  size={30}
                  color="#eef3fb"
                />
              </>
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
