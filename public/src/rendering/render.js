import animationHelper from '../services/animationHelper.js';
import scaleParser from '../services/scaleParser.js';

const drawOpponentSprites = (game, currentPlayerId, context) => {
  const players = Object.values(game.state.players);
  players.forEach(async (player) => {
    if (player.playerId !== currentPlayerId) {
      animationHelper.drawOpponent(
        scaleParser.getParsedPlayer(player),
        context
      );
    }
  });
};

const drawFruitsSprites = (game, context) => {
  const fruits = Object.values(game.state.fruits);
  fruits.forEach(async (fruit) => {
    animationHelper.drawFruit(scaleParser.getParsedPlayer(fruit), context);
  });
};

const drawPlayerSprites = (game, currentPlayerId, context) => {
  const currentPlayer = game.state.players[currentPlayerId];
  animationHelper.drawPlayer(
    scaleParser.getParsedPlayer(currentPlayer),
    context
  );
};

const renderScreen = (screen, game, requestAnimationFrame, currentPlayerId) => {
  const context = screen.getContext('2d');

  context.clearRect(0, 0, screen.width, screen.height);
  drawPlayerSprites(game, currentPlayerId, context);

  drawOpponentSprites(game, currentPlayerId, context);

  drawFruitsSprites(game, context);

  requestAnimationFrame(() => {
    renderScreen(screen, game, requestAnimationFrame, currentPlayerId);
  });
};

export default renderScreen;
