import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useFonts } from 'expo-font';
import { useLazyGetUserDataQuery } from 'services/api';

import BackgroundContainer from '@/components/gradient-background';
import Navigation from '@/navigation';

export default function App() {
  const [getUserData, { isLoading }] = useLazyGetUserDataQuery();

  const [fontsLoaded] = useFonts({
    Roboto: require('assets/fonts/Roboto-Regular.ttf'),
    RobotoBold: require('assets/fonts/Roboto-Bold.ttf')
  });

  useEffect(() => {
    getUserData();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <BackgroundContainer>
      <Navigation />
    </BackgroundContainer>
  );
}
