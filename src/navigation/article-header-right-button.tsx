import { View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import {
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from "@/services/api";
import useAuth from "@/hooks/useAuth";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { openDialog, openSnackbar } from "@/context/reducers/ui-reducer";

const ArticleHeaderRightButton = () => {
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();

  const [addBookmark] = useAddBookmarkMutation();
  const [removeBookmark] = useRemoveBookmarkMutation();
  const focusArticle = useAppSelector((state) => state.news.focusArticle);

  return (
    <View style={{ flexDirection: "row" }}>
      <Icon
        onPress={async () => {
          await WebBrowser.openBrowserAsync(focusArticle.url ?? "");
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
                title: "Login Required",
                action: {
                  label: "Login",
                  screen: "LoginStack",
                },
              })
            );
          } else {
            if (focusArticle.id && focusArticle.article) {
              try {
                if (focusArticle.isBookmarked) {
                  dispatch(openSnackbar("Article Unsaved!"));
                  await removeBookmark({
                    articleId: focusArticle.id,
                  });
                } else {
                  dispatch(openSnackbar("Article Saved!"));
                  await addBookmark({
                    articleId: focusArticle.id,
                    article: focusArticle.article,
                  });
                }
              } catch (error) {}
            }
          }
        }}
        name={focusArticle.isBookmarked ? "bookmark" : "bookmark-outline"}
        size={30}
        color="#eef3fb"
      />
    </View>
  );
};

export default ArticleHeaderRightButton;
