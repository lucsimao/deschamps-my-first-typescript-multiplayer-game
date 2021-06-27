import { IState } from './interfaces/IState';
import { isCollidingElements } from '@src/utils/elementsUtils';
import { IPlayer } from './interfaces/states-attributes/IPlayer';
import { IFruit } from './interfaces/states-attributes/IFruit';
import { AbstractSubject } from './interfaces/observers/AbstractSubject';
import { IMoveCommand } from './interfaces/observers/IMoveCommand';
import { validCommands } from '@src/helpers/validCommandsHelper';

const DEFAULT_SCREEN_HEIGHT = 20;
const DEFAULT_SCREEN_WIDTH = 20;

export class Game extends AbstractSubject {
  private _state: IState;

  constructor(
    screenWidth: number = DEFAULT_SCREEN_WIDTH,
    screenHeight: number = DEFAULT_SCREEN_HEIGHT
  ) {
    super();
    this._state = {
      players: {},
      fruits: {},
      screen: {
        width: screenWidth,
        height: screenHeight,
      },
    };
  }

  public addPlayer(player: IPlayer): void {
    this._state.players[player.playerId] = player;
  }

  public removePlayer(player: IPlayer): void {
    delete this._state.players[player.playerId];
  }

  public movePlayer(command: IMoveCommand): void {
    const playerId = command.player.playerId;
    const player = this._state.players[playerId];
    const moveFunction = validCommands[command.move];

    if (player) {
      moveFunction(player, this._state.screen);
    }
  }

  public addFruit(fruit: IFruit): void {
    this._state.fruits[fruit.fruitId] = fruit;
  }

  public removeFruit(fruit: IFruit): void {
    delete this._state.fruits[fruit.fruitId];
  }

  public checkForFruitCollision = (player: IPlayer): void => {
    const fruits = Object.values(this._state.fruits);

    fruits.forEach((fruit: IFruit) => {
      if (isCollidingElements(player, fruit)) {
        this.removeFruit(fruit);
      }
    });
  };

  public get state(): IState {
    return this._state;
  }
}
