import { initCodeEnhance } from './modules/code-enhance';
import { initLanguageSwitcher } from './modules/language';
import { initMobileMenu } from './modules/mobile-menu';
import { initSearch } from './modules/search';
import { highlightActiveTags } from './modules/tags';
import { initThemeSwitchers } from './modules/theme';

let bannerLogged = false;
let initialized = false;

const logCuriousBanner = () => {
  if (bannerLogged) {
    return;
  }
  bannerLogged = true;

  console.log(
    `%c wow, you're curious! 🧐
%c
%c         ▄              ▄
%c        ▌▒█           ▄▀▒▌
%c        ▌▒▒█        ▄▀▒▒▒▐
%c       ▐▄▀▒▒▀▀▀▀▄▄▄▀▒▒▒▒▒▐
%c     ▄▄▀▒░▒▒▒▒▒▒▒▒▒█▒▒▄█▒▐
%c   ▄▀▒▒▒░░░▒▒▒░░░▒▒▒▀██▀▒▌
%c  ▐▒▒▒▄▄▒▒▒▒░░░▒▒▒▒▒▒▒▀▄▒▒▌
%c  ▌░░▌█▀▒▒▒▒▒▄▀█▄▒▒▒▒▒▒▒█▒▐
%c ▐░░░▒▒▒▒▒▒▒▒▌██▀▒▒░░░▒▒▒▀▄▌
%c ▌░▒▄██▄▒▒▒▒▒▒▒▒▒░░░░░░▒▒▒▒▌
%c▌▒▀▐▄█▄█▌▄░▀▒▒░░░░░░░░░░▒▒▒▐
%c▐▒▒▐▀▐▀▒░▄▄▒▄▒▒▒▒▒▒░▒░▒░▒▒▒▒▌
%c▐▒▒▒▀▀▄▄▒▒▒▄▒▒▒▒▒▒▒▒░▒░▒░▒▒▐
%c ▌▒▒▒▒▒▒▀▀▀▒▒▒▒▒▒░▒░▒░▒░▒▒▒▌
%c ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒░▒▒▄▒▒▐
%c  ▀▄▒▒▒▒▒▒▒▒▒▒▒░▒░▒░▒▄▒▒▒▒▌
%c    ▀▄▒▒▒▒▒▒▒▒▒▒▄▄▄▀▒▒▒▒▄▀
%c      ▀▄▄▄▄▄▄▀▀▀▒▒▒▒▒▄▄▀
%c         ▒▒▒▒▒▒▒▒▒▒▀▀`,
    'color: #f07d63',
    ...Array(19).fill('color: #ccae62'),
  );
};

const runModules = () => {
  if (initialized) {
    return;
  }
  initialized = true;

  initThemeSwitchers();
  initLanguageSwitcher();
  initSearch();
  highlightActiveTags();
  initMobileMenu();
  initCodeEnhance();
};

const initApp = () => {
  logCuriousBanner();
  runModules();
};

const runWhenReady = () => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp, { once: true });
  } else {
    initApp();
  }
};

export const initClientApp = () => {
  if (typeof window === 'undefined') {
    return;
  }

  runWhenReady();

  // View Transitions: 页面切换后重新初始化
  document.addEventListener('astro:after-swap', () => {
    initialized = false; // 重置标志，允许重新初始化
    initApp();
  });
};

if (typeof window !== 'undefined') {
  initClientApp();
}
