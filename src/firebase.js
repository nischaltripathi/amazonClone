import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
  apiKey: "AIzaSyDD8mYW6WwpifDHhldhXwD0ekyOx4uvlq8",
  authDomain: "clone-app-31d82.firebaseapp.com",
  databaseURL: "https://clone-app-31d82-default-rtdb.firebaseio.com",
  projectId: "clone-app-31d82",
  storageBucket: "clone-app-31d82.appspot.com",
  messagingSenderId: "880723328102",
  appId: "1:880723328102:web:2d5d78eda2b698f5e001a7",
  measurementId: "G-QFFB7KJF0F"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db,auth};