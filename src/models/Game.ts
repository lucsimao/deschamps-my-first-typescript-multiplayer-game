import { IState } from './interfaces/IState';
import { IPlayer } from './interfaces/states-attributes/IPlayer';

const DEFAULT_SCREEN_HEIGHT = 20;
const DEFAULT_SCREEN_WIDTH = 20;

export class Game {
  private _state: IState;

  constructor(
    screenWidth: number = DEFAULT_SCREEN_WIDTH,
    screenHeight: number = DEFAULT_SCREEN_HEIGHT
  ) {
    this._state = {
      players: {},
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

  public get state(): IState {
    return this._state;
  }
}
