const scale = 50;

const parseScreen = (game, screen) => {
  screen.width = game.state.screen.width * scale;
  screen.height = game.state.screen.height * scale;
  screen.style.width = `${screen.width}px`;
  screen.style.height = `${screen.height}px`;
};

const getParsedSprite = (sprite) => {
  const newSprite = { ...sprite, width: scale, height: scale };
  newSprite.x *= scale;
  newSprite.y *= scale;
  return newSprite;
};

const parseScaledScreen = (game, screen) => {
  screen.width = game.state.screen.width * scale;
  screen.height = game.state.screen.height * scale;
  screen.style.width = `${screen.width}px`;
  screen.style.height = `${screen.height}px`;
};

const getParsedPlayer = (player) => {
  return getParsedSprite(player);
};

const getParsedFruit = (fruit) => {
  return getParsedSprite(fruit);
};

export default {
  parseScreen,
  getParsedPlayer,
  getParsedFruit,
  parseScaledScreen,
};
