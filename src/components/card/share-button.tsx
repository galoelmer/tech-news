import { useState } from 'react';

import { Button, Menu } from 'react-native-paper';

const ShareButton = () => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Button
          mode="contained-tonal"
          icon="share-variant-outline"
          onPress={openMenu}
        >
          Share
        </Button>
      }
    >
      {['facebook', 'twitter', 'linkedin', 'instagram', 'email'].map((item) => (
        <Menu.Item
          key={item}
          onPress={closeMenu}
          leadingIcon={item}
          title={item}
          titleStyle={{ textTransform: 'capitalize' }}
          accessibilityLabel={`share via ${item}`}
        />
      ))}
    </Menu>
  );
};

export default ShareButton;
