import { Move } from '@src/models/enum/Move';

export interface IMoveCommand {
  move: Move;
  playerId: string;
}
