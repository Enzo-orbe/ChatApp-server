const Message = require("../models/message");

const getChat = async (req, res) => {
  try {
    const miId = req.uid;

    const messageFrom = req.params.from;

    const last30 = await Message.find({
      $or: [
        {
          from: miId,
          to: messageFrom,
        },
        {
          to: miId,
          from: messageFrom,
        },
      ],
    })
      .sort({ createdAt: "desc" })
      .limit(30);

    res.json({ ok: true, messages: last30 });
  } catch (error) {
    res.status(404).json({
      ok: false,
      msg: "Error al obtener los mensajes",
    });
  }
};

module.exports = {
  getChat,
};
