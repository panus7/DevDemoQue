function funcLineRegisterxx() {
  const element = document.querySelector('#post-request .article-id');
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      param: {
        ContextKey: 'ReU',
        LineUserID: '123',
        HN: '',
        IDCard: '111222333444',
        TelephoneNo: '123456789',
        Email: 'a@abc.123',
      },
    }),
  };

  targetUrl =
    'https://203.154.55.194:8445/ProductRESTService.svc/MobileUpdateLineRegister';

  fetch(targetUrl, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log('res' + JSON.stringify(data));
      element.innerHTML = JSON.stringify(data);
    })
    .catch((error) => {
      element.parentElement.innerHTML = `Error: ${error}`;
      console.error('There was an error!', error);
    });
}
