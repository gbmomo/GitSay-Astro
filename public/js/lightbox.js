// Lightbox functionality for image preview
// Uses window-scoped state to persist across View Transitions

(function initLightbox() {
  // Prevent double initialization on same page load
  if (window._lightboxSetupRunning) return;
  window._lightboxSetupRunning = true;

  // Reset flag after execution
  setTimeout(() => { window._lightboxSetupRunning = false; }, 100);

  // Check if this is being called as a re-init
  const isReInit = !!window._lightboxGlobalInit;

  // Global state - create once, reuse across navigations
  if (!window._lightboxState) {
    window._lightboxState = {
      lightbox: null,
      lightboxImage: null,
      currentScale: 1,
      translateX: 0,
      translateY: 0,
      isDragging: false,
      dragStartX: 0,
      dragStartY: 0,
      dragStartTranslateX: 0,
      dragStartTranslateY: 0,
      isAnimating: false,
      sourceImageRef: null
    };
  }

  const state = window._lightboxState;
  const minScale = 0.5;
  const maxScale = 5;
  const zoomStep = 0.15;

  function resetZoom() {
    state.currentScale = 1;
    state.translateX = 0;
    state.translateY = 0;
    if (state.lightboxImage) {
      state.lightboxImage.style.transform = '';
      state.lightboxImage.style.cursor = 'grab';
    }
  }

  function applyTransform() {
    if (state.lightboxImage) {
      state.lightboxImage.style.transform = `translate(${state.translateX}px, ${state.translateY}px) scale(${state.currentScale})`;
      state.lightboxImage.style.cursor = 'grab';
    }
  }

  function closeLightbox() {
    if (state.isAnimating || !state.lightbox) return;

    if (state.sourceImageRef && state.lightboxImage) {
      state.isAnimating = true;

      const sourceRect = state.sourceImageRef.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const sourceCenterX = sourceRect.left + sourceRect.width / 2;
      const sourceCenterY = sourceRect.top + sourceRect.height / 2;
      const viewportCenterX = viewportWidth / 2;
      const viewportCenterY = viewportHeight / 2;

      const targetOffsetX = sourceCenterX - viewportCenterX;
      const targetOffsetY = sourceCenterY - viewportCenterY;

      const naturalWidth = state.lightboxImage.naturalWidth || sourceRect.width;
      const naturalHeight = state.lightboxImage.naturalHeight || sourceRect.height;
      const maxW = viewportWidth * 0.9;
      const maxH = viewportHeight * 0.9;
      const widthRatio = maxW / naturalWidth;
      const heightRatio = maxH / naturalHeight;
      const fitRatio = Math.min(widthRatio, heightRatio, 1);
      const finalWidth = naturalWidth * fitRatio;
      const targetScale = sourceRect.width / finalWidth;

      state.lightbox.style.transition = 'opacity 0.15s ease-out';
      state.lightbox.style.opacity = '0';

      state.lightboxImage.style.transition = 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      state.lightboxImage.style.transform = `translate(${targetOffsetX}px, ${targetOffsetY}px) scale(${targetScale})`;

      setTimeout(() => {
        if (state.lightbox) {
          state.lightbox.style.display = 'none';
          state.lightbox.style.opacity = '';
          state.lightbox.style.transition = '';
        }
        if (state.lightboxImage) {
          state.lightboxImage.style.transition = '';
          state.lightboxImage.style.transform = '';
          state.lightboxImage.removeAttribute('src');
        }
        resetZoom();
        state.isAnimating = false;
        state.sourceImageRef = null;
      }, 250);
    } else {
      if (state.lightbox) {
        state.lightbox.style.display = 'none';
        state.lightbox.style.opacity = '';
      }
      if (state.lightboxImage) {
        state.lightboxImage.style.transition = '';
        state.lightboxImage.style.transform = '';
        state.lightboxImage.removeAttribute('src');
      }
      resetZoom();
      state.isAnimating = false;
      state.sourceImageRef = null;
    }
  }

  function openWithAnimation(sourceImg) {
    if (!state.lightboxImage || !state.lightbox) {
      // Try to get fresh references
      state.lightbox = document.getElementById('lightbox');
      if (state.lightbox) {
        state.lightboxImage = state.lightbox.querySelector('.lightbox-content');
      }
      if (!state.lightboxImage || !state.lightbox) return;
    }

    state.isAnimating = true;
    state.sourceImageRef = sourceImg;

    state.lightboxImage.src = sourceImg.currentSrc || sourceImg.src;

    const startAnimation = () => {
      // Get source position RIGHT BEFORE animation starts for accuracy
      // This ensures any pending layout changes are complete
      const sourceRect = sourceImg.getBoundingClientRect();

      // Validate the rect - if the image is not visible or has invalid dimensions, skip animation
      if (sourceRect.width === 0 || sourceRect.height === 0) {
        // Fallback: show lightbox without fly animation
        state.lightbox.style.opacity = '1';
        state.lightbox.style.display = 'flex';
        state.lightboxImage.style.transform = '';
        state.isAnimating = false;
        return;
      }

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const sourceCenterX = sourceRect.left + sourceRect.width / 2;
      const sourceCenterY = sourceRect.top + sourceRect.height / 2;
      const viewportCenterX = viewportWidth / 2;
      const viewportCenterY = viewportHeight / 2;

      const initialOffsetX = sourceCenterX - viewportCenterX;
      const initialOffsetY = sourceCenterY - viewportCenterY;

      const naturalWidth = state.lightboxImage.naturalWidth || sourceRect.width;
      const naturalHeight = state.lightboxImage.naturalHeight || sourceRect.height;

      const maxW = viewportWidth * 0.9;
      const maxH = viewportHeight * 0.9;
      const widthRatio = maxW / naturalWidth;
      const heightRatio = maxH / naturalHeight;
      const fitRatio = Math.min(widthRatio, heightRatio, 1);

      const finalWidth = naturalWidth * fitRatio;
      const initialScale = Math.min(sourceRect.width / finalWidth, 1) || 0.1;

      state.lightbox.style.opacity = '0';
      state.lightbox.style.display = 'flex';
      state.lightboxImage.style.transition = 'none';
      state.lightboxImage.style.transform = `translate(${initialOffsetX}px, ${initialOffsetY}px) scale(${initialScale})`;

      // Force layout recalculation
      void state.lightboxImage.offsetHeight;

      requestAnimationFrame(() => {
        state.lightbox.style.transition = 'opacity 0.15s ease-out';
        state.lightbox.style.opacity = '1';

        state.lightboxImage.style.transition = 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        state.lightboxImage.style.transform = 'translate(0, 0) scale(1)';

        setTimeout(() => {
          if (state.lightboxImage) state.lightboxImage.style.transition = '';
          if (state.lightbox) state.lightbox.style.transition = '';
          state.isAnimating = false;
          resetZoom();
        }, 250);
      });
    };

    if (state.lightboxImage.complete && state.lightboxImage.naturalWidth > 0) {
      startAnimation();
    } else {
      state.lightboxImage.onload = startAnimation;
    }
  }

  // Store functions globally
  window._lightboxFuncs = {
    openWithAnimation,
    closeLightbox,
    resetZoom,
    applyTransform,
    minScale,
    maxScale,
    zoomStep
  };

  // Initialize a single image for lightbox
  function initImage(img) {
    if (img.dataset.lightboxInit === 'true') return;
    if (img.closest('.lightbox')) return;
    
    // Skip images inside links (e.g., post thumbnails on homepage)
    // These should navigate to the linked page, not open lightbox
    if (img.closest('a')) return;
    
    // Skip images in sidebar/profile/navigation areas
    if (img.closest('.sidebar, .profile, .site-header, .nav, .author__photo')) return;

    // Check size - use either rendered or natural dimensions
    const width = img.width || img.naturalWidth || 0;
    const height = img.height || img.naturalHeight || 0;

    // For unloaded images, wait for load then init
    if (width === 0 && height === 0) {
      if (!img.dataset.lightboxPending) {
        img.dataset.lightboxPending = 'true';
        img.addEventListener('load', () => {
          delete img.dataset.lightboxPending;
          initImage(img);
        }, { once: true });
      }
      return;
    }

    // Skip very small images (icons)
    if (width < 50 && height < 50) return;

    img.dataset.lightboxInit = 'true';
    img.style.cursor = 'zoom-in';

    const clickHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      window._lightboxFuncs.openWithAnimation(img);
    };

    img.addEventListener('click', clickHandler);
  }

  // Setup global event listeners only once
  if (!isReInit) {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && state.lightbox && state.lightbox.style.display === 'flex') {
        closeLightbox();
      }
    });

    document.addEventListener('mousemove', (event) => {
      if (state.isDragging && state.lightbox && state.lightbox.style.display === 'flex' && !state.isAnimating) {
        const dx = event.clientX - state.dragStartX;
        const dy = event.clientY - state.dragStartY;

        let newTranslateX = state.dragStartTranslateX + dx;
        let newTranslateY = state.dragStartTranslateY + dy;

        // Calculate boundary limits based on image size and scale
        // Ensure at least 20% of the image remains visible
        if (state.lightboxImage) {
          const imgRect = state.lightboxImage.getBoundingClientRect();
          const scaledWidth = imgRect.width;
          const scaledHeight = imgRect.height;
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;

          // How much of the image should remain visible (20%)
          const minVisibleX = scaledWidth * 0.2;
          const minVisibleY = scaledHeight * 0.2;

          // Maximum allowed translation
          const maxTranslateX = (viewportWidth / 2) + (scaledWidth / 2) - minVisibleX;
          const maxTranslateY = (viewportHeight / 2) + (scaledHeight / 2) - minVisibleY;

          // Clamp the translation values
          newTranslateX = Math.max(-maxTranslateX, Math.min(maxTranslateX, newTranslateX));
          newTranslateY = Math.max(-maxTranslateY, Math.min(maxTranslateY, newTranslateY));
        }

        state.translateX = newTranslateX;
        state.translateY = newTranslateY;
        applyTransform();
        if (state.lightboxImage) state.lightboxImage.style.cursor = 'grabbing';
      }
    });

    document.addEventListener('mouseup', () => {
      if (state.isDragging) {
        state.isDragging = false;
        if (state.lightboxImage) {
          state.lightboxImage.style.cursor = 'grab';
        }
      }
    });

    window._lightboxGlobalInit = true;
  }

  function setupLightboxElement() {
    const state = window._lightboxState;
    const funcs = window._lightboxFuncs;

    // Get fresh references to DOM elements
    state.lightbox = document.getElementById('lightbox');
    if (!state.lightbox) return false;

    // Move lightbox to body
    if (state.lightbox.parentElement !== document.body) {
      document.body.appendChild(state.lightbox);
    }

    state.lightboxImage = state.lightbox.querySelector('.lightbox-content');

    // Attach listeners if not already
    if (!state.lightbox.dataset.listenersAttached) {
      state.lightbox.dataset.listenersAttached = 'true';

      state.lightbox.addEventListener('click', (event) => {
        if (state.isAnimating) return;
        const target = event.target;
        if (target === state.lightbox || (target instanceof HTMLElement && target.classList.contains('close'))) {
          funcs.closeLightbox();
        }
      });

      state.lightbox.addEventListener('wheel', (event) => {
        if (state.lightbox.style.display !== 'flex' || state.isAnimating) return;

        const target = event.target;
        const isOnImage = target === state.lightboxImage || state.lightboxImage?.contains(target);

        if (isOnImage) {
          event.preventDefault();
          const delta = event.deltaY > 0 ? -funcs.zoomStep : funcs.zoomStep;
          const newScale = Math.max(funcs.minScale, Math.min(funcs.maxScale, state.currentScale + delta));

          if (newScale !== state.currentScale) {
            state.currentScale = newScale;
            funcs.applyTransform();
          }
        }
      }, { passive: false });
    }

    if (state.lightboxImage && !state.lightboxImage.dataset.listenersAttached) {
      state.lightboxImage.dataset.listenersAttached = 'true';

      state.lightboxImage.addEventListener('mousedown', (event) => {
        if (state.isAnimating) return;
        state.isDragging = true;
        state.dragStartX = event.clientX;
        state.dragStartY = event.clientY;
        state.dragStartTranslateX = state.translateX;
        state.dragStartTranslateY = state.translateY;
        state.lightboxImage.style.cursor = 'grabbing';
        event.preventDefault();
      });

      state.lightboxImage.addEventListener('dblclick', (event) => {
        if (state.isAnimating) return;
        event.stopPropagation();
        if (state.currentScale !== 1) {
          funcs.resetZoom();
        } else {
          state.currentScale = 2;
          funcs.applyTransform();
        }
      });
    }

    return true;
  }

  function setupPage() {
    setupLightboxElement();

    // Get site URL for external link handling
    const lightbox = document.getElementById('lightbox');
    const siteUrl = lightbox?.getAttribute('data-site-url') || window.location.origin;

    // Open external links in new tab
    document.querySelectorAll('a').forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (!href.startsWith(siteUrl) && !href.startsWith('/') && !href.startsWith('#')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });

    // Initialize all current images
    document.querySelectorAll('img').forEach(initImage);
  }

  // Run initial setup
  setupPage();

  // Retry after short delays to catch late-loading content
  setTimeout(setupPage, 50);
  setTimeout(setupPage, 200);
  setTimeout(setupPage, 500);

  // Listen for View Transitions events
  if (!isReInit) {
    document.addEventListener('astro:page-load', () => {
      // Small delay to let DOM settle
      setTimeout(setupPage, 10);
      setTimeout(setupPage, 100);
      setTimeout(setupPage, 300);
    });
  }
})();
