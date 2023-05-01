// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc,  } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBxcnfvq47F11EpUvUUmZwqsqU8YvxLtIA",
  authDomain: "foodhaat-c1cda.firebaseapp.com",
  projectId: "foodhaat-c1cda",
  storageBucket: "foodhaat-c1cda.appspot.com",
  messagingSenderId: "777978773962",
  appId: "1:777978773962:web:55e884d9df0eab04684f33",
  measurementId: "G-B5WW3MBQGG"
};

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
 
export default db;
export { auth };

