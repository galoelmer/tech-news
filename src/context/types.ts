export interface Article {
  id: string;
  title: string;
  description: string;
  imageSource: string;
  publishedAt: string;
  sourceName: string;
  url: string;
  urlToImage: string;
}

export interface InitialState {
  articles: Article[];
  loading: boolean;
  maxLimit: boolean;
  offset: number;
}
