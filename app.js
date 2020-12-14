const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketPort = process.env.PORT || 8000;
const db = require('./controller');
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
});

server.listen(socketPort, () => {
  console.log(`listening on *:${socketPort}`);
});

app.get('/messages', db.getMessages);

let recentMessages; 

db.getSocketMessages()
.then(res => {
  recentMessages = res;
})
.catch(console.log);

// connects, creates message, and emits top 10 messages
io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('chat message', (msg) => {
    db.createSocketMessage(JSON.parse(msg))
    .then(msg => {
      recentMessages.pop();
      recentMessages.unshift(msg);
      io.emit('chat message', recentMessages);
    })
    .catch(err => io.emit(err));
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
