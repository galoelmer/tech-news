import { Button, TouchableRipple } from "react-native-paper";
import { useRoute } from "@react-navigation/native";

import useNavigation from "@/hooks/useNavigation";

const HeaderRightButton = () => {
  const { navigate } = useNavigation();
  const { name } = useRoute();

  const isCurrentScreen = name === "Account";

  const navigateToHome = () => navigate("Home");
  const navigateToAccount = () => navigate("Account", { screen: "Login" });

  const buttonProps = {
    icon: isCurrentScreen ? "home-variant" : "account",
    onPress: isCurrentScreen ? navigateToHome : navigateToAccount,
    label: isCurrentScreen ? "Home" : "Login",
  };

  return (
    <TouchableRipple
      onPress={buttonProps.onPress}
      rippleColor="rgba(0, 0, 0, .32)"
      style={{
        borderRadius: 20,
        marginHorizontal: 10,
      }}
    >
      <Button icon={buttonProps.icon} textColor="#f0eff7" buttonColor="#6861ad">
        {buttonProps.label}
      </Button>
    </TouchableRipple>
  );
};

export default HeaderRightButton;
