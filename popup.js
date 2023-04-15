(() => {
  'use strict'

  // Initialize the options warning modal
  let warning = new bootstrap.Modal(document.querySelector('#options-warning'), {
    backdrop: 'static',
    keyboard: false
  });

  chrome.runtime.sendMessage({action: 'handshake'});

  chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.action === 'missing_settings')
      warning.show();

    console.log(message.action);
  });

  // Initialize the user's settings
  const settings = {};

  chrome.storage.sync.get('options', (data) => {
    if (data.hasOwnProperty('options')) {
      Object.assign(settings, data.options);

      warning.hide();
    }
  });

  document.getElementById('user').focus();

  // Add an event listener for form's submit
  let form = document.querySelector('form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      
      return;
    }

    let data = new FormData(form);

    chrome.windows.create({
      focused: true,
      incognito: true,
      state: "fullscreen",
      url: settings.url + data.get('user')
    });
  });

  // Add an event listener for option's link click
  document.querySelectorAll('#options-link').forEach((element) => {
    element.addEventListener('click', async () => {
      chrome.runtime.openOptionsPage();
    });
  });
})();
