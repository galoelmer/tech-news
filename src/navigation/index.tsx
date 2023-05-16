import { Dimensions } from 'react-native';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFlipper } from '@react-navigation/devtools';
import {
  createDrawerNavigator,
  DrawerToggleButton
} from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  NavigationContainer,
  useNavigationContainerRef
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from 'react-native-paper';
import { useMediaQuery } from 'react-responsive';

import { RootStackParamList } from './types';

import BottomTabBar from '@/components/bottom-tab-bar';
import BackgroundGradient from '@/components/gradient-background';
import Logo from '@/components/logo';
import useAuth from '@/hooks/useAuth';
import ArticleHeaderRightButton from '@/navigation/article-header-right-button';
import Bookmarks from '@/screens/bookmarks';
import Home from '@/screens/home';
import Login from '@/screens/login';
import NewsDetails from '@/screens/news-details';
import ResetPassword from '@/screens/reset-password';
import Search from '@/screens/search';
import Settings from '@/screens/settings';
import AccountInfo from '@/screens/settings/account-info';
import Appearance from '@/screens/settings/appearance';
import SignUp from '@/screens/signup';

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const LoginStack = () => {
  return (
    <TopTab.Navigator
      initialRouteName="Login"
      initialLayout={{ width: Dimensions.get('window').width }}
      screenOptions={{
        tabBarLabelStyle: {
          fontFamily: 'Roboto',
          fontWeight: 'bold',
          letterSpacing: 2
        },
        tabBarItemStyle: {
          flexDirection: 'row'
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#6173B4'
        }
      }}
    >
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? 'account' : 'account-outline'}
              size={20}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="Signup"
        component={SignUp}
        options={{
          tabBarLabel: 'Sign Up',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? 'account-plus' : 'account-plus-outline'}
              size={20}
              color={color}
            />
          )
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
        animation: 'simple_push',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: '#F1F0F6' },
        contentStyle: { backgroundColor: '#fff' },
        headerTitle: '',
        headerLeft: () => (
          <IconButton
            icon="arrow-left-thick"
            onPress={() => navigation.goBack()}
            style={{ marginLeft: -10 }}
          />
        )
      })}
    >
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerLeft: undefined
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
            colors={['#4777B1', '#6173B4', '#746EB4']}
            start={{ x: 0.2, y: 1 }}
            end={{ x: 0.8, y: 0.1 }}
          />
        )
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'home-variant' : 'home-variant-outline'}
              size={size}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'text-box-search' : 'text-box-search-outline'}
              size={size}
              color={color}
            />
          )
        }}
      />
      {isAuth ? (
        <Tab.Screen
          name="Bookmarks"
          component={Bookmarks}
          options={{
            tabBarLabel: 'Bookmarks',
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                name={focused ? 'bookmark' : 'bookmark-outline'}
                size={size}
                color={color}
              />
            )
          }}
        />
      ) : (
        <Tab.Screen
          name="LoginStack"
          component={LoginStack}
          options={{
            tabBarLabel: 'Login / Signup',
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                name={focused ? 'account' : 'account-outline'}
                size={size}
                color={color}
              />
            )
          }}
        />
      )}
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'cog' : 'cog-outline'}
              size={size}
              color={color}
            />
          )
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
            colors={['#4777B1', '#6173B4', '#746EB4']}
            start={{ x: 0.2, y: 1 }}
            end={{ x: 0.8, y: 0.1 }}
          />
        ),
        headerTitleAlign: 'left',
        headerLeft: () => null,
        headerRight: () => <DrawerToggleButton tintColor="#fff" />,
        drawerPosition: 'right'
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="LoginStack" component={LoginStack} />
    </Drawer.Navigator>
  );
};

export default function Navigation() {
  const navigationRef = useNavigationContainerRef();
  useFlipper(navigationRef);

  const isTablet = useMediaQuery({ query: '(min-width: 500px)' });

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
            title: '',
            presentation: 'modal',
            headerShadowVisible: true,
            headerStyle: {
              backgroundColor: '#4777B1'
            },
            headerLeft: () => (
              <Icon
                onPress={navigation.goBack}
                name="close-thick"
                size={30}
                color="#eef3fb"
              />
            ),
            headerRight: () => <ArticleHeaderRightButton />
          })}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'Reset Password',
            headerTintColor: '#fff',
            presentation: 'modal',
            headerShadowVisible: true,
            headerStyle: {
              backgroundColor: '#4777B1'
            },
            headerLeft: () => (
              <Icon
                onPress={navigation.goBack}
                name="arrow-left-thick"
                size={30}
                color="#eef3fb"
              />
            )
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
