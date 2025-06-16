import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// Optionally import the services that you want to use
// import {...} from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBOeStk_3B-kQxD2W-AcLgajpcSYH0qIzA",
    authDomain: "fondazione-oz.firebaseapp.com",
    projectId: "fondazione-oz",
    storageBucket: "fondazione-oz.appspot.com",
    messagingSenderId: "787868352976",
    appId: "1:787868352976:web:aaa0897d1b1b32faa139d5",
    measurementId: "G-TENB3DTFJ1", // opzionale
};

 const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase


const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);
export { app, auth, db};

console.log("Firebase initialized");
