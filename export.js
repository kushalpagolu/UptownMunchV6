const admin = require('firebase-admin');
const fs = require('fs');

// Initialize the Firebase Admin SDK
const serviceAccount = require('./serviceAccount.json');
//console.log("Firebase serviceAccount:", serviceAccount);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://Uptown-c1cda.firebaseio.com' // make sure to use the correct database URL
});

console.log("Firebase Initialized");

// Get a reference to your Firestore database
const db = admin.firestore();
console.log("Firestore Database:", db);

// Fetch all documents from the collection
db.collection('foodItems').get()
  .then(snapshot => {
    const data = {};
    snapshot.forEach(doc => {
      data[doc.id] = doc.data();
    });

    //console.log("Fetched Data:", data);

    // Write the data to a JSON file
    fs.writeFileSync('output.json', JSON.stringify(data, null, 2));
    console.log("Data written to output.json");
  })
  .catch(error => console.error("Error fetching data:", error));
