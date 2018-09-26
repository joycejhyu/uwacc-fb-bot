const API_AI_TOKEN = '5cccfd5cee72403a9ecf6b29402fbcc9';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'EAAH5ZCEvCFJUBAHiPkUIx2Vs7Dx9E3mbE97MmAxXm426ZALjWC3ZBcXkwX5h6p8DnzbttKO9nbFZCsYZBuj3shirYFMWxApZA6BuZCkZCny1kdW5AMriGwZCIrzatNvh6UAMbwh3qyZAPudY1RsMaS9W1TjPR09cZA2GX3mQMweLYENLQZDZD';
const request = require('request');

const sendTextMessage = (senderId, text) => {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: FACEBOOK_ACCESS_TOKEN },
    method: 'POST',
    json: {
      recipient: { id: senderId },
      message: { text },
    }
  });
};

module.exports = (event) => {
  const senderId = event.sender.id;
  const message = event.message.text;
  const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'uwacc_bot'});

  apiaiSession.on('response', (response) => {
    const result = response.result.fulfillment.speech;
    sendTextMessage(senderId, result);
  });
  
  apiaiSession.on('error', error => console.log(error));
  apiaiSession.end();
};
