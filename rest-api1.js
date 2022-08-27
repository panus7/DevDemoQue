// const element = document.querySelector('#post-request .article-id');
// const requestOptions = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },

//   body: JSON.stringify({
//     param: {
//       ContextKey: 'ReU',
//       user: 'DOCTOR',
//       password: '',
//     },
//   }),
// };

// targetUrl = 'https://203.154.55.194:8445/ProductRESTService.svc/IsValidUser';

// fetch(targetUrl, requestOptions)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log('res' + JSON.stringify(data));
//     element.innerHTML = JSON.stringify(data);
//   })
//   .catch((error) => {
//     element.parentElement.innerHTML = `Error: ${error}`;
//     console.error('There was an error!', error);
//   });
