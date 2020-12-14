const db = require('./models/index');
const Message = db['Message'];

async function geteRecentMessages() {
  return await Message.findAll({
    attributes: ['username', 'msg', 'created_at', 'id'],
    order: [['id', 'DESC']],
    limit: 20,
    raw: true
  });
}

const getMessages = async (req, res) => {
  try {
    const messages = await geteRecentMessages();

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
};

const createSocketMessage = (msg) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(Message.create(msg, {
        returning: ['username', 'msg', 'created_at', 'id']
      }));
    } catch (error) {
      console.log(error);
      reject([{ 
        username: "chatterMeow", 
        message: error
      }]);
    }
  }).then(res => res.dataValues);
};

const getSocketMessages = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(geteRecentMessages());
    } catch (error) {
      console.log(error);
      reject([{ 
        username: "chatterMeow", 
        message: error
      }]);
    }
  });
};

module.exports = {
  getMessages,
  createSocketMessage,
  getSocketMessages
};