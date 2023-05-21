import { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import * as WebBrowser from 'expo-web-browser';
import { IconButton, Menu } from 'react-native-paper';

import { openDialog, openSnackbar } from '@/context/reducers/ui-reducer';
import { Article } from '@/context/types';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch } from '@/hooks/useRedux';
import { NewsDetailsProps } from '@/navigation/types';
import {
  useAddBookmarkMutation,
  useRemoveBookmarkMutation
} from '@/services/api';

interface ModalTopBarProps extends Pick<NewsDetailsProps, 'navigation'> {
  article: Article;
}

const ModalTopBar = ({ navigation, article }: ModalTopBarProps) => {
  const [isBookmarked, setIsBookmarked] = useState(article.isBookmarked);
  const [visible, setVisible] = useState(false);

  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const [addBookmark] = useAddBookmarkMutation();
  const [removeBookmark] = useRemoveBookmarkMutation();

  const dispatchOpenDialog = () => {
    dispatch(
      openDialog({
        isOpen: true,
        title: 'Login Required',
        action: {
          label: 'Login',
          screen: 'LoginStack'
        }
      })
    );
  };

  const handleAddBookmark = async () => {
    dispatch(
      openSnackbar({
        message: 'Article Saved!',
        keyId: 'bookmark-toast'
      })
    );
    setIsBookmarked(true);
    await addBookmark({
      articleId: article.id,
      article: article
    });
  };

  const handleBookmarkRemoval = async () => {
    dispatch(
      openSnackbar({
        message: 'Article Unsaved!',
        keyId: 'bookmark-toast'
      })
    );
    setIsBookmarked(false);
    await removeBookmark({
      articleId: article.id
    });
  };

  return (
    <View style={styles.container}>
      <Icon
        onPress={navigation.goBack}
        name="close-thick"
        size={30}
        color="#eef3fb"
        style={{ marginLeft: 10 }}
      />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton
            icon="dots-vertical"
            iconColor="#eef3fb"
            size={28}
            onPress={openMenu}
          />
        }
        contentStyle={{ backgroundColor: '#31527a' }}
        style={{ top: 45 }}
      >
        <Menu.Item
          title={isBookmarked ? 'Unsave' : 'Save!'}
          titleStyle={{ color: '#eef3fb', fontFamily: 'RobotoBold' }}
          leadingIcon={() => (
            <Icon
              name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={25}
              color="#eef3fb"
            />
          )}
          onPress={async () => {
            closeMenu();
            if (!isAuth) {
              dispatchOpenDialog();
            } else {
              try {
                if (isBookmarked) {
                  handleBookmarkRemoval();
                } else {
                  handleAddBookmark();
                }
              } catch (error) {
                /* empty */
              }
            }
          }}
        />
        <Menu.Item
          title="Open in browser"
          titleStyle={{ color: '#eef3fb', fontFamily: 'RobotoBold' }}
          leadingIcon={() => (
            <Icon
              name="arrow-top-right-bold-box-outline"
              size={25}
              color="#eef3fb"
            />
          )}
          onPress={async () => {
            closeMenu();
            await WebBrowser.openBrowserAsync(article.link ?? '');
          }}
        />
      </Menu>
    </View>
  );
};

export default memo(ModalTopBar);

const styles = StyleSheet.create({
  container: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4777B1'
  }
});
