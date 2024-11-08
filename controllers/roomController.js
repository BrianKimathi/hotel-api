const RoomModel = require("../models/roomModel");
const BookingModel = require("../models/bookingModel");

class RoomController {
  static async createRoom(req, res) {
    try {
      const roomData = req.body;
      const images = req.files;

      // Pass the userId to the RoomModel
      const room = await RoomModel.createRoom(roomData, images);
      res.status(201).json(room);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getRoom(req, res) {
    try {
      const room = await RoomModel.getRoomById(req.params.id);
      if (room) {
        const baseImageUrl =
          "https://hotel-booking-nodejs-api.onrender.com/images/roomImages/";
        room.images = room.images.map(
          (imagePath) => `${baseImageUrl}${imagePath.split("/").pop()}`
        );
        res.status(200).json(room);
      } else {
        res.status(404).json({ error: "Room not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve room" });
    }
  }

  static async getRooms(req, res) {
    try {
      const rooms = await RoomModel.getRooms();
      const baseImageUrl =
        "https://hotel-booking-nodejs-api.onrender.com/images/roomImages/";
      const roomsWithFullUrls = rooms.map((room) => {
        return {
          ...room,
          images: room.images.map(
            (imagePath) => `${baseImageUrl}${imagePath.split("/").pop()}`
          ),
        };
      });
      res.status(200).json(roomsWithFullUrls);
    } catch (error) {
      console.error("Error retrieving rooms:", error);
      res.status(500).json({ error: "Failed to retrieve rooms" });
    }
  }

  static async updateRoom(req, res) {
    try {
      const room = await RoomModel.updateRoom(req.params.id, req.body);
      res.status(200).json(room);
    } catch (error) {
      res.status(500).json({ error: "Failed to update room" });
    }
  }

  static async deleteRoom(req, res) {
    try {
      const result = await RoomModel.deleteRoom(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete room" });
    }
  }

  static async bookRoom(req, res) {
    try {
      const { roomId, userId, startDate, endDate } = req.body;
      const booking = await BookingModel.createBooking({
        roomId,
        userId,
        startDate,
        endDate,
      });
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async cancelBooking(req, res) {
    try {
      const { bookingId } = req.params;
      const result = await BookingModel.cancelBooking(bookingId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = RoomController;
