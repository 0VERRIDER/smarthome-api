const firebase = require('firebase');
const firebaseConfig = {
    apiKey: "AIzaSyBnDTjN7BGEd6guULoUGpTFa6kqvb27zAA",
    authDomain: "smarthome-karunya.firebaseapp.com",
    projectId: "smarthome-karunya",
    storageBucket: "smarthome-karunya.appspot.com",
    messagingSenderId: "531552651771",
    appId: "1:531552651771:web:17e1ba0db47e97ecca635e",
    measurementId: "G-L7NBSPSKV5"
  };
  const firebaseapp = firebase.initializeApp(firebaseConfig);

  const db = firebaseapp.database();

export default db;