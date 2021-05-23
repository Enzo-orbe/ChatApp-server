class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      // mensaje-to-server
      //Validate Token
      //If Token is Invalid: Disconnect
      //User Active
      //Emit users connects
      //Socket Join
      //Linstening Messages with Client
      //Message-personal
      //Disconnect
    });
  }
}

module.exports = Sockets;
