/**
 * Chrome Extension Content Script for Live2D Widget
 * This script injects the Live2D widget into web pages
 */

(function() {
  'use strict';

  // Get extension ID and base path
  const extensionId = chrome.runtime.id;
  const basePath = chrome.runtime.getURL('dist/');

  // Avoid injecting multiple times
  if (window.live2dWidgetInjected) {
    return;
  }
  window.live2dWidgetInjected = true;

  // Function to load external resources
  function loadExternalResource(url, type) {
    return new Promise((resolve, reject) => {
      let tag;

      if (type === 'css') {
        tag = document.createElement('link');
        tag.rel = 'stylesheet';
        tag.href = url;
      } else if (type === 'js') {
        tag = document.createElement('script');
        tag.type = 'module';
        tag.src = url;
      }
      
      if (tag) {
        tag.onload = () => resolve(url);
        tag.onerror = () => reject(url);
        document.head.appendChild(tag);
      }
    });
  }

  // Override Image constructor to handle CORS
  const OriginalImage = window.Image;
  window.Image = function(...args) {
    const img = new OriginalImage(...args);
    img.crossOrigin = "anonymous";
    return img;
  };
  window.Image.prototype = OriginalImage.prototype;

  // Initialize widget
  async function initLive2DWidget() {
    try {
      // Load CSS and JS
      await Promise.all([
        loadExternalResource(basePath + 'waifu.css', 'css'),
        loadExternalResource(basePath + 'waifu-tips.js', 'js')
      ]);

      // Wait for initWidget to be available
      let retries = 0;
      while (typeof window.initWidget === 'undefined' && retries < 50) {
        await new Promise(resolve => setTimeout(resolve, 100));
        retries++;
      }

      if (typeof window.initWidget === 'undefined') {
        console.error('Live2D Widget: initWidget function not found');
        return;
      }

      // Get configuration from storage or use defaults
      const config = await new Promise((resolve) => {
        chrome.storage.sync.get({
          waifuPath: basePath + 'waifu-tips.json',
          cdnPath: 'https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/',
          cubism2Path: basePath + 'live2d.min.js',
          cubism5Path: 'https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js',
          tools: ['hitokoto', 'asteroids', 'switch-model', 'switch-texture', 'photo', 'info', 'quit'],
          logLevel: 'warn',
          drag: false,
          enabled: true
        }, resolve);
      });

      // Only initialize if enabled
      if (!config.enabled) {
        return;
      }

      // Initialize widget with extension-specific paths
      window.initWidget({
        waifuPath: config.waifuPath.startsWith('chrome-extension://') 
          ? config.waifuPath 
          : basePath + 'waifu-tips.json',
        cdnPath: config.cdnPath,
        cubism2Path: config.cubism2Path.startsWith('chrome-extension://')
          ? config.cubism2Path
          : basePath + 'live2d.min.js',
        cubism5Path: config.cubism5Path,
        tools: config.tools,
        logLevel: config.logLevel,
        drag: config.drag,
      });

      console.log(`%cLive2D%cWidget%c\n`, 
        'padding: 8px; background: #cd3e45; font-weight: bold; font-size: large; color: white;', 
        'padding: 8px; background: #ff5450; font-size: large; color: #eee;', 
        '');
    } catch (error) {
      console.error('Live2D Widget initialization error:', error);
    }
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLive2DWidget);
  } else {
    initLive2DWidget();
  }

  // Handle page navigation (for SPAs)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      // Re-initialize if needed (but avoid duplicate injection)
      if (!document.getElementById('waifu') && !document.getElementById('waifu-toggle')) {
        setTimeout(initLive2DWidget, 1000);
      }
    }
  }).observe(document, { subtree: true, childList: true });

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'reload') {
      // Remove existing widget
      const waifu = document.getElementById('waifu');
      const toggle = document.getElementById('waifu-toggle');
      if (waifu) waifu.remove();
      if (toggle) toggle.remove();
      
      // Reset injection flag
      window.live2dWidgetInjected = false;
      delete window.initWidget;
      
      // Re-initialize
      setTimeout(initLive2DWidget, 500);
      sendResponse({ success: true });
    }
    return true;
  });
})();

