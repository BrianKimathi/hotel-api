const express = require("express");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
const bookingsRoutes = require("./routes/bookingsRoutes");
const path = require("path");
const app = express();
const helmet = require("helmet");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

// Serve static files (images) from the 'images' directory
app.use("/images", express.static(path.join(__dirname, "images")));

// Define your API routes
// app.use("/", (req, res) => {
//   res.json({ message: "Hello from the server!" });
// });
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingsRoutes);
// Additional routes...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
