import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDmxPk3OO5qM08jcRriwxHMVOZSczpPYuw",
  authDomain: "instagram-clone-9da2e.firebaseapp.com",
  projectId: "instagram-clone-9da2e",
  storageBucket: "instagram-clone-9da2e.appspot.com",
  messagingSenderId: "696244576813",
  appId: "1:696244576813:web:41dad4b4f36094e9314ea4",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;
export { FieldValue, firebase };
