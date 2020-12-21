const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const socketPort = process.env.PORT;
const db = require("./controller");
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.ALLOWED_ORIGIN,
    methods: ["GET", "POST"],
  },
});

server.listen(socketPort, () => {
  console.log(`listening on *:${socketPort}`);
});

app.use(cors());
app.get("/messages", db.getMessages);

let recentMessages;

db.getSocketMessages()
  .then((res) => {
    recentMessages = res;
  })
  .catch(console.log);

// connects, creates message, and emits top 20 messages
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (msg) => {
    db.createSocketMessage(JSON.parse(msg))
      .then((msg) => {
        if (recentMessages.length >= 20) {
          recentMessages.pop();
        }

        recentMessages.unshift(msg);
        io.emit("chat message", recentMessages);
      })
      .catch((err) => io.emit(err));
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
