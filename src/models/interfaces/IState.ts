import { IFruit } from './states-attributes/IFruit';
import { IPlayer } from './states-attributes/IPlayer';
import { IScreen } from './states-attributes/IScreen';

export interface IState {
  players: { [playerId: string]: IPlayer };
  fruits: { [fruitId: string]: IFruit };
  screen: IScreen;
}
