import { Dimensions } from 'react-native';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Login from '@/screens/login';
import SignUp from '@/screens/signup';

const TopTab = createMaterialTopTabNavigator();

export const LoginStack = () => {
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
      <TopTab.Screen
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
      <TopTab.Screen
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
