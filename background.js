// background.js

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === 'handshake') {
    chrome.storage.sync.get('options', (data) => {
      let options = data.options;

      if (!data.hasOwnProperty('options') || !options.hasOwnProperty('url') || !options.url.length)
        chrome.runtime.sendMessage({ action: 'missing_settings' });
    });
  }
});
