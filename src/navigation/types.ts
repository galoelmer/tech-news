import { NavigatorScreenParams } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AccountTabsParamList = {
  Login: undefined;
  Signup: undefined;
};

export type RootStackParamList = {
  NewsFeed: undefined;
  Home: undefined;
  Account: NavigatorScreenParams<AccountTabsParamList>;
  TabNavigator: undefined;
  Article: { id?: string };
};

export type NewsDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  "Article"
>;
