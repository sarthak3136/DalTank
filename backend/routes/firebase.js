const  firebase = require ('firebase/compat/app');
const {getFirestore} = require('firebase/firestore');
const { getAuth, GoogleAuthProvider, updateProfile  } = require('firebase/auth');

const firebaseConfig = {
    apiKey: "AIzaSyDeVlI33rrihfuhyJV9DLYMyiUYHRlHlSc",
    authDomain: "webg12-d130a.firebaseapp.com",
    projectId: "webg12-d130a",
    storageBucket: "webg12-d130a.appspot.com",
    messagingSenderId: "586593919180",
    appId: "1:586593919180:web:8ff9add4ae7eceef982269",
    measurementId: "G-8QJT4QGR23"
}

const app = firebase.initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const auth = getAuth(app);

module.exports = {app, provider, firebase, db, auth, updateProfile};