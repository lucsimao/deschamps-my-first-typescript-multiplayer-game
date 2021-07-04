import renderScreen from './rendering/render.js';
import createKeyboardListener from './listeners/keyboardListener.js';
import scaleParser from './services/scaleParser.js';
import defaultGame from './services/gameHelper.js';

const socket = io();
const screen = document.getElementById('screen');

const keyboardListener = createKeyboardListener(document);
const game = defaultGame;

socket.on('connect', () => {
  const playerId = socket.id;

  renderScreen(screen, game, requestAnimationFrame, playerId);

  keyboardListener.registerPlayerId(playerId);
  keyboardListener.subscribe((command) => {
    socket.emit('move-player', command);
  });
});

socket.on('disconnect', () => {
  keyboardListener.registerPlayerId(playerId);
  socket.emit('disconnect', { playerId });
});

socket.on('setup', (state) => {
  game.state = state;
  scaleParser.parseScaledScreen(game, screen);
});

socket.on('update', (state) => {
  game.state = state;
});
