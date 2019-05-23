const firebase = require("firebase/app");
require("firebase/database");

const apis = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};

firebase.initializeApp(apis);

const write = key => {
  firebase
    .database()
    .ref("/")
    .transaction(function(post) {
      if (post) {
        if (!post[key]) {
          post[key] = 1;
        } else {
          post[key]++;
        }
      } else {
        post = {
          [key]: 1
        };
      }
      return post;
    });
};

module.exports = {
  write
};
