import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDFzQeCdT5sfor6d-EvsKXwPsdbTPUqtqM",
    authDomain: "cs554final-c23f0.firebaseapp.com",
    databaseURL: "https://cs554final-c23f0.firebaseio.com",
    projectId: "cs554final-c23f0",
    storageBucket: "cs554final-c23f0.appspot.com",
    messagingSenderId: "308814209054"
  };

  const fire = firebase.initializeApp(config);


  export default fire;