import { Article } from '@/context/types';

export interface AuthResponse {
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AddBookmarkRequest {
  articleId: string;
  article: Article;
}
