import { NavigationProp } from '@react-navigation/native';

import { RootStackParamList } from '@/navigation/types';

type useDynamicNavigateProps = {
  navigate: NavigationProp<RootStackParamList>['navigate'];
  route: keyof RootStackParamList;
  screen?: keyof RootStackParamList extends 'LoginStack'
    ? 'Login' | 'Signup'
    : never;
};

const useDynamicNavigate = ({
  navigate,
  route,
  screen
}: useDynamicNavigateProps) => {
  switch (route) {
    case 'LoginStack':
      return navigate('LoginStack', { screen: screen ?? 'Login' });
    default:
      return navigate('Home');
  }
};

export const navigateTo = useDynamicNavigate;
