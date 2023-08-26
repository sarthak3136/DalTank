// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvjzyxxd2RFsgPF5NQ8POX8hR7cNG3Zd8",
  authDomain: "serverless-5410-387216.firebaseapp.com",
  projectId: "serverless-5410-387216",
  storageBucket: "serverless-5410-387216.appspot.com",
  messagingSenderId: "662856776030",
  appId: "1:662856776030:web:a68b007e44576cea9837cf",
};

// Initialize Firebase
const app1 = initializeApp(firebaseConfig, "app1");
const storage = getStorage(app1);
export const db = getFirestore(app1);
export { storage };
