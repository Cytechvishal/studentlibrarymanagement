// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDz1Jp58AmuuPUe0efUTn1UdEMNTRb70ek",
//   authDomain: "studentdata-cb725.firebaseapp.com",
//   projectId: "studentdata-cb725",
//   storageBucket: "studentdata-cb725.appspot.com",
//   messagingSenderId: "424364778176",
//   appId: "1:424364778176:web:8bf292e88f246078d3c325"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// export default firebase;


import { initializeApp } from "firebase/app";
import { getFirestore , enableIndexedDbPersistence} from "firebase/firestore";

// import { getStorage,} from 'firebase/storage';

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDz1Jp58AmuuPUe0efUTn1UdEMNTRb70ek",
//   authDomain: "studentdata-cb725.firebaseapp.com",
//   projectId: "studentdata-cb725",
//   storageBucket: "studentdata-cb725.appspot.com",
//   messagingSenderId: "424364778176",
//   appId: "1:424364778176:web:8bf292e88f246078d3c325"
// };
const firebaseConfig = {
  apiKey: "AIzaSyCWdYvpmbGrNXIcq6pw8QMMPt74cnjuEz4",
  authDomain: "formdata-860af.firebaseapp.com",
  projectId: "formdata-860af",
  storageBucket: "formdata-860af.appspot.com",
  messagingSenderId: "216998821063",
  appId: "1:216998821063:web:c76019e2b04c9c938492e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 const database = getFirestore(app)
// export const storage = getStorage(app);

enableIndexedDbPersistence(database)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      console.log("Persistence failed");
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      console.log("Persistence is not available");
    }
  });

  export {database}