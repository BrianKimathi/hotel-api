const { db } = require("../config/firebaseConfig");

class RoomModel {
  static async createRoom(data, images) {
    // Generate URLs for locally saved images
    const imageUrls = images.map(
      (image) => `/images/roomImages/${image.filename}`
    );

    const roomData = {
      ...data,
      images: imageUrls,
      createdAt: new Date().toISOString(),
      availability: true,
    };

    // Store the room data in Firestore
    const roomRef = db.collection("rooms").doc();
    await roomRef.set(roomData);

    return { id: roomRef.id, ...roomData };
  }

  static async getRoomById(roomId) {
    const roomRef = db.collection("rooms").doc(roomId);
    const doc = await roomRef.get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  static async getRooms() {
    const roomsRef = db.collection("rooms");
    const snapshot = await roomsRef.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  static async updateRoom(roomId, data) {
    const roomRef = db.collection("rooms").doc(roomId);
    await roomRef.update(data);
    return { id: roomId, ...data };
  }

  static async deleteRoom(roomId) {
    const roomRef = db.collection("rooms").doc(roomId);
    await roomRef.delete();
    return { id: roomId, message: "Room deleted successfully" };
  }
}

module.exports = RoomModel;
