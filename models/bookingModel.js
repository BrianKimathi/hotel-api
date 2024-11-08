const { db } = require("../config/firebaseConfig");

class BookingModel {
  static async createBooking(data) {
    const { roomId, userId, startDate, endDate } = data;

    const isAvailable = await this.isRoomAvailable(roomId, startDate, endDate);
    if (!isAvailable) {
      throw new Error("Room is not available for the selected dates.");
    }

    const bookingData = {
      roomId,
      userId,
      startDate,
      endDate,
      createdAt: new Date().toISOString(),
    };

    const bookingRef = db.collection("bookings").doc();
    await bookingRef.set(bookingData);

    return { id: bookingRef.id, ...bookingData };
  }

  static async isRoomAvailable(roomId, startDate, endDate) {
    const bookingsRef = db.collection("bookings");
    const snapshot = await bookingsRef
      .where("roomId", "==", roomId)
      .where("startDate", "<", endDate)
      .where("endDate", ">", startDate)
      .get();

    return snapshot.empty; // Room is available if no overlapping bookings exist
  }

  static async cancelBooking(bookingId) {
    const bookingRef = db.collection("bookings").doc(bookingId);
    const doc = await bookingRef.get();

    if (!doc.exists) {
      throw new Error("Booking not found");
    }

    await bookingRef.delete();
    return { id: bookingId, message: "Booking canceled successfully" };
  }

  static async getBookingsByUserId(userId) {
    const bookingsRef = db.collection("bookings");
    const snapshot = await bookingsRef.where("userId", "==", userId).get();

    if (snapshot.empty) {
      return []; // No bookings found
    }

    const bookings = [];
    for (const doc of snapshot.docs) {
      const bookingData = doc.data();
      const roomId = bookingData.roomId;

      // Fetch room details
      const roomRef = db.collection("rooms").doc(roomId);
      const roomDoc = await roomRef.get();

      if (roomDoc.exists) {
        bookings.push({
          bookingId: doc.id,
          roomDetails: { id: roomId, ...roomDoc.data() },
          ...bookingData,
        });
      }
    }

    return bookings;
  }

  static async getBookingsByRoomId(roomId) {
    const bookingsRef = db.collection("bookings");
    const snapshot = await bookingsRef.where("roomId", "==", roomId).get();

    if (snapshot.empty) {
      return []; // No bookings found for the room
    }

    const bookings = snapshot.docs.map((doc) => ({
      bookingId: doc.id,
      ...doc.data(),
    }));

    return bookings;
  }
}

module.exports = BookingModel;
