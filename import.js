const admin = require('firebase-admin');
const fs = require('fs');

// Initialize the Firebase Admin SDK
const serviceAccount = require('./serviceAccount.json');
console.log("Firebase serviceAccount:", serviceAccount);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://Uptown-c1cda.firebaseio.com' // make sure to use the correct database URL
});

console.log("Firebase Initialized");

// Get a reference to your Firestore database
const db = admin.firestore();
console.log("Firestore Database:", db);

// Load the JSON data
const data = require('./output.json'); // replace with the path to your JSON file

// Get a reference to the foodItems collection
const foodItemsCollection = db.collection('foodItems');

// Upload the data to Firestore
for (const id in data) {
  foodItemsCollection.doc(id).set(data[id])
    .then(() => console.log(`Document ${id} written successfully.`))
    .catch(error => console.error(`Error writing document ${id}:`, error));
}
