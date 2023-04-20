import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Logo from "components/logo";
import Register from "screens/register";
import Login from "screens/login";
import Home from "screens/home";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
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
          name="Home"
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
          name="Login"
          component={Login}
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
    </NavigationContainer>
  );
}
