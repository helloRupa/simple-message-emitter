const db = require("./models/index");
const constants = require("./constants");
const Message = db["Message"];
const attributes = ["username", "msg", "created_at", "id"];

const geteRecentMessages = async () => {
  console.trace();
  return await Message.findAll({
    attributes,
    order: [["id", "DESC"]],
    limit: constants.MESSAGE_LIMIT,
    subQuery: false,
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
        reason: 'insertion failure',
        message: JSON.stringify(error),
        status: 500,
        created_at: new Date().toLocaleDateString(),
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
        reason: 'get failure',
        message: JSON.stringify(error),
        status: 500,
        created_at: new Date().toLocaleDateString(),
      },
    ];
  }
};

module.exports = {
  getMessages,
  createSocketMessage,
  getSocketMessages,
};
