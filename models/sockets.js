const { UserConnect, UserDisconnect } = require("../controllers/sockets");
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
      // mensaje-to-server
      //Validate Token
      //If Token is Invalid: Disconnect
      //User Active
      //Emit users connects
      //Socket Join
      //Linstening Messages with Client
      //Message-personal
      //Disconnect
      socket.on("disconnect", async () => {
        await UserDisconnect(uid);
      });
    });
  }
}

module.exports = Sockets;
