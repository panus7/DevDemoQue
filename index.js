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
const btnSend = document.getElementById('btnSend');
const btnClose = document.getElementById('btnClose');
const btnShare = document.getElementById('btnShare');
const btnLogIn = document.getElementById('btnLogIn');
const btnLogOut = document.getElementById('btnLogOut');
const btnScanCode = document.getElementById('btnScanCode');
const btnOpenWindow = document.getElementById('btnOpenWindow');
const btnLineRegister = document.getElementById('LineRegister');

// Profile elements
const email = document.getElementById('email');
const userId = document.getElementById('userId');
const pictureUrl = document.getElementById('pictureUrl');
const displayName = document.getElementById('displayName');
const statusMessage = document.getElementById('statusMessage');
const lineUserId = '';
// QR element
const code = document.getElementById('code');
const friendShip = document.getElementById('friendship');

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

// 9. Add event listener to login button
btnLogIn.onclick = () => {
  liff.login();
};

// 10. Add event listener to logout button then reload the page
btnLogOut.onclick = () => {
  liff.logout();
  window.location.reload();
};

// 14. Create sendMsg()
// 14.1 Ensure LIFF was opened from LINE app
// 29. Change alert to close
async function sendMsg() {
  if (
    liff.getContext().type !== 'none' &&
    liff.getContext().type !== 'external'
  ) {
    await liff.sendMessages([
      {
        type: 'text',
        text: liff.getAccessToken(),
      },
    ]);
    liff.closeWindow();
  }
}

// 15. Add event listener to send button
btnSend.onclick = () => {
  sendMsg();
};

// 18. Create shareMsg()
async function shareMsg() {
  await liff.shareTargetPicker([
    {
      type: 'text',
      text: liff.getIDToken(),
      // type: 'image',
      // originalContentUrl: 'https://linerookie.com/images/ic_liff.png',
      // previewImageUrl: 'https://linerookie.com/images/ic_liff.png',
    },
  ]);
  liff.closeWindow();
}

// 19. Add event listener to share button
btnShare.onclick = () => {
  shareMsg();
};

// 23. Create scanCode()
async function scanCode() {
  const result = await liff.scanCode();
  code.innerHTML = '<b>QR</b> ' + result.value;
}

// 24. Add event listener to QR button
btnScanCode.onclick = () => {
  scanCode();
};

// 27. Add event listener to OpenWindow button
btnOpenWindow.onclick = () => {
  liff.openWindow({
    url: 'https://line.me',
    external: false,
  });
};

btnLineRegister.onclick = () => {
  funcLineRegister();
};

// 31. Create getFriendship()
// 31.1 Add condition to check friend status
async function getFriendship() {
  let msg = 'Hooray! you and our chatbot are friend';
  const friend = await liff.getFriendship();
  if (!friend.friendFlag) {
    msg =
      "<a href='https://line.me/R/ti/p/@754tuyrl'>Follow our chatbot here!</a>";
  }
  friendShip.innerHTML = msg;
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
