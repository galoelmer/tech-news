import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from 'react-native-paper';

import { RootStackParamList } from '../types';

import Settings from '@/screens/settings';
import AccountInfo from '@/screens/settings/account-info';
import Appearance from '@/screens/settings/appearance';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const SettingsStack = () => {
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
