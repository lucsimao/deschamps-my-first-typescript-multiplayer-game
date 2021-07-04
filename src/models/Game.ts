import { IState } from './interfaces/IState';
import { isCollidingElements } from '../utils/elementsUtils';
import { IPlayer } from './interfaces/states-attributes/IPlayer';
import { IFruit } from './interfaces/states-attributes/IFruit';
import { AbstractSubject } from './interfaces/observers/AbstractSubject';
import { IMoveCommand } from './interfaces/observers/IMoveCommand';
import { validCommands } from '@src/helpers/validCommandsHelper';
import { FruitName } from './enum/FruitName';

const DEFAULT_SCREEN_HEIGHT = 15;
const DEFAULT_SCREEN_WIDTH = 15;

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

  public start(startFunction: () => void): void {
    const frequency = 2000;
    setInterval(() => {
      this.addFruit();
      startFunction();
    }, frequency);
  }

  public addPlayer(playerId: string, x?: number, y?: number): void {
    const playerX =
      x !== undefined
        ? x
        : Math.floor(Math.random() * this._state.screen.width);
    const playerY =
      y !== undefined
        ? y
        : Math.floor(Math.random() * this._state.screen.height);
    const player = {
      playerId,
      x: playerX,
      y: playerY,
    };

    this._state.players[player.playerId] = player;
  }

  public removePlayer(playerId: string): void {
    delete this._state.players[playerId];
  }

  public movePlayer(command: IMoveCommand): void {
    const playerId = command.playerId;
    const player = this._state.players[playerId];
    const moveFunction = validCommands[command.move];
    if (player && moveFunction !== undefined) {
      moveFunction(player, this._state.screen);
      player.lastMove = command.move;
      this.checkForFruitCollision(player);
    }
  }

  public addFruit(
    fruitId: string = this.calculateRandomId(),
    x: number = this.calculateRandomX(),
    y: number = this.calculateRandomY(),
    fruitName: string = this.getRandomFruitName()
  ): void {
    const fruit = {
      fruitId,
      x,
      y,
      fruitName,
    };
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

  private calculateRandomX(): number {
    return Math.floor(Math.random() * this._state.screen.width);
  }

  private calculateRandomY(): number {
    return Math.floor(Math.random() * this._state.screen.height);
  }

  private calculateRandomId(): string {
    return `${Math.floor(Math.random() * 100000)}`;
  }

  public getRandomFruitName(): string {
    const fruitValues = Object.values(FruitName);
    const randomIndex = Math.floor(Math.random() * fruitValues.length);
    return fruitValues[randomIndex];
  }
}
