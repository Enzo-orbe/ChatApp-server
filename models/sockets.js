const {
  UserConnect,
  UserDisconnect,
  getUsers,
  saveMessage,
} = require("../controllers/sockets");
const { verifyToken } = require("../helpers/jwt");

class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", async (socket) => {
      const [valido, uid] = verifyToken(socket.handshake.query["x-token"]);
      if (!valido) {
        console.log("Socket No valido");
        return socket.disconnect();
      }

      await UserConnect(uid);

      socket.join(uid);
      // mensaje-to-server
      //Validate Token
      //If Token is Invalid: Disconnect
      //User Active
      //Emit users connects
      this.io.emit("lista-usuarios", await getUsers());
      //Socket Join
      //Linstening Messages with Client
      socket.on("mensaje-personal", async (payload) => {
        const message = await saveMessage(payload);
        this.io.to(payload.to).emit("mensaje-personal", message);
        this.io.to(payload.from).emit("mensaje-personal", message);
      });
      //Message-personal
      //Disconnect
      socket.on("disconnect", async () => {
        await UserDisconnect(uid);
        this.io.emit("lista-usuarios", await getUsers());
      });
    });
  }
}

module.exports = Sockets;
