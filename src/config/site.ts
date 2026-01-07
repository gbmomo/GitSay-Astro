import type { SiteConfig } from './types';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './locales';

const siteConfig: SiteConfig = {
  // Basic site information
  siteUrl: 'https://morethan-log-astro.sereja.com',
  title: {
    zh: 'Morethan-Log',
    en: 'Morethan-Log',
    ru: 'Morethan-Log',
  },
  description: {
    zh: '一个使用 Astro 构建的现代博客模板 - 快速、响应式、多语言',
    en: 'A modern blog template built with Astro - fast, responsive, and multilingual',
    ru: 'Современный шаблон блога на Astro - быстрый, адаптивный и многоязычный',
  },

  // Author information
  author: {
    name: {
      zh: 'Sereja',
      en: 'Sereja',
      ru: 'Серёжа',
    },
    email: 'demo@morethan-log.com',
    avatar: '/img/avatar.svg',
    bio: {
      zh: '全栈开发者，热衷于创建美观实用的 Web 应用。使用 Astro、React 和现代 Web 技术进行开发。',
      en: 'Full-stack developer passionate about creating beautiful and functional web applications. Building with Astro, React, and modern web technologies.',
      ru: 'Full-stack разработчик, увлеченный созданием красивых и функциональных веб-приложений. Работаю с Astro, React и современными веб-технологиями.',
    },
  },

  // Blog settings
  postsPerPage: 10,
  featuredImageFallback: '/img/posts/placeholder.svg',

  // Contact & social links
  contactLinks: [
    {
      id: 'github',
      label: {
        zh: 'GitHub',
        en: 'GitHub',
        ru: 'GitHub',
      },
      url: {
        zh: 'https://github.com/yourusername',
        en: 'https://github.com/yourusername',
        ru: 'https://github.com/yourusername-ru',
      },
      iconSvg: `<svg
  stroke="currentColor"
  fill="currentColor"
  stroke-width="0"
  viewBox="0 0 1024 1024"
  class="icon"
  height="1em"
  width="1em"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"></path>
</svg>`,
    },
    {
      id: 'twitter',
      label: {
        zh: 'Twitter',
        en: 'Twitter',
        ru: 'Twitter',
      },
      url: {
        zh: 'https://x.com/yourusername',
        en: 'https://x.com/yourusername',
        ru: 'https://x.com/yourusername-ru',
      },
      icon: '🐦',
    },
    {
      id: 'linkedin',
      label: {
        zh: 'LinkedIn',
        en: 'LinkedIn',
        ru: 'LinkedIn',
      },
      url: {
        zh: 'https://linkedin.com/in/yourusername',
        en: 'https://linkedin.com/in/yourusername',
        ru: 'https://linkedin.com/in/yourusername-ru',
      },
      icon: '💼',
    },
    {
      id: 'telegram',
      label: {
        zh: 'Telegram',
        en: 'Telegram',
        ru: 'Telegram',
      },
      url: {
        zh: 'https://t.me/yourusername',
        en: 'https://t.me/yourusername',
        ru: 'https://t.me/yourusername-ru',
      },
      icon: '✈️',
    },
    {
      id: 'tiktok',
      label: {
        zh: 'TikTok',
        en: 'TikTok',
        ru: 'TikTok',
      },
      url: {
        zh: 'https://www.tiktok.com/@yourusername',
        en: 'https://www.tiktok.com/@yourusername',
        ru: 'https://www.tiktok.com/@yourusername-ru',
      },
      icon: '🎵',
    },
    {
      id: 'instagram',
      label: {
        zh: 'Instagram',
        en: 'Instagram',
        ru: 'Instagram',
      },
      url: {
        zh: 'https://www.instagram.com/yourusername/',
        en: 'https://www.instagram.com/yourusername/',
        ru: 'https://www.instagram.com/yourusername-ru/',
      },
      icon: '📸',
    },
    {
      id: 'youtube',
      label: {
        zh: 'YouTube',
        en: 'YouTube',
        ru: 'YouTube',
      },
      url: {
        zh: 'https://www.youtube.com/@yourusername',
        en: 'https://www.youtube.com/@yourusername',
        ru: 'https://www.youtube.com/@yourusername-ru',
      },
      icon: '▶️',
    },
    {
      id: 'twitch',
      label: {
        zh: 'Twitch',
        en: 'Twitch',
        ru: 'Twitch',
      },
      url: {
        zh: 'https://www.twitch.tv/yourusername',
        en: 'https://www.twitch.tv/yourusername',
        ru: 'https://www.twitch.tv/yourusername-ru',
      },
      icon: '🎮',
    },
  ],

  projects: [
    {
      id: 'morethan-log-astro',
      url: 'https://github.com/JustSereja/morethan-log-astro',
      label: {
        zh: 'Morethan-Log Astro 版',
        en: 'Morethan-Log for Astro',
        ru: 'Morethan-Log для Astro',
      },
      iconSvg: `<svg
  stroke="currentColor"
  fill="currentColor"
  stroke-width="0"
  viewBox="0 0 1024 1024"
  class="icon"
  height="1em"
  width="1em"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"></path>
</svg>`,
    },
  ],

  categories: {
    blog: {
      enabled: true,
      path: '/blog',
      icon: '💻',
      label: {
        zh: '博客',
        en: 'Blog',
        ru: 'Блог',
      },
      description: {
        zh: '个人想法、经验和见解',
        en: 'Personal thoughts, experiences, and insights from my journey',
        ru: 'Личные мысли, опыт и идеи из моего путешествия',
      },
    },
    technology: {
      enabled: true,
      path: '/technology',
      icon: '🚀',
      label: {
        zh: '技术',
        en: 'Technology',
        ru: 'Технологии',
      },
      description: {
        zh: '深入探讨 Web 开发、工具和最佳实践',
        en: 'Deep dives into web development, tools, and best practices',
        ru: 'Глубокое погружение в веб-разработку, инструменты и лучшие практики',
      },
    },
    projects: {
      enabled: true,
      path: '/projects',
      icon: '🛠️',
      label: {
        zh: '项目',
        en: 'Projects',
        ru: 'Проекты',
      },
      description: {
        zh: '我的作品和开源贡献展示',
        en: 'Showcase of my work and open-source contributions',
        ru: 'Витрина моих работ и вклада в открытый исходный код',
      },
    },
  },

  navigation: [
    {
      id: 'about',
      labelKey: 'ui.about',
      translationKey: 'about',
    },
  ],

  // Feature toggles
  features: {
    darkMode: true,
    search: true,
    rss: true,
    sitemap: true,
    imageLightbox: true,
    postNavigation: true,
    readingTime: true,
    viewCounter: false,
  },

  // SEO & Meta tags
  seo: {
    defaultImage: '/img/og-image.svg',
    twitterHandle: 'astrodotbuild',
    googleAnalytics: '',
  },

  // Language settings
  defaultLanguage: DEFAULT_LOCALE,
  languages: [...SUPPORTED_LOCALES],

  // Date format settings
  dateFormats: {
    zh: {
      locale: 'zh-CN',
      options: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
      compactOptions: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
    },
    en: {
      locale: 'en-US',
      options: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
      compactOptions: {
        year: '2-digit',
        month: 'short',
        day: 'numeric',
      },
    },
    ru: {
      locale: 'ru-RU',
      options: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
      compactOptions: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
    },
  },
};

export default siteConfig;
export type { SiteConfig } from './types';
export { SUPPORTED_LOCALES, SUPPORTED_LOCALES as SUPPORTED_LANGUAGES } from './locales';
