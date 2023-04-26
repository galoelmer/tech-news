import { useNavigation } from "@react-navigation/native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "navigation/types";

type ProfileScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default useNavigation<ProfileScreenNavigationProp>;
