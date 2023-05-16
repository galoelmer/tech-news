import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { LoginStack } from './login-stack-navigator';
import { SettingsStack } from './settings-stack-navigator';

import BackgroundGradient from '@/components/gradient-background';
import Logo from '@/components/logo';
import useAuth from '@/hooks/useAuth';
import BottomTabBar from '@/navigation/navigation-components/bottom-tab-bar';
import Bookmarks from '@/screens/bookmarks';
import Home from '@/screens/home';
import Search from '@/screens/search';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
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
