const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Ensure that the 'images/roomImages' directory exists
const uploadDir = path.join(__dirname, "../images/roomImages");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
}

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir); // Destination folder
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`); // Filename with timestamp
    },
  }),
  limits: {
    files: 6, // Limit to a maximum of 6 images
  },
  fileFilter: (req, file, cb) => {
    // Only accept image files
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
}).array("images", 6); // Accept up to 6 images

// Custom middleware to ensure minimum of 3 images
upload.middlewares = (req, res, next) => {
  if (req.files && req.files.length >= 3) {
    return next(); // Proceed if there are 3 or more files
  }
  return res.status(400).json({ error: "You must upload at least 3 images." });
};

module.exports = upload;
