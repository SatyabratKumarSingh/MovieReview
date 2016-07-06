const firebase = require('firebase');
var FireConfig = require("../../youtube/config").fbase;
// Initialize Firebase
var config = {
    apiKey: FireConfig.apiKey,
    authDomain: FireConfig.authDomain,
    databaseURL: FireConfig.kDBBaseRef,
    storageBucket: FireConfig.storageBucket,
  };
  firebase.initializeApp(config);

// Create a reference with .ref() instead of new Firebase(url)
const rootRef = firebase.database().ref();
const itemsRef = rootRef.child(FireConfig.kDBVideoRef);
