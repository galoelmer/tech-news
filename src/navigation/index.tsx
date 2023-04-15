import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerToggleButton,
} from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";

import Logo from "components/logo";
import Register from "screens/register";
import Login from "screens/login";
import Home from "screens/home";

const Drawer = createDrawerNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitle: () => <Logo />,
          headerRight: () => <DrawerToggleButton tintColor="#fff" />,
          headerLeft: () => null,
          headerStyle: {
            backgroundColor: "#5f8dda",
          },
          drawerLabelStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },
          drawerPosition: "right",
          sceneContainerStyle: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Drawer.Screen
          name="News"
          component={Home}
          options={{
            drawerIcon: () => (
              <Ionicons name="newspaper-outline" size={30} color="#5f8dda" />
            ),
          }}
        />
        <Drawer.Screen
          name="Login"
          component={Login}
          options={{
            drawerIcon: () => (
              <Ionicons name="log-in-outline" size={30} color="#5f8dda" />
            ),
          }}
        />
        <Drawer.Screen
          name="Register"
          component={Register}
          options={{
            drawerIcon: () => (
              <Ionicons name="person-add-outline" size={30} color="#5f8dda" />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
