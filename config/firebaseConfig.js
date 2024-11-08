var admin = require("firebase-admin");

var serviceAccount = require("/etc/secrets/service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
const db = admin.firestore();

module.exports = { auth, db };

