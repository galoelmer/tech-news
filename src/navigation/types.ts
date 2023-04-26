import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  TabNavigator: undefined;
  NewsDetails: { id?: string };
};

export type NewsDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  "NewsDetails"
>;
