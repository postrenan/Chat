const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/style.css', (req, res) => {
  res.sendFile(__dirname + '/style.css');
});

io.on('connection', (socket) => {
  console.log(`a user connected `);
  let msg;
  let chatMessages = [];

  socket.on('message', ({ name, room, msg }) => {
    io.to(room).emit('message', `${name}: ${msg}`);
    chatMessages.push(`${name}: ${msg}`);
  });

  socket.on('turnRoom',  (value) => {
    socket.join(value);
    socket.emit(chatMessages);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

// Path: index.html

