import { View } from 'react-native';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import * as WebBrowser from 'expo-web-browser';

import { openDialog, openSnackbar } from '@/context/reducers/ui-reducer';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import {
  useAddBookmarkMutation,
  useRemoveBookmarkMutation
} from '@/services/api';
import { useGetNewsDataQuery, useGetUserBookmarksQuery } from '@/services/api';

// TODO: Refactor this component
const ArticleHeaderRightButton = () => {
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();

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
    <View style={{ flexDirection: 'row' }}>
      <Icon
        onPress={async () => {
          await WebBrowser.openBrowserAsync(focusArticle?.url ?? '');
        }}
        name="arrow-top-right-bold-box-outline"
        size={30}
        color="#eef3fb"
        style={{ marginRight: 20 }}
      />
      <Icon
        onPress={async () => {
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
                  ); // TODO: fix toast not showing up
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
        // TODO: fix bookmark icon not changing after re-login in bookmarks screen and home screen
        name={focusArticle?.isBookmarked ? 'bookmark' : 'bookmark-outline'}
        size={30}
        color="#eef3fb"
      />
    </View>
  );
};

export default ArticleHeaderRightButton;
