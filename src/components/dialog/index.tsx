import { ComponentType } from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { selectDialogState } from "@/context/reducers/ui-reducer";
import { closeDialog } from "@/context/reducers/ui-reducer";

import useNavigation from "@/hooks/useNavigation";

import { NewsDetailsProps } from "@/navigation/types";

const withDialog =
  <T,>(Component: ComponentType<T & NewsDetailsProps>) =>
  (props: NewsDetailsProps) => {
    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    const { isOpen, title, content, action } = useSelector(selectDialogState);

    const hideDialog = () => dispatch(closeDialog());

    const handleCallback = () => {
      if (action?.screen) {
        hideDialog();
        navigate(action.screen); // TODO: fix this type error
      }
    };

    return (
      <Portal.Host>
        <Portal>
          <Dialog
            visible={isOpen}
            onDismiss={hideDialog}
            style={{
              backgroundColor: "#fff",
              position: "absolute",
              top: "20%",
              left: 0,
              right: 0,
            }}
          >
            <Dialog.Title>{title}</Dialog.Title>
            {content && (
              <Dialog.Content>
                <Text variant="bodyMedium">{content}</Text>
              </Dialog.Content>
            )}
            <Dialog.Actions>
              {action && action.label && action.screen && (
                <Button onPress={handleCallback}>
                  {action.label.toUpperCase()}
                </Button>
              )}
              <Button onPress={hideDialog}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Component {...props} />
      </Portal.Host>
    );
  };

export default withDialog;
