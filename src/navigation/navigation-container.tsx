import {
  NavigationContainer,
  useNavigationContainerRef
} from '@react-navigation/native';

export default ({ children }: React.PropsWithChildren) => {
  const navigationRef = useNavigationContainerRef();

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line
    const { useFlipper } = require('@react-navigation/devtools');
    useFlipper(navigationRef);
  }

  return (
    <NavigationContainer ref={navigationRef}>{children}</NavigationContainer>
  );
};
