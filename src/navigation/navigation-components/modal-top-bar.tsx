import { useState } from 'react';
import { View } from 'react-native';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import * as WebBrowser from 'expo-web-browser';
import { IconButton, Menu } from 'react-native-paper';

import { openDialog, openSnackbar } from '@/context/reducers/ui-reducer';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { NewsDetailsProps } from '@/navigation/types';
import {
  useAddBookmarkMutation,
  useRemoveBookmarkMutation
} from '@/services/api';
import { useGetNewsDataQuery, useGetUserBookmarksQuery } from '@/services/api';

// TODO: Refactor this component
const ModalTopBar = ({ navigation }: Pick<NewsDetailsProps, 'navigation'>) => {
  const [visible, setVisible] = useState(false);
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const [addBookmark] = useAddBookmarkMutation();
  const [removeBookmark] = useRemoveBookmarkMutation();
  const focusArticle = useAppSelector((state) => state.news.focusArticle);
  const previousScreen = useAppSelector((state) => state.ui.previousScreen);

  const { article } = useGetNewsDataQuery(undefined, {
    skip: previousScreen === 'bookmarks',
    selectFromResult: ({ data }) => ({
      article: data?.find((item) => item.id === focusArticle?.id)
    })
  });

  const { bookmark } = useGetUserBookmarksQuery(undefined, {
    skip: previousScreen === 'home',
    selectFromResult: ({ data }) => ({
      bookmark: data?.find((item) => item.id === focusArticle?.id)
    })
  });

  return (
    <View
      style={{
        height: 55,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#4777B1'
      }}
    >
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
          title={focusArticle?.isBookmarked ? 'Unsave' : 'Save!'}
          titleStyle={{ color: '#eef3fb', fontFamily: 'RobotoBold' }}
          leadingIcon={() => (
            <Icon
              name={
                focusArticle?.isBookmarked ? 'bookmark' : 'bookmark-outline'
              }
              size={25}
              color="#eef3fb"
            />
          )}
          onPress={async () => {
            closeMenu();
            if (!isAuth) {
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
            } else {
              if (focusArticle?.id) {
                try {
                  if (focusArticle.isBookmarked) {
                    dispatch(
                      openSnackbar({
                        message: 'Article Unsaved!',
                        keyId: 'bookmark-toast'
                      })
                    );
                    await removeBookmark({
                      articleId: focusArticle.id
                    });
                  } else {
                    const currentArticle = article || bookmark;
                    if (currentArticle) {
                      dispatch(
                        openSnackbar({
                          message: 'Article Saved!',
                          keyId: 'bookmark-toast'
                        })
                      );
                      await addBookmark({
                        articleId: focusArticle.id,
                        article: currentArticle
                      });
                    }
                  }
                } catch (error) {
                  /* empty */
                }
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
            await WebBrowser.openBrowserAsync(focusArticle?.url ?? '');
          }}
        />
      </Menu>
    </View>
  );
};

export default ModalTopBar;
