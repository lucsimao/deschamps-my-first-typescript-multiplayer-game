import renderScreen from './render.js';

const socket = io();

socket.on('connect', () => {
  const screen = this.document.getElementById('screen');
  const game = {
    state: {
      players: {},
      fruits: {},
      screen: {
        width: 30,
        height: 30,
      },
    },
  };
  const playerId = socket.id;

  this.console.log('connected');
  renderScreen(screen, game, this.requestAnimationFrame, playerId);
});
