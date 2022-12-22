import firebase from "firebase/app"
import 'firebase/firestore'
import "firebase/auth"
import "firebase/storage";
import "firebase/analytics";



const app = firebase.initializeApp({
  apiKey: "AIzaSyC55ktBNPCJg0H4STufWcO0HMTk2H7NcrQ",
  authDomain: "video-library-f5803.firebaseapp.com",
  projectId: "video-library-f5803",
  storageBucket: "video-library-f5803.appspot.com",
  messagingSenderId: "388556693469",
  appId: "1:388556693469:web:9ab24dd2231f631d016034",
  measurementId: "G-05S5RV2PTV"
})



var db = firebase.firestore();
export const analytics = firebase.analytics();
export const storage = firebase.storage();
export const auth = app.auth();
export default db;





