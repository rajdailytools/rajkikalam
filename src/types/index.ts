export type ContentType = 'shayari' | 'poetry' | 'quote' | 'status' | 'poem';

export type Language = 'hi' | 'en';

export type MoodType = 
  | 'love' 
  | 'sad' 
  | 'dard' 
  | 'lonely' 
  | 'alone'
  | 'hope' 
  | 'attitude' 
  | 'romantic' 
  | 'friendship' 
  | 'life'
  | 'deep';

export interface ContentItem {
  id: string;
  slug: string;
  title: string;
  text: string;
  type: ContentType;
  category: string;
  categorySlug: string;
  language: Language;
  mood: MoodType;
  author: string;
  isDemo: boolean;
  date: string;
  readTime: string;
  featured?: boolean;
  trending?: boolean;
  tags: string[];
}

export interface CategoryInfo {
  name: string;
  nameHi: string;
  slug: string;
  type: ContentType;
  language: Language;
  description: string;
  descriptionHi: string;
  iconName?: string;
  count: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface NavigationLink {
  label: string;
  labelHi: string;
  path: string;
  badge?: string;
}
