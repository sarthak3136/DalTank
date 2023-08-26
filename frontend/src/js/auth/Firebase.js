import  firebase  from 'firebase/compat/app';
import {getFirestore} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider  } from 'firebase/auth';

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
export const db = getFirestore(app);
export const auth = getAuth(app);
export  {app, provider};
export { firebase };
export default app;
