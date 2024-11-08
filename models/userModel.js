const { auth, db } = require("../config/firebaseConfig");

class UserModel {
  static async createUser(data) {
    const { name, email, password, phoneNumber } = data;

    console.log("User data:", { name, email, password, phoneNumber });

    try {
      // Create user with email and password using Firebase Auth
      const userRecord = await auth.createUser({
        email,
        password,
      });

      console.log("User created successfully:", userRecord);

      // After successful registration, store additional data (name, email, phoneNumber) in Firestore
      const userRef = db.collection("users").doc(userRecord.uid);
      await userRef.set({
        name,
        email,
        phoneNumber,
      });

      console.log("User data stored in Firestore", userRecord);

      // Return only the user data you want (including phoneNumber)
      return { id: userRecord.uid, name, email, phoneNumber };
    } catch (error) {
      throw new Error("Failed to register user: " + error.message);
    }
  }

  static async getUserById(userId) {
    const userRef = db.collection("users").doc(userId);
    const doc = await userRef.get();
    return doc.exists ? doc.data() : null; // Return the user data, including phoneNumber
  }
}

module.exports = UserModel;
