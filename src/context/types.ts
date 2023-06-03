import type { RootStackParamList } from 'navigation/types';

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
  isBookmarked?: boolean;
}

export interface AuthState {
  isAuth: boolean;
}

export interface DialogState {
  isOpen: boolean;
  title: string;
  content?: string;
  action?: {
    label: string;
    screen: keyof RootStackParamList;
  };
}

export interface SnackbarState {
  isOpen: boolean;
  message: string;
}

export interface UiState {
  dialog: DialogState;
  snackbar: SnackbarState;
  tabBarHeight: number | null;
  previousScreen: string | null;
}
