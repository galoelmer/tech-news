import { ComponentType } from 'react';

import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { selectDialogState } from '@/context/reducers/ui-reducer';
import { closeDialog } from '@/context/reducers/ui-reducer';
import { navigateTo } from '@/hooks/useDynamicNavigate';
import useNavigation from '@/hooks/useNavigation';
import { NewsDetailsProps } from '@/navigation/types';

export function withDialog<T extends NewsDetailsProps = NewsDetailsProps>(
  WrappedComponent: ComponentType<T>
) {
  const ComponentWithDialog = (props: Omit<T, keyof NewsDetailsProps>) => {
    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    const { isOpen, title, content, action } = useSelector(selectDialogState);

    const hideDialog = () => dispatch(closeDialog());

    const handleCallback = () => {
      if (action && action.screen) {
        hideDialog();
        navigateTo({ navigate, route: action.screen });
      }
    };
    return (
      <Portal.Host>
        <Portal>
          <Dialog
            visible={isOpen}
            onDismiss={hideDialog}
            style={{
              backgroundColor: '#b4c8e1',
              position: 'absolute',
              top: '20%',
              left: 0,
              right: 0
            }}
          >
            <Dialog.Icon icon="information" color="#b18147" size={30} />
            <Dialog.Title
              style={{
                fontFamily: 'Roboto',
                fontSize: 20,
                textAlign: 'center',
                letterSpacing: 1,
                color: '#090f17'
              }}
            >
              {title}
            </Dialog.Title>
            {content && (
              <Dialog.Content>
                <Text variant="bodyMedium">{content}</Text>
              </Dialog.Content>
            )}
            <Dialog.Actions style={{ justifyContent: 'space-around' }}>
              {action && action.label && action.screen && (
                <Button
                  onPress={handleCallback}
                  labelStyle={{
                    fontFamily: 'RobotoBold',
                    fontSize: 16,
                    marginHorizontal: 20
                  }}
                  textColor="#47acb1"
                  mode="contained-tonal"
                  style={{ backgroundColor: '#ecf7f7' }}
                >
                  {action.label}
                </Button>
              )}
              <Button
                onPress={hideDialog}
                labelStyle={{
                  fontFamily: 'RobotoBold',
                  fontSize: 16,
                  marginHorizontal: 20
                }}
                textColor="#47acb1"
                mode="contained-tonal"
                style={{ backgroundColor: '#ecf7f7' }}
              >
                OK
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <WrappedComponent {...(props as T)} />
      </Portal.Host>
    );
  };

  return ComponentWithDialog;
}

export default withDialog;
