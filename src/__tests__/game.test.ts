import { Game } from '@src/models/Game';

describe('Game tests', () => {
  const state = {
    players: {},
    fruits: {},
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

    it('should add a player when invoke game.addPlayer', () => {
      const player = { playerId: 'player1', x: 10, y: 10 };

      game.addPlayer(player);
      expect(game.state.players['player1']).toEqual(player);
    });

    it('should remove a player when invoke player.removePlayer', () => {
      const player = { playerId: 'player1', x: 10, y: 10 };

      game.addPlayer(player);
      expect(game.state.players['player1']).toEqual(player);

      game.removePlayer(player);
      expect(game.state.players['player1']).toBeUndefined();
    });

    it('should add a fruit when invoke game.addFruit', () => {
      const fruit = { fruitId: 'fruit1', x: 10, y: 10 };

      game.addFruit(fruit);
      expect(game.state.fruits['fruit1']).toEqual(fruit);
    });

    it('should remove fruit when invoke game.removeFruit', () => {
      const fruit = { fruitId: 'fruit1', x: 10, y: 10 };

      game.addFruit(fruit);
      expect(game.state.fruits['fruit1']).toEqual(fruit);

      game.removeFruit(fruit);
      expect(game.state.fruits['fruit1']).toBeUndefined();
    });
  });
});
