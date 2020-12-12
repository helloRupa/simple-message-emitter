const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
});

/* REGULAR DB STUFF NOT BEING USED */
const getMessages = (request, response) => {
  pool.query('SELECT * FROM messages ORDER BY id DESC LIMIT 10', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
};

const createMessage = (request, response) => {
  const { msg } = request.body;

  pool.query('INSERT INTO messages (msg) VALUES ($1) RETURNING msg', [msg], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(results.rows);
  });
};

const deleteMessage = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM messages WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }

    response.status(200).send(`Message deleted with ID: ${id}`);
  });
};

/* SOCKET DB STUFF, IS BEING USED */
const getSocketMessages = () => {
  return new Promise(resolve => {
    pool.query('SELECT * FROM messages ORDER BY id DESC LIMIT 10', (error, results) => {
      if (error) {
        throw error;
      }
      
      resolve(results.rows);
    })
  });
};

const createSocketMessage = (message) => {
  return new Promise(resolve => {
    pool.query('INSERT INTO messages (msg) VALUES ($1) RETURNING msg', [message], (error, results) => {
      if (error) {
        throw error;
      }
  
      resolve(results.rows);
    });
  });
};

module.exports = {
  getMessages,
  createMessage,
  deleteMessage,
  getSocketMessages,
  createSocketMessage
};