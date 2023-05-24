import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: Constants.manifest.firebase.apiKey,
  authDomain: Constants.manifest.firebase.authDomain,
  projectId: Constants.manifest.firebase.projectId,
  storageBucket: Constants.manifest.firebase.storageBucket,
  messagingSenderId: Constants.manifest.firebase.messagingSenderId,
  appId: Constants.manifest.firebase.appId,
  databaseURL: Constants.manifest.firebase.databaseURL,
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
