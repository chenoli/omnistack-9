const path = require('path');
const cors = require('cors');
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-x4gij.mongodb.net/omnistack9?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectedUsers = {};

io.on('connection', socket => {
  const { user_id } = socket.handshake.query;
  connectedUsers[user_id] = socket.id;
});

app.use((request, response, next) => {
  request.io = io;
  request.connectedUsers = connectedUsers;
  return next();
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);
