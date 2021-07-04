import Move from '../enums/move.js';
const sprites = {};
const drawSprite = (context, spriteSource, gameElement) => {
  const sprite = sprites[spriteSource] || new Image();

  sprite.src = spriteSource;
  context.drawImage(
    sprite,
    0,
    0,
    sprite.width,
    sprite.height,
    gameElement.x,
    gameElement.y,
    gameElement.width,
    gameElement.height
  );

  sprites[spriteSource] = sprite;
};

const drawPlayer = (player, context) => {
  if (player) {
    const spriteSource =
      animationAssets[player.lastMove || Move.DOWN]('player');
    drawSprite(context, spriteSource, player);
  }
};

const drawOpponent = (opponent, context) => {
  const spriteSource =
    animationAssets[opponent.lastMove || Move.DOWN]('opponent');
  drawSprite(context, spriteSource, opponent);
};

const drawFruit = (fruit, context) => {
  const spriteSource = animationAssets['FRUIT'](fruit.fruitName);
  drawSprite(context, spriteSource, fruit);
};

const getDefaultSpriteSource = (prefix, suffix = 'sprite') => {
  return `../../assets/${prefix}-${suffix}.png`;
};

const animationAssets = {
  [Move.UP]: (assetName) => {
    return getDefaultSpriteSource(assetName, 'up');
  },
  [Move.DOWN]: (assetName) => {
    return getDefaultSpriteSource(assetName, 'down');
  },
  [Move.LEFT]: (assetName) => {
    return getDefaultSpriteSource(assetName, 'left');
  },
  [Move.RIGHT]: (assetName) => {
    return getDefaultSpriteSource(assetName, 'right');
  },
  ['FRUIT']: (assetName) => {
    return getDefaultSpriteSource(assetName);
  },
};

export default { drawPlayer, drawFruit, drawOpponent };
