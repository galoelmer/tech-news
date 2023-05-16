import { View } from 'react-native';

import { useRoute } from '@react-navigation/native';
import { Button, TouchableRipple } from 'react-native-paper';

import useNavigation from '@/hooks/useNavigation';

const HeaderRightButton = () => {
  const { navigate } = useNavigation();
  const { name } = useRoute();

  const isAccountScreen = name === 'Account';

  const navigateToHome = () => navigate('Home');
  const navigateToAccount = () => navigate('Account', { screen: 'Login' });

  const buttonProps = {
    icon: isAccountScreen ? 'home-variant' : 'account',
    onPress: isAccountScreen ? navigateToHome : navigateToAccount,
    label: isAccountScreen ? 'Home' : 'Login'
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableRipple
        onPress={buttonProps.onPress}
        rippleColor="rgba(0, 0, 0, .32)"
        style={{
          borderRadius: 20,
          marginHorizontal: 10
        }}
      >
        <Button
          icon={buttonProps.icon}
          textColor="#f0eff7"
          buttonColor="#6861ad"
        >
          {buttonProps.label}
        </Button>
      </TouchableRipple>
    </View>
  );
};

export default HeaderRightButton;
