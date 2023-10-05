"use strict";

const CLIENT_ID = 'a011daf2f66d442ebade4fdc7c648334';
const CLIENT_SECRET = 'd912ee0263514a92ad5900fb86dee03d';
const AUTH_URL = 'https://accounts.spotify.com/api/token';

window.addEventListener('load', init);

function init() {
  api(document.querySelector('#section3'));
}

async function api(section3) {

  const getAccessToken = async () => {
    const response = await fetch(AUTH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
      },
      body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    return data.access_token;
  };

  const accessToken = await getAccessToken();

  const ALBUM_ID = [
    '2WT1pbYjLJciAR26yMebkH',
    '4XI8r5L0ewd7VMsF64YcIl',
    '1zcm3UvHNHpseYOUfd0pna',
    '7tB40pGzj6Tg0HePj2jWZt',
    '5NKTuBLCYhN0OwqFiGdXd1',
    '2rCS6Xwx32V27pvgFzLzlT'
  ];

  for (let i = 0; i < ALBUM_ID.length; i++) {
    const API_URL = `https://api.spotify.com/v1/albums/${ALBUM_ID[i]}`;

    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });

    const data = await response.json();
    console.log(data);

    const albumCoverUrl = data.images[0].url; // get the URL of the first album cover image

    const img = document.getElementById(`img${i + 1}`);
    img.src = albumCoverUrl;
  }
}  
