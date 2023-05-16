import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  Link,
  LinkingOptions,
  NavigationContainer
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { useMediaQuery } from 'react-responsive';

import HeaderRightButton from './navigation-components/header-right-buttons';
import { RootStackParamList } from './types';

import GradientBackground from '@/components/gradient-background';
import Logo from '@/components/logo';
import Home from '@/screens/home';
import Login from '@/screens/login';
import NewsDetails from '@/screens/news-details';
import Register from '@/screens/signup';

const BottomTabs = createBottomTabNavigator();
const TopTabs = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStackScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'transparent',
          width: '100%',
          maxWidth: 1200,
          marginHorizontal: 'auto'
        }
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Article" component={NewsDetails} />
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
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      NewsFeed: {
        screens: {
          Home: '',
          Article: 'article/:id'
        }
      },
      Account: {
        screens: {
          Login: 'login',
          Signup: 'signup'
        }
      }
    }
  }
};

export default function Navigation() {
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });

  return (
    <NavigationContainer linking={linking}>
      <BottomTabs.Navigator
        id="NewsFeed"
        initialRouteName="NewsFeed"
        tabBar={isMobile ? undefined : () => null}
        screenOptions={{
          headerTitle: () => (
            <Link
              to={{
                screen: 'NewsFeed',
                params: {
                  screen: 'Home'
                }
              }}
            >
              <Logo resizeMode="contain" width={150} />
            </Link>
          ),
          headerBackground: () => (
            <GradientBackground
              colors={['#4777B1', '#6173B4', '#746EB4']}
              start={{ x: 0.2, y: 1 }}
              end={{ x: 0.8, y: 0.1 }}
            />
          ),
          headerRight: () => (isMobile ? null : <HeaderRightButton />),
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#a6bedb',
          tabBarLabelPosition: 'beside-icon',
          tabBarLabelStyle: {
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 2
          },
          tabBarStyle: {
            backgroundColor: '#4777B1',
            borderTopColor: 'transparent',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -5
            },
            shadowOpacity: 0.2,
            shadowRadius: 15
          }
        }}
      >
        <BottomTabs.Screen
          name="NewsFeed"
          component={HomeStackScreen}
          listeners={({ navigation }) => ({
            tabPress: ({ preventDefault }) => {
              preventDefault();
              navigation.navigate('NewsFeed', { screen: 'Home' });
            }
          })}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                name={focused ? 'home-variant' : 'home-variant-outline'}
                size={focused ? size + 5 : size}
                color={color}
              />
            )
          }}
        />
        <BottomTabs.Screen
          name="Account"
          component={AccountTopTabs}
          options={{
            tabBarLabel: 'Login',
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                name={focused ? 'account-circle' : 'account-circle-outline'}
                size={focused ? size + 5 : size}
                color={color}
              />
            )
          }}
        />
      </BottomTabs.Navigator>
    </NavigationContainer>
  );
}
