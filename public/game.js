import renderScreen from './render.js';
import createKeyboardListener from './keyboardListener.js';

const socket = io();

const keyboardListener = createKeyboardListener(document);
const game = {
  state: {
    players: {},
    fruits: {},
    screen: {
      width: 10,
      height: 10,
    },
  },
};

socket.on('connect', () => {
  const screen = document.getElementById('screen');
  const playerId = socket.id;

  console.log(`Connected to server as ${playerId}`);

  renderScreen(screen, game, requestAnimationFrame, playerId);

  keyboardListener.registerPlayerId(playerId);
  keyboardListener.subscribe((command) => {
    socket.emit('move-player', command);
  });
});

socket.on('setup', (state) => {
  console.log(`Receiving "setup" event from server ${JSON.stringify(state)}`);
  game.state = state;
});
