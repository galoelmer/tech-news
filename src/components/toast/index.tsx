import { memo, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Snackbar, Text } from 'react-native-paper';
import Animated, { SlideInDown } from 'react-native-reanimated';

import { closeSnackbar } from '@/context/reducers/ui-reducer';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';

type ToastProps = {
  toastId?: string;
};

// TODO: create toast with identification keys
const Toast = ({ toastId }: ToastProps) => {
  const dispatch = useAppDispatch();
  const tabBarHeight = useAppSelector((state) => state.ui.tabBarHeight);
  const { isOpen, message, keyId } = useAppSelector(
    (state) => state.ui.snackbar
  );

  const onDismissSnackBar = () => {
    dispatch(closeSnackbar());
  };

  useEffect(() => {
    if (isOpen) {
      onDismissSnackBar();
    }
  }, []);

  if (!isOpen) return null;

  if (keyId) {
    if (keyId !== toastId) return null;
  }

  return (
    <Animated.View
      entering={SlideInDown.duration(600)}
      style={styles.container}
    >
      <Snackbar
        visible
        onDismiss={onDismissSnackBar}
        duration={3500}
        elevation={2}
        onIconPress={onDismissSnackBar}
        icon="close"
        style={{
          backgroundColor: '#2b486b',
          marginHorizontal: 50,
          marginBottom: tabBarHeight ?? 60
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Icon name="bookmark-plus" size={25} color="#eef3fb" />
          <Text
            style={{
              fontFamily: 'RobotoBold',
              fontSize: 16,
              letterSpacing: 1,
              color: '#eef3fb',
              marginLeft: 5
            }}
          >
            {message}
          </Text>
        </View>
      </Snackbar>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between'
  }
});

export default memo(Toast);
