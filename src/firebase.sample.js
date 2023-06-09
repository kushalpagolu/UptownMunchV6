// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc,  } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { query, where } from 'firebase/firestore';
//import * as firebase from 'firebase';
import * as FileSystem from 'expo-file-system';


const firebaseConfig = {
  apiKey: "BILaSyBnj8kHfHH0aKwqsqU8YvxLtIA",
  authDomain: "Uptown-c1cda.firebaseapp.com",
  projectId: "Uptown-c1cda",
  storageBucket: "Uptown-c1cda.appspot.com",
  messagingSenderId: "329839103829",
  appId: "1:77329839103829:web:55e4324d43562eb04684f33",
  measurementId: "G-B5WW3MAKNUYG"
};

export async function uploadImageToFirebase(uri, folder, filename) {
  const response = await fetch(uri);
  const blob = await response.blob();
  const ref = firebase.storage().ref().child(`${folder}/${filename}`);
  await ref.put(blob);
  const downloadUrl = await ref.getDownloadURL();
  return downloadUrl;
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
const usersCollection = collection(db, 'users');
//const foodItemsCollection = collection(db, 'foodItems');

//console.log('itemsCollection:', itemsCollection);
const auth = getAuth(app);

export const getItems = async (collectionName) => {
  const itemsCollection = collection(db, collectionName);
  const snapshot = await getDocs(itemsCollection);
  const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return items;
};

export const getUsers = async () => {
  const snapshot = await getDocs(usersCollection);
  const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return items;
};
 
//get foodItems based on categoryName
export const getFoodItemsByCategory = async (categoryName) => {
  const foodItemsCollection = collection(db, 'foodItems');
  const q = query(foodItemsCollection, where('categoryName', '==', categoryName));
  const snapshot = await getDocs(q);
  const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return items;
};

export default db;
export { app, auth };

