const { default: axios } = require("axios");

// getting Games Top 3 list
async function gameRequest(accessToken) {
  const gameOptions = {
    url: 'https://api.twitch.tv/helix/games/top',
    headers: {
      'Client-ID': process.env.CLIENT_ID,
      'Authorization': 'Bearer ' + accessToken
    }
  };

  try {
    let res = await axios.get(gameOptions.url, {
      headers: {
        'Client-ID': process.env.CLIENT_ID,
        'Authorization': 'Bearer ' + accessToken
      },
      params: {
        first: 3
      }
    });
    return res.data;
  } catch (error) {
    console.log(`Error ${error.response}`);
  }
}


// getting auth token
async function getToken() {
  const options = {
    url: process.env.TWITCH_URL,
    json: true,
    body: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'client_credentials'
    }
  };

  try {
    let res = await axios.post(options.url, options.body);
    return res.data.access_token;
  } catch (error) {
    console.log(`Error ${error.response}`);
  }
  
}


module.exports = {
  getToken,
  gameRequest
};