import './utils/module-alias';
import express from 'express';
import http from 'http';
import { Game } from '@src/models/Game';
import { Server } from 'socket.io';
import { IMoveCommand } from './models/interfaces/observers/IMoveCommand';

const app = express();
const server = http.createServer(app);
const PORT = 3000;
const PUBLIC = 'public';
const sockets = new Server(server);
const game = new Game();

game.start(() => {
  sockets.emit('setup', game.state);
});

sockets.on('connection', (socket) => {
  const playerId = socket.id;
  game.addPlayer(playerId);
  sockets.emit('setup', game.state);

  socket.on('disconnect', () => {
    game.removePlayer(playerId);
    sockets.emit('setup', game.state);
  });

  socket.on('move-player', (moveCommand: IMoveCommand) => {
    game.movePlayer(moveCommand);
    sockets.emit('setup', game.state);
  });
});

app.use(express.static(PUBLIC));
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
