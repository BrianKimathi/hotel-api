const express = require("express");
const BookingController = require("../controllers/bookingController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/user/:id", BookingController.getBookingsByUser);
// router.get("/rooms/:roomId", verifyToken, BookingController.getBookingsByRoom);
router.get("/rooms/:roomId", BookingController.getBookingsByRoom);

module.exports = router;
