/**
 * Popup script for Live2D Widget Chrome Extension
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Load current settings
  const config = await chrome.storage.sync.get({
    enabled: true,
    logLevel: 'warn',
    drag: false,
    cdnPath: 'https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/'
  });

  // Populate form
  document.getElementById('enabled').checked = config.enabled;
  document.getElementById('logLevel').value = config.logLevel;
  document.getElementById('drag').checked = config.drag;
  document.getElementById('cdnPath').value = config.cdnPath;

  // Save button handler
  document.getElementById('save').addEventListener('click', async () => {
    const newConfig = {
      enabled: document.getElementById('enabled').checked,
      logLevel: document.getElementById('logLevel').value,
      drag: document.getElementById('drag').checked,
      cdnPath: document.getElementById('cdnPath').value
    };

    try {
      await chrome.storage.sync.set(newConfig);
      showStatus('Settings saved! Please refresh the page.', 'success');
      
      // Notify content script to reload
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, { action: 'reload' });
      }
    } catch (error) {
      showStatus('Error saving settings: ' + error.message, 'error');
    }
  });

  function showStatus(message, type) {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = message;
    statusDiv.className = 'status ' + type;
    setTimeout(() => {
      statusDiv.textContent = '';
      statusDiv.className = 'status';
    }, 3000);
  }
});

