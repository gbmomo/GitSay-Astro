/**
 * 智能粘性侧边栏
 * 当侧边栏内容比视口短时，粘在顶部
 * 当侧边栏内容比视口高时，先滚动显示全部内容，然后粘在底部
 */
(function () {
    'use strict';

    const HEADER_HEIGHT = 63;
    const BOTTOM_MARGIN = 10;

    function initStickySidebars() {
        const leftSidebar = document.querySelector('.aside--left');
        const rightSidebar = document.querySelector('.sidebar');

        if (!leftSidebar && !rightSidebar) {
            return;
        }

        const sidebars = [leftSidebar, rightSidebar].filter(Boolean);

        function updateSidebarSticky() {
            const viewportHeight = window.innerHeight;
            const availableHeight = viewportHeight - HEADER_HEIGHT - BOTTOM_MARGIN;

            sidebars.forEach(sidebar => {
                const sidebarHeight = sidebar.scrollHeight;

                if (sidebarHeight <= availableHeight) {
                    // 内容比视口短，粘在顶部
                    sidebar.classList.remove('sticky-bottom');
                } else {
                    // 内容比视口高，粘在底部
                    sidebar.classList.add('sticky-bottom');
                }
            });
        }

        // 初始检查
        updateSidebarSticky();

        // 窗口大小变化时重新检查
        window.addEventListener('resize', updateSidebarSticky);

        // 页面内容变化时重新检查（比如动态加载内容）
        if (typeof MutationObserver !== 'undefined') {
            const observer = new MutationObserver(updateSidebarSticky);
            sidebars.forEach(sidebar => {
                observer.observe(sidebar, { childList: true, subtree: true });
            });
        }
    }

    // DOM 加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStickySidebars);
    } else {
        initStickySidebars();
    }
})();
