const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const db = require('./queries');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

// ERROR HANDLING FOR DISCONNECTIONS??
app.use(cors());

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});

app.get('/messages', db.getMessages);

app.post('/messages', db.createMessage);

app.delete('/messages/:id', db.deleteMessage);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('chat message', (msg) => {
    db.createSocketMessage(msg)
    .then(res => io.emit('chat message', msg))
    .catch(err => io.emit(err));
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(8000, () => {
  console.log('listening on *:8000');
});