import { Move } from '@src/models/enum/Move';
import { Game } from '@src/models/Game';
import { ICommand } from '@src/models/interfaces/observers/ICommand';

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

    describe('Player tests', () => {
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

      describe('Move Player tests', () => {
        it('should move player up when invoke move player Up', () => {
          const player = { playerId: 'player1', x: 1, y: 5 };
          const command = { move: Move.UP, player };
          game.addPlayer(player);
          game.movePlayer(command);
          expect(game.state.players[player.playerId].y).toEqual(4);
        });

        it('should move player down when invoke move player Down', () => {
          const player = { playerId: 'player1', x: 1, y: 5 };
          const command = { move: Move.DOWN, player };
          game.addPlayer(player);
          game.movePlayer(command);
          expect(game.state.players[player.playerId].y).toEqual(6);
        });

        it('should move player left when invoke move player Left', () => {
          const player = { playerId: 'player1', x: 1, y: 5 };
          const command = { move: Move.LEFT, player };
          game.addPlayer(player);
          game.movePlayer(command);
          expect(game.state.players[player.playerId].x).toEqual(0);
        });

        it('should move player right when invoke move player Right', () => {
          const player = { playerId: 'player1', x: 1, y: 5 };
          const command = { move: Move.RIGHT, player };
          game.addPlayer(player);
          game.movePlayer(command);
          expect(game.state.players[player.playerId].x).toEqual(2);
        });

        it('should not move player up when player is in top of the screen', () => {
          const player = { playerId: 'player1', x: 1, y: 0 };
          const command = { move: Move.UP, player };
          game.addPlayer(player);
          game.movePlayer(command);
          expect(game.state.players[player.playerId].y).toEqual(0);
        });

        it('should not move player down when player is in bottom of the screen', () => {
          const player = { playerId: 'player1', x: 1, y: 19 };
          const command = { move: Move.DOWN, player };
          game.addPlayer(player);
          game.movePlayer(command);
          expect(game.state.players[player.playerId].y).toEqual(19);
        });

        it('should not move player left when player is in most left of the screen', () => {
          const player = { playerId: 'player1', x: 0, y: 10 };
          const command = { move: Move.LEFT, player };
          game.addPlayer(player);
          game.movePlayer(command);
          expect(game.state.players[player.playerId].x).toEqual(0);
        });

        it('should not move player right when player is in most right of the screen', () => {
          const player = { playerId: 'player1', x: 19, y: 10 };
          const command = { move: Move.RIGHT, player };
          game.addPlayer(player);
          game.movePlayer(command);
          expect(game.state.players[player.playerId].x).toEqual(19);
        });
      });
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

    it('should remove fruit if object collides', () => {
      const player = { playerId: 'player1', x: 10, y: 10 };
      const fruit = { fruitId: 'fruit1', x: 10, y: 10 };

      game.addPlayer(player);
      game.addFruit(fruit);

      game.checkForFruitCollision(player);
      expect(game.state.fruits['fruit1']).toBeUndefined();
    });
  });

  describe('Observer test', () => {
    it('should add an observer when subscribe', () => {
      const observersOutput = [];
      const observer = {
        exec: (command: ICommand) => {
          observersOutput.push(command);
        },
      };

      game.subscribe(observer);
      expect(game.observersSize()).toBe(1);
    });

    it('should execute observer method when notify all', () => {
      const observersOutput: ICommand[] = [];
      const observer = {
        exec: (command: ICommand) => {
          observersOutput.push(command);
        },
      };

      game.subscribe(observer);
      expect(game.observersSize()).toBe(1);

      game.notifyAll({ type: 'observer' });
      expect(observersOutput).toEqual([{ type: 'observer' }]);
    });
  });
});
