const BookingModel = require("../models/bookingModel.js");

class BookingController {
  static async getBookingsByUser(req, res) {
    try {
      // const userId = req.user.uid; // Assuming user ID is available from the token
      const userId = req.params.id;
      const bookings = await BookingModel.getBookingsByUserId(userId);

      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBookingsByRoom(req, res) {
    try {
      const roomId = req.params.roomId;
      const bookings = await BookingModel.getBookingsByRoomId(roomId);

      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = BookingController;
