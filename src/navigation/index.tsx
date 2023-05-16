import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useMediaQuery } from 'react-responsive';

import NavigationContainer from './navigation-container';
import { DrawerNavigator, TabNavigator } from './navigators';
import { RootStackParamList } from './types';

import NewsDetails from '@/screens/news-details';
import ResetPassword from '@/screens/reset-password';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  const isTablet = useMediaQuery({ query: '(min-width: 500px)' });

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
          options={{ presentation: 'modal' }}
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
