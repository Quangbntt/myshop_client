import firebase from "firebase/app";
import "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtlN9bEIko0EUT6RDMhzuRqHGdxh75woE",
  authDomain: "qstore-99eb3.firebaseapp.com",
  projectId: "qstore-99eb3",
  storageBucket: "qstore-99eb3.appspot.com",
  messagingSenderId: "397137069603",
  appId: "1:397137069603:web:41781694995601da3f1396",
  measurementId: "G-FSG38FGDTK",
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export { storage, firebase as default };
