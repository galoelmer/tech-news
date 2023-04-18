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

export interface InitialState {
  articles: Article[];
  loading: boolean;
  maxLimit: boolean;
  offset: number;
}
