import { IState } from './interfaces/IState';

const DEFAULT_SCREEN_HEIGHT = 20;
const DEFAULT_SCREEN_WIDTH = 20;

export class Game {
  private _state: IState;

  constructor(
    screenWidth: number = DEFAULT_SCREEN_WIDTH,
    screenHeight: number = DEFAULT_SCREEN_HEIGHT
  ) {
    this._state = {
      screen: {
        width: screenWidth,
        height: screenHeight,
      },
    };
  }

  public get state(): IState {
    return this._state;
  }
}
