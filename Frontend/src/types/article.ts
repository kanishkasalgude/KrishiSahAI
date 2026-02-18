export interface LocalizedContent {
    en: string;
    hi: string;
    mr: string;
}

export interface ArticleContent {
    title: LocalizedContent;
    excerpt: LocalizedContent;
    content: LocalizedContent; // HTML string or Markdown
}

export interface Article {
    slug: string;
    heroImage: string;
    data: ArticleContent;
    author?: string;
    date?: string;
    readTime?: string;
}
