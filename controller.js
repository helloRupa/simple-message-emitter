const db = require("./models/index");
const constants = require("./constants");
const Message = db["Message"];
const attributes = ["username", "msg", "created_at", "id"];

const geteRecentMessages = async () => {
  return await Message.findAll({
    attributes,
    order: [["id", "DESC"]],
    limit: constants.MESSAGE_LIMIT,
    raw: true,
  });
};

const getMessages = async (req, res) => {
  try {
    const messages = await geteRecentMessages();

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createSocketMessage = async (msg) => {
  try {
    return await Message.create(msg, {
      returning: attributes,
    });
  } catch (error) {
    console.log(error);
    return [
      {
        username: "chatterMeow",
        message: error,
        status: 400,
      },
    ];
  }
};

const getSocketMessages = async () => {
  try {
    return await geteRecentMessages();
  } catch (error) {
    console.log(error);
    return [
      {
        username: "chatterMeow",
        message: error,
        status: 500,
      },
    ];
  }
};

module.exports = {
  getMessages,
  createSocketMessage,
  getSocketMessages,
};
