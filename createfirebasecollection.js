const admin = require('firebase-admin');

// Initialize the Firebase Admin SDK
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://Uptown-c1cda.firebaseio.com' // make sure to use the correct database URL
});

console.log("Firebase Initialized");

// Get a reference to your Firestore database
const db = admin.firestore();
console.log("Firestore Database:", db);

// Define a document for the 'favorites' collection
const favorite = {
  userId: 'user1',
  favorites: ['item1', 'item2', 'item3'] // replace with actual data
};

// Add the document to the 'favorites' collection
db.collection('favorites').doc('favorite1').set(favorite)
  .then(() => {
    console.log("Document successfully written!");
  })
  .catch((error) => {
    console.error("Error writing document: ", error);
  });
