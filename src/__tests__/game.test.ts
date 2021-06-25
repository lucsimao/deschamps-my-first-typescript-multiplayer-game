import { Game } from '@src/models/Game';

describe('Game tests', () => {
  const state = {
    screen: {
      width: 20,
      height: 20,
    },
  };

  let game: Game;
  beforeEach(() => {
    game = new Game();
  });

  describe('State tests', () => {
    it('should return state when created', () => {
      expect(game.state).toEqual(state);
    });
  });
});
