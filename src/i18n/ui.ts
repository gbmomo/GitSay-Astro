import siteConfig from '@config/site';
import {
  DEFAULT_LOCALE,
  LOCALE_LABELS,
  SUPPORTED_LOCALES,
  type LocaleCode,
} from '@config/locales';

type UiDictionary = Record<string, string>;

const fallbackTexts: UiDictionary = {
  'ui.categories': 'Categories',
  'ui.profile': 'Profile',
  'ui.projects': 'Projects',
  'ui.projects_title': 'Projects',
  'ui.projects_description': 'Featured projects and experiments',
  'ui.contacts': 'Contact',
  'ui.about': 'About',
  'ui.technology': 'Technology',
  'ui.technology_posts': 'Technology Posts',
  'ui.technology_description': 'Latest posts about technology, programming, and development',
  'ui.blog': 'Blog',
  'ui.blog_posts': 'Blog Posts',
  'ui.blog_description': 'Personal thoughts, experiences, and insights',
  'ui.not_found': 'Post not found',
  'ui.no_posts': 'No posts yet',
  'ui.search': 'Search',
  'ui.search_placeholder': 'Search...',
  'ui.prev': 'Prev',
  'ui.next': 'Next',
  'ui.back': 'Back',
  'ui.top': 'Top',
  'ui.search_results_heading': 'Search results',
  'ui.search_no_results': 'No results found',
  'ui.page_not_found': 'Page not found',
  'ui.404_message': 'The page you are looking for does not exist.',
  'ui.ai_warning': 'The content of this material is written or translated using AI',
  'ui.contents': 'Contents',
  'ui.all_posts': 'All Posts',
};

const getLocalizedValue = <T>(
  record: Record<LocaleCode, T>,
  code: LocaleCode,
): T => {
  return record[code] ?? record[DEFAULT_LOCALE];
};

const getCategoryLabel = (
  categoryId: string,
  code: LocaleCode,
  fallback: string,
): string => {
  const category = siteConfig.categories[categoryId];
  if (!category) {
    return fallback;
  }

  return (
    category.label?.[code] ??
    category.label?.[DEFAULT_LOCALE] ??
    fallback
  );
};

const getCategoryDescription = (
  categoryId: string,
  code: LocaleCode,
  fallback: string,
): string => {
  const category = siteConfig.categories[categoryId];
  if (!category) {
    return fallback;
  }

  return (
    category.description?.[code] ??
    category.description?.[DEFAULT_LOCALE] ??
    fallback
  );
};

const localeOverrides: Partial<Record<LocaleCode, Partial<UiDictionary>>> = {
  zh: {
    'ui.categories': '分类',
    'ui.profile': '关于网站',
    'ui.projects': '项目',
    'ui.projects_title': '项目',
    'ui.projects_description': '精选项目和实验',
    'ui.contacts': '联系方式',
    'ui.about': '关于',
    'ui.technology': '技术',
    'ui.technology_posts': '技术文章',
    'ui.technology_description': '关于技术、编程和开发的最新文章',
    'ui.blog': '博客',
    'ui.blog_posts': '博客文章',
    'ui.blog_description': '个人想法、经验和见解',
    'ui.not_found': '文章未找到',
    'ui.no_posts': '暂无文章',
    'ui.search': '搜索',
    'ui.search_placeholder': '搜索...',
    'ui.prev': '上一页',
    'ui.next': '下一页',
    'ui.back': '返回',
    'ui.top': '回到顶部',
    'ui.search_results_heading': '搜索结果',
    'ui.search_no_results': '未找到结果',
    'ui.page_not_found': '页面未找到',
    'ui.404_message': '您要查找的页面不存在。',
    'ui.ai_warning': '本文内容由 AI 撰写或翻译',
    'ui.contents': '目录',
    'ui.all_posts': '所有文章',
  },
};

const buildDictionary = (code: LocaleCode): UiDictionary => {
  const base: UiDictionary = { ...fallbackTexts };

  base.name = getLocalizedValue(siteConfig.author.name, code);
  base['ui.description'] = getLocalizedValue(siteConfig.description, code);

  base['ui.projects'] = getCategoryLabel('projects', code, base['ui.projects']);
  base['ui.projects_title'] = getCategoryLabel(
    'projects',
    code,
    base['ui.projects_title'],
  );
  base['ui.projects_description'] = getCategoryDescription(
    'projects',
    code,
    base['ui.projects_description'],
  );

  base['ui.technology'] = getCategoryLabel(
    'technology',
    code,
    base['ui.technology'],
  );
  base['ui.technology_description'] = getCategoryDescription(
    'technology',
    code,
    base['ui.technology_description'],
  );

  base['ui.blog'] = getCategoryLabel('blog', code, base['ui.blog']);
  base['ui.blog_description'] = getCategoryDescription(
    'blog',
    code,
    base['ui.blog_description'],
  );

  const overrides = localeOverrides[code] ?? {};
  return {
    ...base,
    ...overrides,
  };
};

export const languages: Record<LocaleCode, string> = { ...LOCALE_LABELS };

export const defaultLang = siteConfig.defaultLanguage ?? DEFAULT_LOCALE;

export const ui = SUPPORTED_LOCALES.reduce<Record<LocaleCode, UiDictionary>>(
  (acc, code) => {
    acc[code] = buildDictionary(code);
    return acc;
  },
  {} as Record<LocaleCode, UiDictionary>,
);

export const showDefaultLang = false;
