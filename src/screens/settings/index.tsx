import { Pressable, PressableProps, StyleSheet, View } from 'react-native';

import * as SecureStore from 'expo-secure-store';
import useAuth from 'hooks/useAuth';
import { Button, Divider, List, ListIconProps, Text } from 'react-native-paper';

import type { SettingsProps } from '@/navigation/types';
import { useLogoutUserMutation } from '@/services/api';
type ListItemProps = {
  title: string;
  icon: ListIconProps['icon'];
  onPress: PressableProps['onPress'];
};

const ListItem = ({ title, icon, onPress }: ListItemProps) => {
  const color = (pressed: boolean) => (pressed ? '#4777B1' : '#000');

  return (
    <View>
      <Pressable onPress={onPress}>
        {({ pressed }) => (
          <List.Item
            titleStyle={{
              fontFamily: 'Roboto',
              color: color(pressed)
            }}
            title={title}
            left={() => <List.Icon icon={icon} color={color(pressed)} />}
            right={() => (
              <List.Icon icon="chevron-right" color={color(pressed)} />
            )}
          />
        )}
      </Pressable>
      <Divider />
    </View>
  );
};

const Settings = ({ navigation }: SettingsProps) => {
  const { isAuth } = useAuth();
  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>
        Settings
      </Text>
      <List.Section style={styles.list}>
        {isAuth && (
          <ListItem
            title="Account Information"
            icon="account-outline"
            onPress={() => navigation.navigate('AccountInfo')}
          />
        )}
        <ListItem
          title="Appearance"
          icon="theme-light-dark"
          onPress={() => navigation.navigate('Appearance')}
        />
      </List.Section>
      {isAuth && (
        <Button
          disabled={!isAuth || isLoading}
          style={styles.logoutButton}
          labelStyle={styles.logoutButtonLabel}
          mode="outlined"
          onPress={async () => {
            await SecureStore.deleteItemAsync('token');
            await logoutUser();
            navigation.navigate('Home');
          }}
          loading={isLoading}
        >
          Log out
        </Button>
      )}
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    fontFamily: 'RobotoBold',
    textAlign: 'center',
    paddingVertical: 20,
    backgroundColor: '#F1F0F6'
  },
  list: {
    flex: 1,
    paddingHorizontal: 25
  },
  logoutButton: {
    borderWidth: 2,
    borderColor: '#000',
    marginBottom: 30,
    marginHorizontal: 25
  },
  logoutButtonLabel: {
    fontFamily: 'RobotoBold',
    fontSize: 16,
    letterSpacing: 2,
    color: '#000'
  }
});
