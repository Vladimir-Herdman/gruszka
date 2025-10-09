"use client"

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc, setDoc, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig); //don't reinitialize in hot-reload development
const db = getFirestore(app);
const auth = getAuth(app);
auth.useDeviceLanguage();
const provider = new GoogleAuthProvider();

const userCollectionRef = collection(db, "users");
let userUid: string = "";

export type UserData = {
  favorites?: Array<string>;
  email?: string;
};
let userData: UserData = {
  favorites: [],
  email: "",
};

export async function registerNewUser(email: string, password: string): Promise<boolean> {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredentials.user;
    userUid = user.uid;
    createOrGetDatabaseUserData();
    userData.email = email;
    return true;
  } catch (error) {
    console.error(`Error in basic registration in using firebase - email:${email} password:${password}\nError:${error}`); //REMOVE - in final, don't show password, security risk
  }
  return false
}

export async function signInExistingUser(email: string, password: string): Promise<boolean> {
  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredentials.user;
    userUid = user.uid;
    createOrGetDatabaseUserData();
    userData.email = email;
    return true;
  } catch (error) {
    console.error(`Error in basic sign in using firebase - email:${email} password:${password}\nError:${error}`); //REMOVE - in final, don't show password, security risk
  }
  return false
}

export async function signInWithGoogle(): Promise<boolean> {
  try {
    const gResult = await signInWithPopup(auth, provider);
    const user = gResult.user;
    userUid = user.uid;
    userData.email = user.email || "";
    createOrGetDatabaseUserData();
    return true;
  } catch (e) {
    console.error("Sign in with Google error:\n", e);
  }
  return false;
}

async function createOrGetDatabaseUserData() {
  try {
    const userDocRef = doc(userCollectionRef, userUid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const data = userDocSnap.data();
      setUserData(data);
      console.log(`User data for uid-${userUid}:\n`, data);
    } else { //user data doesn't exist, so make it
      await setDoc(doc(userCollectionRef, userUid), userData);
      console.log("user data set");
    }
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  return false;
}

//call this to update the backend database with new user data by passing the object for a logged in user
export async function updateDatabaseUserData(userData: Object) {
  if (!isUserSignedIn()) {console.error("User not signed in, can't get user data"); return false;}

  try {
    const userDocRef = doc(userCollectionRef, userUid);
    console.log(`udud: userUid-${userUid}`); //REMOVE
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      await setDoc(doc(userCollectionRef, userUid), userData);
      console.log("user data set");
    } else {
      console.error("No user data exists, so no one signed/logged in currently");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  return false;
}

//returns the users data object
export function getUserData() {
  if (isUserSignedIn()) {
    return userData;
  } else {
    console.error("User not signed in, can't get data");
  }
  return null;
}

//set local user data to given object
export function setUserData(newUserData: UserData) {
  userData = newUserData;
}

//clear local user data to empty object
export function clearUserData() {
  userData = {};
}

//return bool on if user is currently signed in or not
export function isUserSignedIn(): boolean {
  return userUid !== "";
}
