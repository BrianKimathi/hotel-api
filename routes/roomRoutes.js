const express = require("express");
const RoomController = require("../controllers/roomController.js");
const upload = require("../middlewares/multer.js");
const verifyToken = require("../middlewares/verifyToken.js");

const router = express.Router();

// Room CRUD operations
router.post("/create-room", upload, RoomController.createRoom); // Protect room creation
router.get("/", RoomController.getRooms);
router.get("/:id", RoomController.getRoom);
router.put("/:id", RoomController.updateRoom); // Protect room update
router.delete("/:id", RoomController.deleteRoom); // Protect room deletion

// Booking operation (protected)
router.post("/book", RoomController.bookRoom); // Protect booking
router.delete(
  "/bookings/:bookingId",
  RoomController.cancelBooking
); // Protect booking cancellation

module.exports = router;
