/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// TODO 3.8 - push a message using the web push library
const webPush = require('web-push');

const pushSubscription = {"endpoint":"https://fcm.googleapis.com/fcm/send/fWnaUGKFJOk:APA91bHYzuFXw23hJs_Q-p49VKXXuptVeqxlgeNwznHhRBDOIFeQuu7mUUF-byOwSBQwOso2tyFA4-e7XrMhE94lFkxcrWQYdHd-WOSjZgtBlJhup24pbFoXDBUa5DF_sihaTeVXR-nX","expirationTime":null,"keys":{"p256dh":"BIV4JO18OeIT86RLnRv74sSJVF3k4RKOHTdj8dZtIXNAC0JlIh9RQfDdvpBfQworzG3cVdWznSZMSSDM7zIiU0U","auth":"bqTXHdaeCMWpz9NJw6vX3w"}};

// TODO 4.3a - include VAPID keys
const vapidPublicKey = 'BHudnudNKsXQSX0aqTmbguI9oRIqUP1DPSNC2sLUO0P2JWHvBKdVZyNASYcYyJ9hOaFjRzJiE8Y3SNQQQvrQYFc';
const vapidPrivateKey = 'n4zMp1Gi21r8BpSikSPmF4nsrtOlOZC2j7RFE1saAmQ';

const payload = 'Here is a payload!';

const options = {
  // gcmAPIKey: 'AAAAUlraQ38:APA91bE4KoLqmrkqnp4kLKSvAIXSUD5FeGbSFqG1t-4Uq1ZvtMCqezrQ9TLRfLXRW7_AcBn4Lt3BQmB-LmwKWUEtX1qCwY53cyIb0GpNUxuxPPFeKLCl9oYnTWXgOrcpAWufXYotEW8Y',
  TTL: 60,

  // TODO 4.3b - add VAPID details
  vapidDetails: {
    subject: 'mailto: lucasartori94@gmail.com',
    publicKey: vapidPublicKey,
    privateKey: vapidPrivateKey
  }
};

webPush.sendNotification(
  pushSubscription,
  payload,
  options
);
