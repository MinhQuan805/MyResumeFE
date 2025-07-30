export interface ArticleType {
  _id: string;
  title: string;
  thumbnail?: string;
  position: number;
  status: string;
  introduction: string;
  content: string;
  tags: string[];
  views: number;
  outstand: boolean;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  deleted: boolean;
}

export interface ArticleResponse {
    data: ArticleType[];
    currentPage: number;
    totalItems: number;
}