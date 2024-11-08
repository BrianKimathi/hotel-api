const { auth } = require("../config/firebaseConfig");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from the "Authorization" header

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    // Verify the token using Firebase Authentication
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken; // Attach the decoded token to the request object
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    console.error("Error verifying token:", error.message);
    res.status(403).json({ error: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
