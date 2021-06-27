import { Move } from '@src/models/enum/Move';
import { IPlayer } from '../states-attributes/IPlayer';

export interface IMoveCommand {
  move: Move;
  player: IPlayer;
}
