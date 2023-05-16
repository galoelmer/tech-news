import {
  createDrawerNavigator,
  DrawerToggleButton
} from '@react-navigation/drawer';

import { LoginStack } from './login-stack-navigator';

import BackgroundGradient from '@/components/gradient-background';
import Logo from '@/components/logo';
import Home from '@/screens/home';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
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
