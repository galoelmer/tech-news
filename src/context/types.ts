import type { RootStackParamList } from "@/navigation/types";

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  pubDate: string;
  source_id: string;
  link: string;
  image_url: string;
  keywords: string[] | null;
  creator: string[] | null;
}

export interface NewsState {
  focusArticleUrl: string | null;
}

export interface UserInfo {
  userId: string;
  userName?: string;
  favorites: string[] | number[];
}

export interface AuthState {
  isAuth: boolean;
  userInfo: UserInfo;
}

export interface DialogState {
  isOpen: boolean;
  title: string;
  content?: string;
  action?:
    | {
        label?: string;
        screen?: keyof RootStackParamList;
      }
    | undefined;
}

export interface SnackbarState {
  isOpen: boolean;
  message: string;
}

export interface UiState {
  dialog: DialogState;
  snackbar: SnackbarState;
  tabBarHeight: number | null;
}
