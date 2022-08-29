// Import stylesheets
import './style.css';
import './api-line.js';

//NAT
// Import stylesheets
import './style.css';

import liff from '@line/liff';

// Body element
const body = document.getElementById('body');

// Button elements
// const btnSend = document.getElementById('btnSend');

// Profile elements
// const email = document.getElementById('email');
const lineUserId = '';

async function main() {
  liff.ready.then(() => {
    if (liff.getOS() === 'android') body.style.backgroundColor = '#d1f5d3';
    if (liff.getOS() === 'ios') body.style.backgroundColor = '#ffffff';

    if (!liff.isInClient()) {
      if (liff.isLoggedIn()) {
        btnLogIn.style.display = 'none';
        btnLogOut.style.display = 'block';
        btnShare.style.display = 'block';
        getUserProfile();
        getFriendship();
      } else {
        btnLogIn.style.display = 'block';
        btnLogOut.style.display = 'none';
      }
    } else {
      getUserProfile();
      btnSend.style.display = 'block';
      btnShare.style.display = 'block';
      if (liff.getOS() === 'android') {
        btnScanCode.style.display = 'block';
      }
      getFriendship();
    }

    // 28. Show OpenWindow button
    btnOpenWindow.style.display = 'block';
    btnLineRegister.style.display = 'block';
  });
  // 1. Initialize LIFF app)
  await liff.init({ liffId: '1657336640-zo5rb3B1' });
}
main();

// 4. Create getUserProfile()
// 6. Get email *
async function getUserProfile() {
  const profile = await liff.getProfile();
  lineUserId = profile.userId;
  userId.innerHTML = '<b>UserId</b> ' + profile.userId;
  displayName.innerHTML = '<b>DisplayName</b> ' + profile.displayName;
  statusMessage.innerHTML = '<b>StatusMessage</b> ' + profile.statusMessage;
  statusMessage.innerHTML = '<b>IDToken</b> ' + liff.getIDToken();
  pictureUrl.src = profile.pictureUrl;
  email.innerHTML = '<b>E-mail</b> ' + liff.getDecodedIDToken().email;
}

function funcLineRegister() {
  //const element = document.querySelector('#post-request .article-id');
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      param: {
        ContextKey: 'ReU',
        LineUserID: lineUserId,
        IDCard: document.getElementById('txt_idcard').value,
        TelephoneNo: document.getElementById('txt_phone').value,
        Email: document.getElementById('txt_email').value,
      },
    }),
  };

  //element.innerHTML = JSON.stringify(requestOptions);
  //console.log('op' + JSON.stringify(requestOptions));

  const targetUrl =
    'https://203.154.55.194:8445/ProductRESTService.svc/MobileUpdateLineRegister';

  fetch(targetUrl, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log('res' + JSON.stringify(data));
      //element.innerHTML = JSON.stringify(data);
    })
    .catch((error) => {
      element.parentElement.innerHTML = `Error: ${error}`;
      console.error('There was an error!', error);
    });
}
