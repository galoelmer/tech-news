import { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AccountTabsParamList = {
  Login: undefined;
  Signup: undefined;
};

export type RootStackParamList = {
  NewsFeed: undefined;
  Home: undefined;
  Account: NavigatorScreenParams<AccountTabsParamList>;
  Settings: undefined;
  AccountInfo: undefined;
  Appearance: undefined;
  TabNavigator: undefined;
  Article: { id?: string; previousScreen?: string };
  Bookmarks: undefined;
  ResetPassword: undefined;
};

export type NewsDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'Article'
>;

export type SettingsProps = NativeStackScreenProps<
  RootStackParamList,
  'Settings'
>;
