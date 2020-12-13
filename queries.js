const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
});

/* REGULAR DB STUFF, BEING USED, GETS MOST RECENT 10 MSGS, ORDER RECENT TO OLD */
const getMessages = (request, response) => {
  pool.query('SELECT * FROM messages ORDER BY id DESC LIMIT 20', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
};

/* SOCKET DB STUFF, IS BEING USED */
const createSocketMessage = (message) => {
  return new Promise(resolve => {
    pool.query(
      'INSERT INTO messages (msg, username) VALUES ($1, $2) RETURNING msg, username, created_at', 
      [message.msg, message.username], 
      (error, results) => {
      if (error) {
        throw error;
      }

      resolve(results.rows);
    });
  });
};

const getSocketMessages = () => {
  return new Promise(resolve => {
    // could pull out into own function
    pool.query(
      'SELECT * FROM messages ORDER BY id DESC LIMIT 20', 
      (error, results) => {
      if (error) {
        throw error;
      }
      
      resolve(results.rows);
    })
  });
};

module.exports = {
  getMessages,
  createSocketMessage,
  getSocketMessages
};