import { IPlayer } from './states-attributes/IPlayer';
import { IScreen } from './states-attributes/IScreen';

export interface IState {
  players: { [playerId: string]: IPlayer };
  screen: IScreen;
}
