(() => {
	const settings = {};

	chrome.storage.sync.get('options', (data) => {
		Object.assign(settings, data);

    if (_.has(settings, 'options.url') && settings.options.url.length)
      document.getElementById('url').value = settings.options.url;
	});

  let generalSettings = document.querySelector('#general-settings');

  generalSettings.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!generalSettings.checkValidity()) {
      generalSettings.classList.add('was-validated');
      
      return;
    }

    let data = new FormData(generalSettings), 
      options = {options: {url: data.get('url')}};

    chrome.storage.sync.set(options);
  });
})();