import { Move } from '@src/models/enum/Move';
import { IGameElement } from './IGameElement';

export interface IPlayer extends IGameElement {
  playerId: string;
  lastMove?: Move;
}
