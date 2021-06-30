export default function renderScreen(
  screen,
  game,
  requestAnimationFrame,
  currentPlayerId
) {
  const context = screen.getContext('2d');

  screen.width = game.state.screen.width;
  screen.height = game.state.screen.height;
  screen.style.width = `${screen.width * 40}px`;
  screen.style.height = `${screen.height * 40}px`;

  context.fillStyle = 'white';
  context.clearRect(0, 0, game.state.screen.width, game.state.screen.height);

  for (const playerId in game.state.players) {
    const player = game.state.players[playerId];
    context.fillStyle = 'rgba(0, 0, 200, 0.5)';
    context.fill;
    context.fillRect(player.x, player.y, 1, 1);
  }

  for (const fruitId in game.state.fruits) {
    const fruit = game.state.fruits[fruitId];
    context.fillStyle = 'green';
    context.fillRect(fruit.x, fruit.y, 1, 1);
  }

  const currentPlayer = game.state.players[currentPlayerId];
  if (currentPlayer) {
    context.fillStyle = '#F0DB4F';
    context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1);
  }

  requestAnimationFrame(() => {
    renderScreen(screen, game, requestAnimationFrame, currentPlayerId);
  });

  return null;
}
