const UserModel = require("../models/userModel");
const { auth, db } = require("../config/firebaseConfig");

class UserController {
  static async register(req, res) {
    try {
      const user = await UserModel.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.error("Error registering user:", error.message);
      res
        .status(500)
        .json({ error: error.message || "Failed to register user" });
    }
  }

  // User login
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      // Sign in with Firebase Authentication
      const userRecord = await auth.getUserByEmail(email);

      const customToken = await auth.createCustomToken(userRecord.uid);
      res.status(200).json({
        message: "Login successful",
        token: customToken,
      });
    } catch (error) {
      console.error("Error during login:", error.message);
      res.status(500).json({ error: "Failed to authenticate user" });
    }
  }

  static async getUser(req, res) {
    try {
      const user = await UserModel.getUserById(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to get user" });
    }
  }

}

module.exports = UserController;
